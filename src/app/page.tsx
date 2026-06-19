import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - Aura Brew',
  description: 'Welcome to Aura Brew - Premium specialty coffee',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cream-50 to-white">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-coffee-900 mb-6">
            Aura Brew
          </h1>
          <p className="text-xl md:text-2xl text-coffee-700 mb-8">
            Premium Specialty Coffee Experience
          </p>
          <a
            href="/admin/register"
            className="px-8 py-3 bg-coffee-900 text-white rounded-lg hover:bg-coffee-800 transition-colors font-medium inline-block"
          >
            Get Started
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Welcome to Aura Brew</h2>
          <p className="text-blue-800 mb-4">
            Enterprise-grade CMS platform for premium coffee shops.
          </p>
          <div className="space-y-2 text-blue-800 text-sm">
            <p>✅ Admin Panel: <code className="bg-white px-2 py-1 rounded">/admin</code></p>
            <p>✅ Block-based CMS</p>
            <p>✅ Gemini AI Integration</p>
            <p>✅ Multi-language Support</p>
          </div>
        </div>
      </div>
    </div>
  )
}
