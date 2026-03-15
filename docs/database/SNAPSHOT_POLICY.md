# Snapshot Policy

Public onboarding snapshots use an explicit allowlist. If a table is not on the allowlist, it must not be published.

## Included tables

- `Conflict`
- `ConflictDaySnapshot`
- `CasualtySummary`
- `EconomicImpactChip`
- `Scenario`
- `Actor`
- `ActorDaySnapshot`
- `ActorAction`
- `IntelEvent`
- `EventSource`
- `EventActorResponse`
- `XPost`
- `MapFeature`
- `MapStory`
- `MapStoryEvent`
- `RssFeed`
- `ConflictCollection`
- `ConflictChannel`
- `ChannelFeed`
- `EconomicIndex`
- `PredictionGroup`

## Excluded tables

- `AnonymousVisitor`
- `ChatSession`
- `ChatSessionMessage`
- `DocumentEmbedding`
- `_prisma_migrations`
- All Supabase system schemas such as `auth`, `storage`, `vault`, and `graphql_public`

## Rules

- Treat every published snapshot as permanently public
- Add new tables to the allowlist only after an explicit review
- Use a dedicated read-only production connection string for publishing
- Prefer restoring only app data, not full platform/system schemas
