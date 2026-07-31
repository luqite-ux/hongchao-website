# Hongchao Supabase Content Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Hongchao products, categories, articles, images, and inquiries from Sanity into the shared Supabase/R2 tenant, then switch the customer website to the unified backend without changing its approved visual design.

**Architecture:** A tenant-scoped migration script reads published Sanity documents, downloads every referenced public asset, uploads assets through the existing huanqiu-admin R2 migration helper, and upserts normalized rows into Supabase. The website gets a server-only data layer that maps Supabase rows back into the current Hongchao UI shapes; Sanity remains a temporary read fallback until production verification passes.

**Tech Stack:** Next.js 16, TypeScript, Supabase PostgREST, Cloudflare R2, Sanity GROQ, Node test runner, Vercel.

## Global Constraints

- Every Supabase mutation must include tenant ID `ece3bbeb-1483-48bc-bd54-cf38d39fd3f9`.
- Do not modify or deploy the shared huanqiu-admin repository.
- Preserve the existing Hongchao visual design and routes.
- Product and article reads run in async Server Components with `revalidate = 60` and dynamic detail routes.
- Public content images must use absolute R2 HTTPS URLs after migration.
- Inquiry submissions must insert into shared Supabase `inquiries`; never expose the service-role key.
- Stage only explicit files; never run `git add .` or `git add -A`.

---

### Task 1: Source Inventory and Mapping Contract

**Files:**
- Create: `scripts/hongchao-migration-map.mjs`
- Create: `scripts/hongchao-migration-map.test.mjs`
- Create: `scripts/export-hongchao-sanity.mjs`
- Create: `migration/hongchao-source-inventory.json`

**Interfaces:**
- Produces: `mapSanityCategory(doc)`, `mapSanityProduct(doc, categoryIdBySanityId)`, `mapSanityPost(doc)`.
- Produces: inventory JSON containing source counts, missing slugs, missing category references, and asset URL counts.

- [ ] Write Node tests asserting slug preservation, category mapping, multilingual fields in `extra_data`, specification JSON, and complete asset URL extraction.
- [ ] Run `node --test scripts/hongchao-migration-map.test.mjs` and confirm it fails because the mapper does not exist.
- [ ] Implement the three pure mapper functions without network access.
- [ ] Run the mapper tests and confirm all pass.
- [ ] Query published Sanity `productCategory`, `product`, and `post` documents and write a deterministic inventory JSON.
- [ ] Validate that every published product has a slug and a resolvable category before any database write.

### Task 2: Tenant-Scoped Supabase and R2 Seed

**Files:**
- Create: `scripts/seed-hongchao-supabase.mjs`
- Create: `scripts/seed-hongchao-supabase.test.mjs`
- Reuse: `D:/Cursor/Grand/huanqiu-admin/scripts/upload-local-product-images-to-r2.mjs`

**Interfaces:**
- Consumes: mapping functions and exported inventory from Task 1.
- Produces: idempotent category, product, and article upserts scoped to the Hongchao tenant.

- [ ] Write tests that reject any seed row with a different tenant ID, relative image URL, missing slug, or unresolved category.
- [ ] Run `node --test scripts/seed-hongchao-supabase.test.mjs` and confirm the tenant/image guards fail before implementation.
- [ ] Download all Sanity product, category, gallery, technical, packaging, and article-cover assets into `migration/assets/` with a manifest.
- [ ] Upload the assets to R2 and replace every mapped asset field with its R2 URL.
- [ ] Upsert categories first, products second, and articles third; never delete source Sanity documents.
- [ ] Query Supabase counts and verify they match the source inventory exactly.
- [ ] Verify every product primary image and article cover returns HTTP 200 from R2.

### Task 3: Supabase Product Data Layer

**Files:**
- Create: `lib/supabase-public.ts`
- Create: `lib/products-db.ts`
- Create: `lib/products-db.test.mjs`
- Modify: `app/products/page.tsx`
- Modify: `app/products/[category]/page.tsx`
- Modify: `app/products/[category]/[product]/page.tsx`
- Modify: `components/featured-products.tsx`
- Modify: `components/product-mega-menu.tsx`
- Modify: `lib/nav-product-categories.ts`

**Interfaces:**
- Produces: `getProductCatalog(locale)`, `getCategoryBySlug(slug, locale)`, `getProductBySlugs(categorySlug, productSlug, locale)`.
- Each function returns the current Hongchao UI shape and falls back to the existing Sanity query only on a Supabase error, not on a legitimate empty result.

- [ ] Write mapping tests for English, German, and Spanish locale fallback, specs, gallery images, related products, and categories.
- [ ] Run tests and confirm failure before creating the data layer.
- [ ] Implement server-only Supabase queries filtered by tenant ID and `is_active = true`.
- [ ] Replace Sanity reads in all product list/detail routes and shared product navigation components.
- [ ] Add `revalidate = 60`, `dynamicParams = true`, and database-backed `generateMetadata()` to detail routes.
- [ ] Run tests, TypeScript, and production build.

### Task 4: Supabase Article Data Layer

**Files:**
- Create: `lib/articles-db.ts`
- Create: `lib/articles-db.test.mjs`
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `getPublishedArticles(locale)` and `getArticleBySlug(slug, locale)` filtered by the Hongchao tenant and publication status.

- [ ] Write failing tests for publication filtering, locale fallback, cover images, HTML body, slug lookup, and missing articles.
- [ ] Implement the article mapper and server queries.
- [ ] Replace Sanity blog reads while preserving `/blog` and `/blog/[slug]` routes and layout.
- [ ] Add database-backed metadata, canonical URLs, Open Graph data, and Article JSON-LD.
- [ ] Run tests, TypeScript, and production build.

### Task 5: Unified Inquiry Submission

**Files:**
- Create: `lib/inquiries.ts`
- Create: `lib/inquiries.test.mjs`
- Modify: `app/api/inquiry/route.ts`
- Verify: `components/contact-form.tsx`

**Interfaces:**
- Produces: `normalizeInquiry(input)` and a route that inserts tenant ID, name, email, phone, company, subject/source, and message through the anon client.

- [ ] Write failing validation and tenant-binding tests.
- [ ] Replace the Sanity write-token implementation with a Supabase anon insert.
- [ ] Verify pending, success, reset, duplicate-submit prevention, and readable error states in the existing form.
- [ ] Submit a tagged production inquiry and confirm it appears only under the Hongchao tenant in both Supabase and the unified admin.

### Task 6: Deployment and Closed-Loop Verification

**Files:**
- Modify only if required: `app/sitemap.ts`, `app/robots.ts`, or their existing equivalents.
- Update externally: Vercel production deployment and Feishu customer row A-L.

**Interfaces:**
- Consumes all migrated data and website code from Tasks 1–5.
- Produces a production deployment whose product, article, inquiry, image, admin, and SEO paths are verified.

- [ ] Run all migration/data-layer tests, TypeScript, and `pnpm build` with zero failures.
- [ ] Commit exact files and push `luqite-ux/hongchao-website` main.
- [ ] Wait for the matching Vercel SHA to reach Production READY.
- [ ] Verify product list, every product detail, blog list, every published article, contact inquiry, and `/admin` on desktop and mobile.
- [ ] Verify all sitemap URLs, canonical hosts, metadata, JSON-LD, robots, and R2 assets return successful responses.
- [ ] Add a tagged product/article change through the unified admin, wait 70 seconds, and verify the public Vercel URL reflects it; restore the original content afterward.
- [ ] Update and API-read back the Hongchao Feishu A-L row, confirming J/K/L and link fields.
