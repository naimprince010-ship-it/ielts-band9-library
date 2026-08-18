alter table public.payment_requests
  add column if not exists base_amount integer,
  add column if not exists discount_amount integer not null default 0,
  add column if not exists coupon_code text;

update public.payment_requests
set base_amount = round(amount)::integer
where base_amount is null;

alter table public.payment_requests
  alter column base_amount set not null;

alter table public.payment_requests
  add constraint payment_requests_base_amount_nonnegative check (base_amount >= 0),
  add constraint payment_requests_discount_amount_nonnegative check (discount_amount >= 0),
  add constraint payment_requests_discount_not_above_base check (discount_amount <= base_amount),
  add constraint payment_requests_coupon_code_format check (coupon_code is null or coupon_code ~ '^[A-Z0-9_-]{3,40}$');

create index if not exists payment_requests_coupon_code_idx
  on public.payment_requests (coupon_code)
  where coupon_code is not null;
