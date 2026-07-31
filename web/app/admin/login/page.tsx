type LoginPageProps = {
  searchParams: Promise<{ error?: string; reason?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error, reason } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50 p-4">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-950">宏超自动化</h1>
          <p className="mt-2 text-sm text-slate-600">网站管理后台登录</p>
        </div>

        {reason === "unauthorized" && (
          <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            请先登录后再访问管理后台
          </p>
        )}

        {error && (
          <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}

        <form action="/api/auth/login" method="post" className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-800">
              邮箱
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-800">
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-slate-400 px-3 py-2 text-sm outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            登录
          </button>
        </form>
      </section>
    </main>
  );
}
