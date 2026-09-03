import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { token, identifier } = req.query;

    if (!token || !identifier || typeof token !== 'string' || typeof identifier !== 'string') {
      return res.redirect('/login?error=InvalidVerificationLink');
    }

    // Find the token in the database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier,
          token,
        },
      },
    });

    if (!verificationToken) {
      return res.redirect('/login?error=InvalidVerificationLink');
    }

    // Check if it's expired
    if (new Date() > verificationToken.expires) {
      // Delete the expired token
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier,
            token,
          },
        },
      });
      return res.redirect('/login?error=VerificationLinkExpired');
    }

    // Update the user's emailVerified status
    const user = await prisma.user.findUnique({
      where: { email: identifier },
    });

    if (!user) {
      return res.redirect('/login?error=UserNotFound');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    // Clean up the verification token so it can't be reused
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier,
          token,
        },
      },
    });

    // Redirect to login page with success state
    return res.redirect('/login?verified=true');
  } catch (error) {
    console.error('Verification error:', error);
    return res.redirect('/login?error=VerificationFailed');
  }
}
