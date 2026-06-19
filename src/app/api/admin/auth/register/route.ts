import { NextRequest, NextResponse } from 'next/server'
import { createToken, verifyToken, getTokenFromRequest } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

const admins: Map<string, any> = new Map()

export async function POST(request: NextRequest) {
  try {
    const { email, password, businessName, businessEmail, whatsappNumber } = await request.json()

    if (!email || !password || !businessName || !whatsappNumber) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (admins.has(email)) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      )
    }

    const adminId = uuidv4()
    const admin = {
      id: adminId,
      email,
      password,
      role: 'super_admin',
      businessName,
      businessEmail,
      whatsappNumber,
      createdAt: new Date(),
    }

    admins.set(email, admin)

    const token = await createToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    })

    return NextResponse.json(
      {
        message: 'Registration successful',
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
          businessName: admin.businessName,
          whatsappNumber: admin.whatsappNumber,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
