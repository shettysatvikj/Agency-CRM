import { generateToken } from '../utils/generateToken.js';
import User from "../models/User.js";


/**
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email?.toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });
};

// OPTIONAL: create initial admin user (call once, then disable)
/**
 * POST /api/auth/seed-admin
 */
export const seedAdmin = async (req, res) => {
  const existing = await User.findOne({ email: 'admin@example.com' });
  if (existing) return res.status(400).json({ message: 'Admin already exists' });

  const admin = await User.create({
    email: 'admin@example.com',
    password: 'Admin123!',
    role: 'admin',
  });
  res.json({ message: 'Admin seeded', email: admin.email });
};