revoke all on table public.payment_requests from anon;

grant select on table public.payment_requests to authenticated;
grant all on table public.payment_requests to service_role;
