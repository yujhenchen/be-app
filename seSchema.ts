import { z } from "zod";

const imageSchema = z.object({
    alt_text: z.string(),
    title: z.string(),
    file: z.string().url(),
    width: z.number(),
    height: z.number(),
    file_size: z.number(),
    focal: z.object({
        x: z.string(),
        y: z.string(),
    }),
    src: z.string().url(),
    credits: z.string(),
    caption: z.string(),
    id: z.number(),
    local_meta_data: z.record(z.unknown()),
});

const resultSchema = z.object({
    id: z.number(),
    title: z.string(),
    href: z.string().url(),
    text: z.string(),
    image: imageSchema,
    live: z.boolean(),
    path: z.string(),
    type: z.string(),
    original_title: z.string(),
    is_external: z.boolean(),
    categories: z.string().nullable(),
});

const metaSchema = z.object({
    total_pages: z.number(),
    total_hits: z.number(),
    shown_hits: z.number(),
    previous_link: z.string().nullable(),
    next_link: z.string().nullable(),
    previous: z.string().nullable(),
    next: z.string().nullable(),
});

const facetSchema = z.object({
    title: z.string(),
    count: z.number(),
    path: z.string(),
});

const facetsSchema = z.object({
    root_categories: z.array(facetSchema),
    regions: z.array(facetSchema.extend({
        key: z.string(),
    })),
    end_categories: z.array(facetSchema),
});

export const responseSchema = z.object({
    results: z.array(resultSchema),
    meta: metaSchema,
    facets: facetsSchema,
});

// Example usage:
// const parsedData = responseSchema.parse(responseData);
