import type { z } from "zod";

export async function fetcher<T>(endpoint: string, config: RequestInit = {}, schema: z.ZodType<T>): Promise<T | null> {
    try {
        const response = await fetch(endpoint, config);
        const jsonData = await response.json();
        if (response.ok) {
            return schema.parse(jsonData)
        }
        return null;
    } catch (error) {
        return null;
    }
}
