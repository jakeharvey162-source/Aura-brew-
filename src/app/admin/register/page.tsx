'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

export default function AdminRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessEmail: '',
    whatsappNumber: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/admin/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Registration successful! You can now login.')
        router.push('/admin/login')
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch (error) {
      toast.error('An error occurred')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cream-50 to-white flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-cream-200">
          <h1 className="text-3xl font-serif font-bold text-coffee-900 mb-2 text-center">
            Aura Brew
          </h1>
          <p className="text-center text-coffee-700 mb-8">Super Admin Registration</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-900"
                placeholder="admin@aurabrew.co.za"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-900"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-900"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-900"
                placeholder="Your Coffee Shop Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                Business Email
              </label>
              <input
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-900"
                placeholder="info@aurabrew.co.za"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-900"
                placeholder="+27 701 234 567"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-coffee-900 hover:bg-coffee-800 disabled:bg-gray-400 text-white py-2 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Creating account...' : 'Create Super Admin Account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-cream-200">
            <p className="text-sm text-coffee-700 text-center">
              Already have an account?{' '}
              <Link href="/admin/login" className="text-coffee-900 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
