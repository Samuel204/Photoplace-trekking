import { parseStringPromise } from 'xml2js';

/**
 * Parsed GPX data metrics
 */
export interface ParsedGpxData {
  totalDistanceKm: number;
  totalElevationGainM: number;
  totalElevationLossM: number;
  minElevationM: number;
  maxElevationM: number;
  totalTimeSeconds: number;
  avgSpeedKmh: number;
  maxSpeedKmh: number;
  trackPointsCount: number;
  startLatitude: number;
  startLongitude: number;
  endLatitude: number;
  endLongitude: number;
  trackPoints: Array<{ lat: number; lon: number; ele: number; time: number }>;
}

/**
 * Haversine formula to calculate distance (km) between two lat/lon points
 */
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const R = 6371; // Earth radius in km
  return R * c;
}

/**
 * Parse GPX XML string and compute summary metrics
 */
export async function parseGpx(gpxXml: string): Promise<ParsedGpxData> {
  const result = await parseStringPromise(gpxXml);
  const segments = result.gpx.trk?.[0]?.trkseg || [];
  const ptsRaw = segments.flatMap((seg: any) => seg.trkpt || []);
  const trackPoints = ptsRaw.map((pt: any) => ({
    lat: parseFloat(pt.$.lat),
    lon: parseFloat(pt.$.lon),
    ele: parseFloat(pt.ele?.[0] || '0'),
    time: new Date(pt.time?.[0]).getTime() / 1000
  }));

  if (trackPoints.length === 0) {
    return {
      totalDistanceKm: 0,
      totalElevationGainM: 0,
      totalElevationLossM: 0,
      minElevationM: 0,
      maxElevationM: 0,
      totalTimeSeconds: 0,
      avgSpeedKmh: 0,
      maxSpeedKmh: 0,
      trackPointsCount: 0,
      startLatitude: 0,
      startLongitude: 0,
      endLatitude: 0,
      endLongitude: 0,
      trackPoints: []
    };
  }

  let totalDist = 0;
  let gain = 0;
  let loss = 0;
  let minEle = Infinity;
  let maxEle = -Infinity;
  let maxSpeed = 0;

  for (let i = 1; i < trackPoints.length; i++) {
    const prev = trackPoints[i - 1];
    const curr = trackPoints[i];
    const d = haversine(prev.lat, prev.lon, curr.lat, curr.lon);
    totalDist += d;
    const eleDiff = curr.ele - prev.ele;
    if (eleDiff > 0) gain += eleDiff;
    else loss += Math.abs(eleDiff);
    minEle = Math.min(minEle, curr.ele);
    maxEle = Math.max(maxEle, curr.ele);
    const dt = curr.time - prev.time;
    if (dt > 0) {
      const speedKmh = (d / (dt / 3600));
      if (speedKmh > maxSpeed) maxSpeed = speedKmh;
    }
  }

  // include first point elevation in min/max
  minEle = Math.min(minEle, trackPoints[0].ele);
  maxEle = Math.max(maxEle, trackPoints[0].ele);

  const totalTime = trackPoints[trackPoints.length - 1].time - trackPoints[0].time;
  const avgSpeed = totalTime > 0 ? totalDist / (totalTime / 3600) : 0;

  return {
    totalDistanceKm: totalDist,
    totalElevationGainM: gain,
    totalElevationLossM: loss,
    minElevationM: minEle,
    maxElevationM: maxEle,
    totalTimeSeconds: totalTime,
    avgSpeedKmh: avgSpeed,
    maxSpeedKmh: maxSpeed,
    trackPointsCount: trackPoints.length,
    startLatitude: trackPoints[0].lat,
    startLongitude: trackPoints[0].lon,
    endLatitude: trackPoints[trackPoints.length - 1].lat,
    endLongitude: trackPoints[trackPoints.length - 1].lon,
    trackPoints
  };
}