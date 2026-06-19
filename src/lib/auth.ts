import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify, SignJWT } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dev-secret-key'
)

interface TokenPayload {
  id: string
  email: string
  role: string
}

export async function createToken(payload: TokenPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
  return token
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const verified = await jwtVerify(token, secret)
    return verified.payload as TokenPayload
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  return authHeader?.replace('Bearer ', '')
}
