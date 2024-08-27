import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const minCost = 8;
  const maxCost = 12;

  // Generate a salt with a cost factor (higher cost = slower hashing)
  const saltRounds = Math.floor(Math.random() * (maxCost - minCost) + minCost);
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password with the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
};
