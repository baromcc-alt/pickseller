-- ================================================
-- keyword_rankings 테이블
-- 카테고리별 인기 키워드 랭킹 (일 1회 갱신)
-- ================================================

create table if not exists public.keyword_rankings (
  id           uuid primary key default gen_random_uuid(),
  category     text not null,           -- 카테고리명 (예: 전자기기)
  keyword      text not null,           -- 키워드
  rank         int  not null,           -- 순위 (1~N)
  score        numeric not null,        -- 최근 검색량 지수 (0~100)
  score_prev   numeric,                 -- 이전 점수 (트렌드 방향용)
  trend        text default 'stable',   -- up / down / stable / new
  ranked_at    date not null default current_date,  -- 랭킹 날짜
  created_at   timestamptz not null default now()
);

-- 카테고리 + 날짜로 조회
create index if not exists idx_keyword_rankings_lookup
  on public.keyword_rankings (category, ranked_at desc, rank asc);

-- 날짜별 정리용
create index if not exists idx_keyword_rankings_date
  on public.keyword_rankings (ranked_at);

-- RLS
alter table public.keyword_rankings enable row level security;

create policy "keyword_rankings_select"
  on public.keyword_rankings for select using (true);

create policy "keyword_rankings_insert"
  on public.keyword_rankings for insert with check (true);

create policy "keyword_rankings_delete"
  on public.keyword_rankings for delete using (true);

comment on table public.keyword_rankings is '카테고리별 인기 키워드 일간 랭킹 (네이버 데이터랩 기반)';
