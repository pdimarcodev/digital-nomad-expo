import { AuthUser } from "@/src/domain/auth/AuthUser";
import { IAuthRepo } from "@/src/domain/auth/IAuthRepo";
import { supabase } from "./supabase";

async function signIn(email: string, password: string): Promise<AuthUser> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error("user not found");
  }
  return {
    id: data.user.id,
    email: data.user.email!,
  };
}

async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export const SupabaseAuthRepo: IAuthRepo = {
  signIn,
  signOut,
};
