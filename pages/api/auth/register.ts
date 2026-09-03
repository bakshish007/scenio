import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (!existingUser.password) {
        return res.status(400).json({ 
          message: 'An account with this email already exists. Please sign in with your original provider.' 
        });
      }
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user (emailVerified is null by default)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
      },
    });

    // Generate Verification Token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 24); // 24 hours expiry

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Send Email using Nodemailer
    const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);
    
    // Default to localhost if NEXTAUTH_URL is not set (useful for dev)
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const verifyUrl = `${baseUrl}/api/auth/verify?token=${token}&identifier=${encodeURIComponent(email)}`;

    await transporter.sendMail({
      from: `"Scenio.AI" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verify your email address - Scenio.AI",
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; background-color: #050505; color: #ffffff; border-radius: 12px; border: 1px solid #333;">
          <h1 style="color: #ffffff; margin-bottom: 20px;">Welcome to Scenio.AI</h1>
          <p style="color: #cccccc; font-size: 16px; line-height: 1.5; mb-6">
            Thank you for registering! Please click the button below to verify your email address and activate your account.
          </p>
          <a href="${verifyUrl}" style="display: inline-block; background-color: #6366f1; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 10px; margin-bottom: 20px;">
            Verify Email Address
          </a>
          <p style="color: #666666; font-size: 12px;">
            If you did not request this email, you can safely ignore it. This link expires in 24 hours.
          </p>
        </div>
      `,
    });

    return res.status(201).json({ message: 'User created successfully. Verification email sent.', userId: user.id });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
