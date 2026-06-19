import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

const admins: Map<string, any> = new Map()

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)

    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)

    if (!payload) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    const admin = Array.from(admins.values()).find(a => a.id === payload.id)

    return NextResponse.json(
      {
        message: 'Token valid',
        admin: {
          id: admin?.id,
          email: admin?.email,
          role: admin?.role,
          businessName: admin?.businessName,
          whatsappNumber: admin?.whatsappNumber,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
