// lib/userService.ts
import dbConnect from './db';
import User from '@/models/User';

export async function findUserByEmail(email: string) {
  await dbConnect();
  return await User.findOne({ email });
}

export async function createUser({
  name,
  email,
  hashedPassword,
}: {
  name: string;
  email: string;
  hashedPassword: string;
}) {
  await dbConnect();
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();
  return user._id;
}
