import { cookies } from 'next/headers';

export interface SessionUser {
  userId: string;
  email: string;
  role: 'ADMIN' | 'USER';
  exp: number;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    ) as SessionUser;

    // Cek apakah session sudah expired
    if (session.exp < Date.now()) {
      return null;
    }

    return session;
  } catch (error) {
    return null;
  }
}