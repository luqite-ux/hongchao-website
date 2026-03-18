/**
 * 在 Node.js 运行时启动时配置 undici 代理，使 fetch 请求走 HTTP_PROXY/HTTPS_PROXY。
 * 可选通过 noProxy 排除 Sanity（.sanity.io）。某些网络环境直连 Sanity 会超时，需要让 Sanity 走代理。
 * 仅当设置了代理环境变量时生效；Edge 运行时跳过。
 */
const DEFAULT_NO_PROXY = "localhost,127.0.0.1,::1";
const SANITY_NO_PROXY = ".sanity.io,*.sanity.io,api.sanity.io,*.api.sanity.io";

export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy;
  if (!proxy) return;

  const existing = process.env.NO_PROXY || process.env.no_proxy || "";
  const bypassSanityProxy = (process.env.SANITY_BYPASS_PROXY ?? "").toLowerCase() === "1";
  const baseNoProxy = existing || DEFAULT_NO_PROXY;
  const noProxy = bypassSanityProxy ? `${baseNoProxy},${SANITY_NO_PROXY}` : baseNoProxy;
  process.env.NO_PROXY = process.env.no_proxy = noProxy;

  try {
    const { EnvHttpProxyAgent, setGlobalDispatcher } = await import("undici");
    setGlobalDispatcher(new EnvHttpProxyAgent({ noProxy }));
    console.log("[instrumentation] Proxy enabled via EnvHttpProxyAgent:", proxy, "| noProxy:", noProxy);
  } catch (e) {
    console.warn("[instrumentation] Failed to set proxy:", (e as Error)?.message);
  }
}
