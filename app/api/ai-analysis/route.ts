import Anthropic from "@anthropic-ai/sdk";
import type { SourcingScore } from "@/lib/scoring/sourcing-score";

export const runtime = "nodejs";
export const maxDuration = 30;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const { keyword, score }: { keyword: string; score: SourcingScore | null } = await req.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response("ANTHROPIC_API_KEY가 설정되지 않았습니다.", { status: 500 });
  }

  // 데이터가 있을 때: 수치 기반 분석
  // 데이터가 없을 때: 키워드 이름만으로 카테고리 분석
  const prompt = score
    ? `당신은 쿠팡·스마트스토어 이커머스 셀러 전문 컨설턴트입니다.
아래 데이터를 바탕으로 "${keyword}" 키워드의 소싱 가능성을 분석해주세요.

[키워드 데이터]
- 소싱 스코어: ${score.total}/100 (${score.grade}등급 · ${score.label})
- 월 검색량: ${score.monthlyTotal > 0 ? `${score.monthlyTotal.toLocaleString("ko-KR")}회 (PC ${score.monthlyPc.toLocaleString("ko-KR")} + 모바일 ${score.monthlyMobile.toLocaleString("ko-KR")})` : "데이터 없음"}
- 경쟁강도: ${score.compIdx}
- 트렌드 방향: ${score.direction} (변화율 ${score.momentum > 0 ? "+" : ""}${score.momentum}%)

[분석 요청]
다음 3가지를 간결하게 한국어로 작성하세요:
1. **시장 상황** (1~2문장): 검색량과 트렌드를 바탕으로 지금 시장이 어떤 상태인지
2. **소싱 적합도** (1~2문장): 이 키워드로 판매를 시작하기 좋은지 솔직하게
3. **셀러 전략 팁** (1~2문장): 구체적이고 실용적인 조언

전체 200자 이내. 마크다운 굵게(**) 사용 가능. 서두 없이 바로 본문으로 시작.`
    : `당신은 쿠팡·스마트스토어 이커머스 셀러 전문 컨설턴트입니다.
"${keyword}" 키워드에 대해 이커머스 소싱 관점에서 분석해주세요.
(현재 실시간 검색량 데이터를 불러오지 못한 상태이므로, 카테고리 특성과 시장 지식을 바탕으로 분석해주세요)

[분석 요청]
다음 3가지를 간결하게 한국어로 작성하세요:
1. **시장 특성** (1~2문장): "${keyword}" 카테고리의 이커머스 시장 특성
2. **소싱 고려사항** (1~2문장): 이 키워드로 판매 시 반드시 고려해야 할 사항
3. **셀러 전략 팁** (1~2문장): 실용적이고 구체적인 판매 조언

전체 200자 이내. 마크다운 굵게(**) 사용 가능. 서두 없이 바로 본문으로 시작.`;

  const stream = await client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    messages: [{ role: "user", content: prompt }],
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
