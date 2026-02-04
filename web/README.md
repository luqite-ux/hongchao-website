This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Sanity 前后端对齐测试

前端通过环境变量连接 Sanity 后端，需与 `hongchaozidong-sanity` 中 Studio 的 `projectId`、`dataset` 一致。

1. **配置环境变量**（若尚未配置）  
   复制 `.env.example` 为 `.env.local`，并确认：
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` 与 Studio 的 `sanity.config.ts` 中 `projectId` 一致（当前为 `rbkc9qwm`）
   - `NEXT_PUBLIC_SANITY_DATASET` 与 Studio 的 `dataset` 一致（当前为 `production`）

2. **启动前端**  
   在项目根目录执行：`npm run dev`

3. **调用对齐检查接口**  
   浏览器或 curl 访问：
   ```text
   http://localhost:3000/api/sanity-check
   ```
   - 返回 `ok: true` 且 `schemaAligned: true` 表示前后端已对齐，且能正确拉取站点设置。
   - 若返回 `hasData: false`，请在 Sanity Studio 中创建并发布一条「站点设置」(siteSettings) 文档。
   - 若返回 400/502，请根据 `error`、`hint` 检查环境变量或网络/CORS。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
