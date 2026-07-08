import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 — 픽셀러",
  description: "픽셀러 개인정보처리방침",
  robots: { index: false },
};

const LAST_UPDATED = "2026년 7월 8일";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">개인정보처리방침</h1>
      <p className="text-sm text-gray-400 mb-10">최종 수정일: {LAST_UPDATED}</p>

      <div className="prose-custom space-y-10 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. 개요</h2>
          <p>
            픽셀러(이하 "서비스")는 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」 및 관련 법령을
            준수합니다. 본 방침은 서비스가 수집하는 개인정보의 항목, 수집 목적, 보유 기간 및 이용자의 권리를 안내합니다.
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm space-y-1">
            <p><strong>운영자(서비스 제공자):</strong> 픽셀러</p>
            <p><strong>문의 이메일:</strong> baromcc@gmail.com</p>
            <p><strong>사업자 등록:</strong> 미등록 (개인 운영)</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. 수집하는 개인정보 항목</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border border-gray-200 font-semibold">수집 항목</th>
                <th className="text-left p-3 border border-gray-200 font-semibold">수집 방법</th>
                <th className="text-left p-3 border border-gray-200 font-semibold">수집 목적</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200">이메일 주소</td>
                <td className="p-3 border border-gray-200">회원가입(이메일 직접 입력)</td>
                <td className="p-3 border border-gray-200">회원 식별 및 로그인</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="p-3 border border-gray-200">이메일 주소, 프로필 정보</td>
                <td className="p-3 border border-gray-200">Google 소셜 로그인</td>
                <td className="p-3 border border-gray-200">회원 식별 및 로그인</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">광고 쿠키 및 식별자</td>
                <td className="p-3 border border-gray-200">Google AdSense 자동 수집</td>
                <td className="p-3 border border-gray-200">맞춤형 광고 제공</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="p-3 border border-gray-200">서비스 이용 기록, 접속 IP</td>
                <td className="p-3 border border-gray-200">서비스 이용 시 자동 생성</td>
                <td className="p-3 border border-gray-200">서비스 품질 개선, 부정이용 방지</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-sm text-gray-500">
            * 결제 정보는 수집하지 않습니다. 서비스는 무료로 제공됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. 개인정보의 보유 및 이용 기간</h2>
          <ul className="space-y-2 list-disc list-inside text-sm">
            <li>회원 정보(이메일 등): <strong>회원 탈퇴 시까지</strong></li>
            <li>서비스 이용 기록: <strong>1년</strong></li>
            <li>관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. 개인정보의 제3자 제공</h2>
          <p className="mb-3">서비스는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우는 예외입니다.</p>

          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg text-sm">
              <p className="font-semibold mb-2">🔧 Supabase (데이터베이스 / 인증)</p>
              <p className="text-gray-600">회원 인증 및 데이터 저장을 위해 Supabase에 이메일 등 계정 정보가 저장됩니다.</p>
              <p className="text-gray-400 mt-1">제공 항목: 이메일, 가입일시 · 보관 기간: 회원 탈퇴 시까지</p>
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-xs mt-1 inline-block">
                Supabase 개인정보처리방침 →
              </a>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg text-sm">
              <p className="font-semibold mb-2">📢 Google AdSense (광고)</p>
              <p className="text-gray-600">광고 게재를 위해 Google이 쿠키를 통해 이용자 행동 데이터를 수집할 수 있습니다.
                이용자는 <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer"
                  className="text-blue-500 hover:underline">Google 광고 설정</a>에서 맞춤 광고를 거부할 수 있습니다.
              </p>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-xs mt-1 inline-block">
                Google 개인정보처리방침 →
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. 쿠키(Cookie) 운영</h2>
          <p className="mb-2">
            서비스는 로그인 상태 유지 및 광고 서비스 제공을 위해 쿠키를 사용합니다.
          </p>
          <ul className="space-y-1 list-disc list-inside text-sm">
            <li>로그인 세션 쿠키: 로그인 상태 유지 목적</li>
            <li>Google AdSense 쿠키: 광고 관련 (Google이 관리)</li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            브라우저 설정에서 쿠키를 거부할 수 있으나, 일부 서비스 이용이 제한될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. 이용자의 권리</h2>
          <p className="mb-3">이용자는 언제든지 아래 권리를 행사할 수 있습니다.</p>
          <ul className="space-y-2 list-disc list-inside text-sm">
            <li>개인정보 열람 요청</li>
            <li>개인정보 정정·삭제 요청</li>
            <li>개인정보 처리 정지 요청</li>
            <li>회원 탈퇴(계정 삭제)</li>
          </ul>
          <p className="mt-3 text-sm">
            권리 행사는 <strong>baromcc@gmail.com</strong>으로 이메일 문의 주시면 지체 없이 처리하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. 개인정보 보호 책임자</h2>
          <div className="p-4 bg-gray-50 rounded-lg text-sm space-y-1">
            <p><strong>책임자:</strong> 픽셀러 운영자</p>
            <p><strong>이메일:</strong> baromcc@gmail.com</p>
            <p className="text-gray-500 mt-2">
              개인정보 관련 불만이나 피해 구제를 위해 개인정보 분쟁조정위원회(www.kopico.go.kr) 또는
              개인정보침해신고센터(privacy.kisa.or.kr)에 도움을 요청하실 수 있습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. 방침 변경 안내</h2>
          <p className="text-sm">
            본 방침은 법령 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시 서비스 내 공지를 통해 안내합니다.
          </p>
        </section>

        <div className="pt-6 border-t border-gray-200 text-sm text-gray-400">
          본 방침은 {LAST_UPDATED}부터 적용됩니다.
        </div>

      </div>
    </div>
  );
}
