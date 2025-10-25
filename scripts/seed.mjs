import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY // must be the service role key

if (!url || !key) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables')
  process.exit(1)
}

const supabase = createClient(url, key)

async function seed() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'tester@example.com',
    password: 'Passw0rd!',
    email_confirm: true
  })

  if (error) {
    if (error.message.includes('already been registered')) {
      console.log('✅ Test user already exists:', 'tester@example.com')
    } else {
      console.error('❌ Seed failed:', error.message)
      process.exit(1)
    }
  } else {
    console.log('✅ Test user ready:', data.user?.email)
  }
}

seed()
