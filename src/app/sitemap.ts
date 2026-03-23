import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://stonesaints.com',
            lastModified: new Date(),
        },
        {
            url: 'https://stonesaints.com/mens',
            lastModified: new Date(),
        },
        {
            url: 'https://stonesaints.com/womens',
            lastModified: new Date(),
        },
        {
            url: 'https://stonesaints.com/cart',
            lastModified: new Date(),
        },
        {
            url: 'https://stonesaints.com/login',
            lastModified: new Date(),
        },
    ]
}
