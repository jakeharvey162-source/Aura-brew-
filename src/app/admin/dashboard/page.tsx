'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Admin {
  id: string
  email: string
  role: string
  businessName: string
  whatsappNumber: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      try {
        const response = await fetch('/api/admin/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok) {
          const data = await response.json()
          setAdmin(data.admin)
        } else {
          localStorage.removeItem('admin_token')
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    toast.success('Logged out successfully')
    router.push('/admin/login')
  }

  const handleInviteAdmin = async () => {
    const email = prompt('Enter admin email to invite:')
    if (!email) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/users/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, role: 'admin' }),
      })

      if (response.ok) {
        toast.success('Invitation sent successfully!')
      } else {
        const data = await response.json()
        toast.error(data.message || 'Failed to send invitation')
      }
    } catch (error) {
      toast.error('An error occurred')
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-cream-50 to-white flex items-center justify-center">
        <div className="text-coffee-900 font-serif">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cream-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-coffee-900">Admin Dashboard</h1>
            <p className="text-coffee-700 mt-2">Welcome, {admin?.businessName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-cream-200 mb-8">
          <h2 className="text-2xl font-bold text-coffee-900 mb-6">Your Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-coffee-700">Email</label>
              <p className="text-lg text-coffee-900">{admin?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-coffee-700">Role</label>
              <p className="text-lg text-coffee-900 capitalize">{admin?.role}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-coffee-700">Business Name</label>
              <p className="text-lg text-coffee-900">{admin?.businessName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-coffee-700">WhatsApp Number</label>
              <p className="text-lg text-coffee-900">{admin?.whatsappNumber}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-cream-200">
            <h3 className="text-xl font-bold text-coffee-900 mb-4">Invite Admin</h3>
            <p className="text-coffee-700 mb-6">Add another admin to your team.</p>
            <button
              onClick={handleInviteAdmin}
              className="w-full px-4 py-2 bg-coffee-900 hover:bg-coffee-800 text-white rounded-lg font-medium transition-colors"
            >
              Send Invite
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-cream-200">
            <h3 className="text-xl font-bold text-coffee-900 mb-4">Content Management</h3>
            <p className="text-coffee-700 mb-6">Manage pages, products, and content.</p>
            <button
              className="w-full px-4 py-2 bg-coffee-900 hover:bg-coffee-800 text-white rounded-lg font-medium transition-colors"
              disabled
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
