import { z } from 'zod';

const imageSchema = z.object({
    copyright: z.string().nullable(),
    filename: z.string(),
    altText: z.string(),
    largeUrl: z.string().url(),
    originalUrl: z.string().url(),
    thumbnailUrl: z.string().url(),
    coverPhoto: z.boolean(),
    orientation: z.enum(["landscape", "portrait", "square"]),
});

const resultSchema = z.object({
    "@name": z.string(),
    "@path": z.string(),
    "@id": z.string(),
    "@nodeType": z.string(),
    "jcr:createdBy": z.string(),
    id: z.string(),
    languages: z.string(),
    name: z.string(),
    seasons: z.string(),
    "mgnl:lastActivated": z.string().transform((val) => {
        const date = new Date(val);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }
        return date;
    }),
    "mgnl:created": z.string().transform((val) => {
        const date = new Date(val);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }
        return date;
    }),
    region: z.string(),
    "mgnl:activationStatus": z.boolean(),
    sustainable: z.string(),
    slug: z.string(),
    nameEN: z.string(),
    category: z.string(),
    accessible: z.string(),
    descriptionEN: z.string().nullable(),
    priceLow: z.string(),
    "jcr:created": z.string().transform((val) => {
        const date = new Date(val);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }
        return date;
    }),
    priceHigh: z.string().nullable(),
    "mgnl:createdBy": z.string(),
    durationType: z.string().nullable(),
    duration: z.string().nullable(),
    city: z.string(),
    "mgnl:lastModified": z.string().transform((val) => {
        const date = new Date(val);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
        }
        return date;
    }),
    "mgnl:lastModifiedBy": z.string(),
    image: z.string().transform((val) => {
        try {
            const jsonData = JSON.parse(val);
            return imageSchema.parse(jsonData)
        } catch (error) {
            throw new Error("Invalid format");
        }
    }),
    "@nodes": z.array(z.string()),
});

export const fiSchema = z.object({
    total: z.number(),
    offset: z.number(),
    limit: z.number(),
    results: z.array(resultSchema),
});
