export const metadata = {
  title: "Simple Weather App",
  description: "Take-home assignment built with Next.js App Router"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased">
        <div className="mx-auto max-w-2xl p-6">
          {children}
        </div>
      </body>
    </html>
  );
}
