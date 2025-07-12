// lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'

// This should NEVER be exposed to the client
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
    },
  }
)
