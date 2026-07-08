"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// ────────────────────────────────────────────
// 현재 로그인 유저 프로필 조회
// ────────────────────────────────────────────

export async function getProfile() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile
    ? {
        id: profile.id,
        email: profile.email,
        displayName: profile.display_name,
        avatarUrl: profile.avatar_url,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
        // auth.users의 마지막 로그인 시각
        lastSignInAt: user.last_sign_in_at ?? null,
        // 소셜 로그인 제공자
        provider: user.app_metadata?.provider ?? "email",
      }
    : null;
}

// ────────────────────────────────────────────
// 프로필 업데이트 (닉네임)
// ────────────────────────────────────────────

export async function updateDisplayName(displayName: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  const { error } = await supabase
    .from("profiles")
    .update({ display_name: displayName })
    .eq("id", user.id);

  if (error) throw new Error(error.message);
}

// ────────────────────────────────────────────
// 로그아웃
// ────────────────────────────────────────────

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// ────────────────────────────────────────────
// 이메일/비밀번호 로그인
// ────────────────────────────────────────────

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(translateAuthError(error.message));

  redirect("/");
}

// ────────────────────────────────────────────
// 이메일 회원가입
// ────────────────────────────────────────────

export async function signUpWithEmail(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error) throw new Error(translateAuthError(error.message));

  return { message: "인증 이메일을 발송했습니다. 메일함을 확인해주세요." };
}

// ────────────────────────────────────────────
// 에러 메시지 한국어 변환
// ────────────────────────────────────────────

function translateAuthError(msg: string): string {
  if (msg.includes("Invalid login credentials")) return "이메일 또는 비밀번호가 올바르지 않습니다.";
  if (msg.includes("Email not confirmed"))       return "이메일 인증이 필요합니다. 메일함을 확인해주세요.";
  if (msg.includes("User already registered"))   return "이미 가입된 이메일입니다.";
  if (msg.includes("Password should be"))        return "비밀번호는 6자 이상이어야 합니다.";
  if (msg.includes("rate limit"))                return "잠시 후 다시 시도해주세요.";
  return msg;
}
