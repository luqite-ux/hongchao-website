# Excel + 本地图片批量导入说明

从 `studio/data/product.xlsx` 与 `studio/data/01..20/` 等目录批量导入产品分类与产品到 Sanity，支持幂等 upsert（可重复执行不重复生成）。

## 1. 创建 Editor Token

1. 打开 [Sanity 管理后台](https://www.sanity.io/manage)
2. 选择对应项目 → **API** → **Tokens**
3. 点击 **Add API token**
4. 名称例如：`Excel 导入脚本`
5. 权限选择 **Editor**（需有写入与 Asset 上传权限）
6. 创建后复制 token（仅显示一次，请妥善保存）

## 2. 配置 studio/.env.local

在 **studio** 目录下创建或编辑 `.env.local`，不要提交到 Git：

```env
# 与 Sanity 项目一致（也可用 SANITY_STUDIO_* 变量名）
SANITY_PROJECT_ID=你的项目ID
SANITY_DATASET=production
SANITY_WRITE_TOKEN=上面创建的 Editor token
```

或使用已有 Studio 变量名（脚本会兼容）：

```env
SANITY_STUDIO_PROJECT_ID=你的项目ID
SANITY_STUDIO_DATASET=production
SANITY_WRITE_TOKEN=你的 token
```

**注意**：不要将 token 写进代码或提交到版本库。

## 3. Excel 与图片目录要求

- **Excel 路径**：`studio/data/product.xlsx`
- **Sheet 名称**（固定）：
  - `productCategories`：分类（列建议：title, slug, description）
  - `products`：产品（列建议：title, slug, category/image_folder_name, summary, specs, faq 等）
  - `images`（可选）：图片顺序与类型（列建议：product_slug 或 folder, filename, order, type）

- **图片根目录**：`studio/data/<文件夹名>/`
  - 文件夹名与产品表中的 `image_folder_name` 对应，如 `01`、`02` … `20`
  - 脚本会将 `1`、`01` 等统一成两位数字（如 `01`）

## 4. 运行命令

在 monorepo 的 **studio** 子项目下执行：

```bash
cd studio
pnpm install
pnpm import:excel
```

## 5. 常见问题

- **image_folder_name 补零**：Excel 里写 `1` 或 `01` 均可，脚本会统一为 `01`～`99` 的两位字符串，对应目录 `studio/data/01/`、`studio/data/02/` 等。
- **图片找不到**：检查 `studio/data/<文件夹名>/` 下是否有对应文件；`images` sheet 中的 `filename` 需与磁盘文件名一致（含扩展名）。
- **权限不足**：确认使用的是 **Editor** token，且 `SANITY_WRITE_TOKEN` 在 `.env.local` 中配置正确；若报 401/403，请重新创建 token 并更新配置。
- **重复运行**：脚本为幂等设计，按 `slug.current` 查找分类与产品，已存在则更新，不存在则新建，可多次执行。

### 连接超时（ETIMEDOUT / ECONNRESET）

若报错 `connect ETIMEDOUT` 或连接超时，说明本机无法连上 Sanity API（`api.sanity.io`）。可依次排查：

1. **网络环境**：公司或地区网络可能限制访问外网。可尝试：
   - 使用手机热点或家庭网络再运行脚本；
   - 在能访问外网的服务器/CI 上执行导入。
2. **代理**：若必须通过 HTTP(S) 代理上网，在运行前设置环境变量后再执行：
   ```bash
   set HTTPS_PROXY=http://代理地址:端口
   set HTTP_PROXY=http://代理地址:端口
   pnpm import:excel
   ```
   （Linux/macOS 用 `export HTTPS_PROXY=...`。）
3. **VPN**：若公司要求通过 VPN 访问外网，请先连上 VPN 再运行。
4. **防火墙**：确认本机或网关未拦截对 `*.api.sanity.io` 或 443 端口的访问。

脚本已对请求做了较长超时和有限次重试；若仍超时，多半是网络/代理/VPN 未打通。**注意**：错误日志中可能包含 token，请勿将完整报错截图或复制到公开场合。
