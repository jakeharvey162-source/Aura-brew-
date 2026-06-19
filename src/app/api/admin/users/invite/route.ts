import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

const invitations: Map<string, any> = new Map()

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
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

    const { email, role } = await request.json()

    if (!email || !role) {
      return NextResponse.json(
        { message: 'Email and role required' },
        { status: 400 }
      )
    }

    const inviteCode = uuidv4()
    const invitation = {
      email,
      role,
      inviteCode,
      invitedBy: payload.id,
      status: 'pending',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    }

    invitations.set(inviteCode, invitation)

    console.log(`Invitation sent to ${email} with code: ${inviteCode}`)
    console.log(`Email should be sent with link: /admin/register?invite=${inviteCode}`)

    return NextResponse.json(
      {
        message: 'Invitation sent successfully',
        inviteCode,
        expiresAt: invitation.expiresAt,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Invite error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
