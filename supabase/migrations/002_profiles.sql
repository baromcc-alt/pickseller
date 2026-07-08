-- ================================================
-- profiles 테이블
-- auth.users와 1:1 연결 — 회원가입 시 트리거로 자동 생성
-- ================================================

create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  email        text not null,
  display_name text,
  avatar_url   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- RLS 활성화
alter table public.profiles enable row level security;

-- 본인 프로필만 읽기 가능
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

-- 본인 프로필만 수정 가능
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- insert는 트리거에서만 (service_role)
create policy "profiles_insert_trigger"
  on public.profiles for insert
  with check (true);

-- ================================================
-- 회원가입 시 profiles 자동 생성 트리거
-- ================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    -- Google OAuth의 경우 full_name, 일반 가입은 null
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      null
    ),
    -- Google OAuth 프로필 이미지
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture',
      null
    )
  );
  return new;
end;
$$;

-- 기존 트리거 있으면 삭제 후 재생성
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at 자동 갱신 함수
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- 코멘트
comment on table  public.profiles is '유저 프로필 테이블 (auth.users와 1:1)';
comment on column public.profiles.id is 'auth.users.id와 동일';
