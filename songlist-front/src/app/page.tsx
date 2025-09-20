import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Song List App
        </h1>

        <p className="text-lg text-gray-600 mb-12">
          SSRとCSRの違いを体験してみましょう。下のボタンからそれぞれのバージョンにアクセスできます。
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              SSR (Server-Side Rendering)
            </h2>
            <ul className="text-sm text-blue-700 mb-6 text-left space-y-2">
              <li>• サーバーから HTML 生成</li>
              <li>• 速いページロード</li>
              <li>• SEO 最適化</li>
              <li>• 静的データに向いてる</li>
            </ul>
            <Link
              href="/ssr"
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors inline-block"
            >
              SSR 体験
            </Link>
          </div>

          <div className="bg-green-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">
              CSR (Client-Side Rendering)
            </h2>
            <ul className="text-sm text-green-700 mb-6 text-left space-y-2">
              <li>• クライアントでレンダリング</li>
              <li>• 動的インタラクション</li>
              <li>• SPA </li>
              <li>• 動的データに向いてる</li>
            </ul>
            <Link
              href="/csr"
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-colors inline-block"
            >
              CSR 体験
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
