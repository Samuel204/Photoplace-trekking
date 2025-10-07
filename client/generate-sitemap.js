import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: 'https://www.davidbabic.com' });

    sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    sitemap.write({ url: '/archivio-escursioni', changefreq: 'weekly', priority: 0.8 });
    sitemap.write({ url: '/contatti', changefreq: 'monthly', priority: 0.5 });
    sitemap.write({ url: '/gallery', changefreq: 'weekly', priority: 0.7 });

    sitemap.end();

    const data = await streamToPromise(sitemap);
    createWriteStream(resolve('public', 'sitemap.xml')).end(data);
}

generateSitemap().then(() => {
    console.log('Sitemap generata!');
});
