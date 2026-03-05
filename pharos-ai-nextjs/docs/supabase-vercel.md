# Supabase + Vercel Setup

## Env Model

- `DATABASE_URL` = transaction pooler (runtime app traffic)
- `DATABASE_URL_MIGRATION` = session pooler (schema push/migrations/data jobs)
- `DIRECT_URL` = direct DB host (Prisma direct connection for migration/introspection)

## Local Workflow

1. Keep `.env.local` loaded with Supabase values.
2. Generate Prisma client:

```bash
npm run db:generate
```

3. Run migration push using the migration pooler:

```bash
npm run db:push:migration
```

4. Run migration deploy:

```bash
npm run db:migrate:deploy
```

## Vercel Environment Variables

Set these in Vercel Project Settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`
- `DATABASE_URL_MIGRATION`
- `DIRECT_URL`
- `NEXT_PUBLIC_CONFLICT_ID`
- `PHAROS_ADMIN_API_KEY`

## Notes

- Transaction pooler does not support prepared statements; use it for short stateless runtime traffic.
- Session pooler is used for migration/push operations.
- Direct URL remains available for Prisma operations that require direct access.
