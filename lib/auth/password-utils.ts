"use server";

import bcryptjs from "bcryptjs";

/**
 * Server-only utility for comparing passwords with bcryptjs
 */
export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcryptjs.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
}

/**
 * Server-only utility for hashing passwords with bcryptjs
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}