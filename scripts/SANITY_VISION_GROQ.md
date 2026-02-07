# Sanity Vision 自检 GROQ（分类页只显示 1 个产品）

在 Studio 里打开 Vision，用下面语句检查 flexible-feeder 与 product 的 category 引用、slug 情况。

## 1. flexible-feeder 分类下产品数量（按引用解析）

```groq
// 按 category->slug 解析（旧逻辑，可能漏掉 drafts ref 的产品）
count(*[_type == "product" && category->slug.current == "flexible-feeder"])
```

## 2. 按 category._ref 匹配（与当前 productsByCategorySlugQuery 一致）

先取分类的 _id：

```groq
*[_type == "productCategory" && slug.current == "flexible-feeder"][0]._id
```

再查产品（把上面得到的 _id 换成实际值，或下面用变量）：

```groq
*[_type == "product" && (category._ref == "上一步的_id" || category._ref == "drafts.上一步的_id")]
```

例如若 _id 为 `abc123`：

```groq
*[_type == "product" && (category._ref == "abc123" || category._ref == "drafts.abc123")]{ _id, title, "slug": slug.current, "categoryRef": category._ref }
```

## 3. 是否存在 category._ref 为 drafts. 或旧 id 的 product

```groq
*[_type == "product" && defined(category._ref) && string::startsWith(category._ref, "drafts.")]{ _id, title, "categoryRef": category._ref }
```

## 4. 缺 slug.current 的 product 数量

```groq
count(*[_type == "product" && !defined(slug.current)])
```

列出缺 slug 的产品：

```groq
*[_type == "product" && !defined(slug.current)]{ _id, title }
```
