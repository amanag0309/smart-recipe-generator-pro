import Link from 'next/link';
export default function Navbar(){
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/70 backdrop-blur">
      <div className="container py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-brand" />
          <span className="font-bold tracking-tight">Smart Recipe Generator</span>
        </Link>
        <nav className="flex gap-6 text-sm text-slate-300">
          <Link href="/">Home</Link>
          <Link href="/favorites">Favorites</Link>
          <a className="link" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </div>
    </header>
  );
}