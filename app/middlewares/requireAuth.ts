import { auth } from "@clerk/nextjs/server";

export const requireAuth = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  
  return userId;
};