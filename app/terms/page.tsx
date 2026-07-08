import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 — 픽셀러",
  description: "픽셀러 서비스 이용약관",
  robots: { index: false },
};

const LAST_UPDATED = "2026년 7월 8일";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">이용약관</h1>
      <p className="text-sm text-gray-400 mb-10">최종 수정일: {LAST_UPDATED}</p>

      <div className="space-y-10 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">제1조 (목적)</h2>
          <p>
            본 약관은 픽셀러(이하 "서비스")가 제공하는 키워드 분석, 마진 계산 등 온라인 서비스의 이용 조건 및
            절차, 운영자와 이용자 간의 권리·의무 관계를 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">제2조 (서비스 제공)</h2>
          <p className="mb-3">서비스는 다음 기능을 무료로 제공합니다.</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>네이버 데이터랩 기반 키워드 검색량 트렌드 분석</li>
            <li>카테고리별 인기 키워드 랭킹</li>
            <li>마켓별 마진 계산 및 손익분기 분석</li>
            <li>키워드 비교 분석</li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            서비스는 광고 수익을 통해 운영되며, 이용자에게 별도의 이용료를 부과하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">제3조 (회원가입 및 계정)</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>이용자는 이메일 또는 Google 계정으로 회원가입 할 수 있습니다.</li>
            <li>가입 시 제공한 정보는 정확해야 하며, 변경 시 즉시 수정해야 합니다.</li>
            <li>계정의 관리 책임은 이용자에게 있습니다. 타인에게 계정을 양도하거나 공유할 수 없습니다.</li>
            <li>부정 이용이 확인된 계정은 사전 통보 없이 이용이 제한될 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">제4조 (이용자 의무)</h2>
          <p className="mb-3">이용자는 다음 행위를 해서는 안 됩니다.</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>서비스의 데이터를 무단으로 크롤링하거나 대량 수집하는 행위</li>
            <li>서비스 운영을 방해하거나 과부하를 유발하는 행위</li>
            <li>타인의 계정을 도용하거나 허위 정보를 입력하는 행위</li>
            <li>법령 또는 공공질서에 반하는 행위</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">제5조 (광고)</h2>
          <p>
            서비스는 Google AdSense를 통해 광고를 게재합니다. 광고 콘텐츠는 Google이 관리하며,
            서비스 운영자는 광고 내용에 대한 책임을 지지 않습니다. 이용자는 광고 클릭 여부를 자유롭게 결정할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">제6조 (데이터의 정확성)</h2>
          <p>
            서비스가 제공하는 키워드 트렌드, 마진 계산 등의 데이터는 네이버 데이터랩 API 기반의 참고 정보입니다.
            실제 사업 의사결정에 활용 시 추가적인 검토가 필요하며, 데이터의 정확성에 대해 서비스는 보증하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">제7조 (서비스 변경 및 중단)</h2>
          <p>
            운영자는 서비스의 전부 또는 일부를 사전 고지 후 변경하거나 중단할 수 있습니다.
            불가피한 경우 사전 고지 없이 서비스가 중단될 수 있으며, 이로 인한 손해에 대해 운영자는 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">제8조 (면책)</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>천재지변, 서버 장애 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.</li>
            <li>이용자 귀책 사유로 발생한 손해에 대해 책임을 지지 않습니다.</li>
            <li>서비스 데이터를 기반으로 한 이용자의 사업적 판단에 대한 결과는 이용자 본인의 책임입니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">제9조 (분쟁 해결)</h2>
          <p>
            본 약관과 관련된 분쟁은 대한민국 법령을 적용하며, 분쟁 발생 시 운영자 소재지를 관할하는 법원을
            제1심 법원으로 합니다. 분쟁 발생 전 baromcc@gmail.com으로 문의주시면 신속히 해결하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">제10조 (약관 변경)</h2>
          <p>
            약관은 변경될 수 있으며, 변경 시 서비스 내 공지를 통해 7일 전 안내합니다.
            변경 후 계속 서비스를 이용하면 변경된 약관에 동의한 것으로 간주합니다.
          </p>
        </section>

        <div className="pt-6 border-t border-gray-200 text-sm text-gray-400">
          본 약관은 {LAST_UPDATED}부터 적용됩니다.
        </div>

      </div>
    </div>
  );
}
