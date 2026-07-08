import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getProfile } from "@/app/actions/auth";
import SignOutButton from "./SignOutButton";

export const metadata: Metadata = { title: "마이페이지" };

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const PROVIDER_LABEL: Record<string, string> = {
  email: "이메일",
  google: "Google",
  kakao: "카카오",
};

export default async function MyPage() {
  const profile = await getProfile();

  if (!profile) redirect("/login");

  const providerLabel = PROVIDER_LABEL[profile.provider] ?? profile.provider;
  const initial = (profile.displayName ?? profile.email).charAt(0).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">마이페이지</h1>

      {/* 프로필 카드 */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          {profile.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatarUrl}
              alt="프로필"
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
              {initial}
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-900 text-lg">
              {profile.displayName ?? "이름 미설정"}
            </p>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <InfoRow label="이메일" value={profile.email} />
          <InfoRow label="로그인 방식" value={providerLabel} />
          <InfoRow label="가입일" value={formatDate(profile.createdAt)} />
          <InfoRow label="마지막 로그인" value={formatDate(profile.lastSignInAt)} />
        </div>
      </div>

      {/* 로그아웃 */}
      <SignOutButton />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  );
}
