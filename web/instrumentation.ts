/**
 * 在 Node.js 运行时启动时配置 undici 代理，使 fetch 请求（含 Sanity API）走 HTTP_PROXY/HTTPS_PROXY
 * 仅当设置了代理环境变量时生效；Edge 运行时跳过
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy;
  if (!proxy) return;

  try {
    const { EnvHttpProxyAgent, setGlobalDispatcher } = await import("undici");
    setGlobalDispatcher(new EnvHttpProxyAgent());
    console.log("[instrumentation] Proxy enabled via EnvHttpProxyAgent:", proxy);
  } catch (e) {
    console.warn("[instrumentation] Failed to set proxy:", (e as Error)?.message);
  }
}
