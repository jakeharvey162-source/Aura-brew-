import { NextRequest, NextResponse } from 'next/server'
import { createToken } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

const admins: Map<string, any> = new Map()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password required' },
        { status: 400 }
      )
    }

    const admin = admins.get(email)

    if (!admin || admin.password !== password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const token = await createToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    })

    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
          businessName: admin.businessName,
          whatsappNumber: admin.whatsappNumber,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
