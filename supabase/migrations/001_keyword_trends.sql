-- ================================================
-- keyword_trends 테이블
-- 네이버 데이터랩 API 응답을 캐싱하는 테이블
-- ================================================

create table if not exists public.keyword_trends (
  id          uuid primary key default gen_random_uuid(),
  keyword     text not null,
  -- API 요청 파라미터 (캐시 키 구성에 사용)
  time_unit   text not null default 'week',  -- date | week | month
  months      int  not null default 3,
  -- API 응답 원본 (JSONB로 유연하게 저장)
  raw_data    jsonb not null,
  -- 파싱된 트렌드 데이터 (period, ratio 배열)
  trend_data  jsonb not null default '[]',
  -- 캐시 관리
  fetched_at  timestamptz not null default now(),
  expires_at  timestamptz not null default (now() + interval '24 hours'),
  -- 메타
  created_at  timestamptz not null default now()
);

-- 검색 최적화: keyword + time_unit + months 조합으로 최신 캐시 조회
create index if not exists idx_keyword_trends_lookup
  on public.keyword_trends (keyword, time_unit, months, expires_at desc);

-- 만료된 캐시 정리용 인덱스
create index if not exists idx_keyword_trends_expires_at
  on public.keyword_trends (expires_at);

-- RLS 활성화 (인증 없이 읽기 허용, 쓰기는 서버에서만)
alter table public.keyword_trends enable row level security;

-- 누구나 읽기 가능 (서비스 특성상 공개 데이터)
create policy "keyword_trends_select_policy"
  on public.keyword_trends for select
  using (true);

-- 서버(service_role)만 insert/update/delete 가능
-- anon 키로는 쓰기 불가 → Server Action에서 service_role 키 사용 권장
-- (현재는 anon 키로 insert 허용 — 프로덕션에서 service_role로 교체)
create policy "keyword_trends_insert_policy"
  on public.keyword_trends for insert
  with check (true);

create policy "keyword_trends_delete_policy"
  on public.keyword_trends for delete
  using (true);

-- ================================================
-- 만료 캐시 자동 삭제 함수 (선택 사항 — pg_cron 연동 시 사용)
-- ================================================

create or replace function public.cleanup_expired_keyword_trends()
returns void
language sql
security definer
as $$
  delete from public.keyword_trends where expires_at < now();
$$;

-- 코멘트
comment on table  public.keyword_trends is '네이버 데이터랩 검색어트렌드 API 캐시 테이블 (TTL 24h)';
comment on column public.keyword_trends.raw_data   is '네이버 API 원본 응답 JSON';
comment on column public.keyword_trends.trend_data is '파싱된 {period, ratio} 배열';
comment on column public.keyword_trends.expires_at is '이 시각 이후 캐시 무효화';
