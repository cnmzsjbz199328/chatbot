 GET /api/profile/tj15982183241 500 in 34432ms       
Error fetching user projects: Error: Failed query: select "id" from "user_profiles" where "user_profiles"."username" = $1 limit $2
params: tj15982183241,1
    at async GET (src\app\api\projects\[username]\route.ts:14:21)
  12 |
  13 |     // 首先通过username查找用户ID
> 14 |     const profile = await db
     |                     ^
  15 |       .select({ id: userProfilesTable.id })   
  16 |       .from(userProfilesTable)
  17 |       .where(eq(userProfilesTable.username, username)) {
  query: 'select "id" from "user_profiles" where "user_profiles"."username" = $1 limit $2',
  params: [Array],
  [cause]: Error: write CONNECT_TIMEOUT aws-1-ap-southeast-1.pooler.supabase.com:5432
      at <unknown> (Error: write CONNECT_TIMEOUT aws-1-ap-southeast-1.pooler.supabase.com:5432) {
    code: 'CONNECT_TIMEOUT',
    errno: 'CONNECT_TIMEOUT',
    address: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 5432
  }
}
 GET /api/projects/tj15982183241 500 in 34501ms  