import Anthropic from "@anthropic-ai/sdk";
import type { SourcingScore } from "@/lib/scoring/sourcing-score";

export const runtime = "nodejs";
export const maxDuration = 30;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const { keyword, score }: { keyword: string; score: SourcingScore } = await req.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response("ANTHROPIC_API_KEY가 설정되지 않았습니다.", { status: 500 });
  }

  const prompt = `당신은 쿠팡·스마트스토어 이커머스 셀러 전문 컨설턴트입니다.
아래 데이터를 바탕으로 "${keyword}" 키워드의 소싱 가능성을 분석해주세요.

[키워드 데이터]
- 소싱 스코어: ${score.total}/100 (${score.grade}등급 · ${score.label})
- 최근 4주 평균 검색량: ${score.recentAvg}/100
- 트렌드 방향: ${score.direction} (변화율 ${score.momentum > 0 ? "+" : ""}${score.momentum}%)
- 네이버 쇼핑 등록 상품 수: ${score.productCount.toLocaleString()}개 (${score.competitionLevel})
${score.avgPrice ? `- 평균 판매가: ${score.avgPrice.toLocaleString()}원` : ""}

[분석 요청]
다음 3가지를 간결하게 한국어로 작성하세요:
1. **시장 상황** (1~2문장): 검색량과 트렌드를 바탕으로 지금 시장이 어떤 상태인지
2. **소싱 적합도** (1~2문장): 이 키워드로 판매를 시작하기 좋은지 솔직하게
3. **셀러 전략 팁** (1~2문장): 구체적이고 실용적인 조언

전체 200자 이내. 마크다운 굵게(**) 사용 가능. 서두 없이 바로 본문으로 시작.`;

  const stream = await client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    messages: [{ role: "user", content: prompt }],
  });

  // ReadableStream으로 변환해 클라이언트에 전달
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
