import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, mkdirSync } from 'fs';
import { resolve } from 'path';

const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/archivio-escursioni', changefreq: 'weekly', priority: 0.8 },
    { url: '/contatti', changefreq: 'monthly', priority: 0.5 },
    { url: '/gallery', changefreq: 'weekly', priority: 0.7 },
];

const publicDir = resolve('client/public');
mkdirSync(publicDir, { recursive: true });

const sitemap = new SitemapStream({ hostname: 'https://www.davidbabic.com/' });
const writeStream = createWriteStream(resolve(publicDir, 'sitemap.xml'));

writeStream.on('error', (err) => {
    console.error('Errore scrittura sitemap', err);
});

streamToPromise(sitemap)
    .then(() => console.log('Sitemap creata con successo'))
    .catch((err) => console.error('Errore creazione sitemap', err));

sitemap.pipe(writeStream);

links.forEach(link => sitemap.write(link));
sitemap.end();
