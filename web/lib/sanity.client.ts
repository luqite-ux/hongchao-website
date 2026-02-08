import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

const isDev = process.env.NODE_ENV === "development";
const baseFetch = globalThis.fetch;

const fetchWithDevLogging =
  typeof baseFetch === "function"
    ? async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const url = typeof input === "string" ? input : input instanceof URL ? input.href : (input as Request).url;
        if (isDev) {
          console.log("[Sanity] fetch URL:", url);
        }
        try {
          return await baseFetch(input, init);
        } catch (err) {
          if (isDev) {
            const e = err instanceof Error ? err : new Error(String(err));
            console.error("[Sanity] fetch failed — message:", e.message, "cause:", e.cause);
          }
          throw err;
        }
      }
    : undefined;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  ...(fetchWithDevLogging && { fetch: fetchWithDevLogging }),
});
