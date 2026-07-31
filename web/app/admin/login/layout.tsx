export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 [&_input]:bg-white [&_input]:text-slate-950 [&_input]:placeholder:text-slate-500">
      {children}
    </div>
  );
}
