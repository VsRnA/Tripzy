import bcrypt from 'bcrypt';

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  console.log(password, hash);
  return bcrypt.compare(password, hash);
}
