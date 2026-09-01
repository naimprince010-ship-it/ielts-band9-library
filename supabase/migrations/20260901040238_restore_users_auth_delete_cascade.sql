-- Keep the public profile lifecycle aligned with its owning Auth user.
-- The remote constraint had drifted from the baseline and blocked staff-safe user cleanup.
alter table public.users
  drop constraint if exists users_id_fkey;

alter table public.users
  add constraint users_id_fkey
  foreign key (id)
  references auth.users(id)
  on delete cascade;
