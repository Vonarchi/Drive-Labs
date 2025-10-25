import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.SUPABASE_URL!
const key = process.env.SUPABASE_SERVICE_ROLE_KEY! // must be the service role key

const supabase = createClient(url, key)

async function seedTestUser() {
  console.log('🔄 Creating test user...')
  
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'tester@example.com',
    password: 'Passw0rd!',
    email_confirm: true,
    user_metadata: {
      role: 'test-user',
      created_by: 'seed-script'
    }
  })

  if (error) {
    if (error.message.includes('already been registered')) {
      console.log('✅ Test user already exists: tester@example.com')
      
      // Get the existing user info
      const { data: users } = await supabase.auth.admin.listUsers()
      const existingUser = users?.users?.find(u => u.email === 'tester@example.com')
      
      if (existingUser) {
        console.log(`📧 Email: ${existingUser.email}`)
        console.log(`🆔 User ID: ${existingUser.id}`)
        console.log(`📅 Created: ${new Date(existingUser.created_at).toLocaleString()}`)
        console.log(`✅ Confirmed: ${existingUser.email_confirmed_at ? 'Yes' : 'No'}`)
      }
    } else {
      console.error('❌ Error creating test user:', error.message)
      process.exit(1)
    }
  } else {
    console.log('✅ Test user created successfully!')
    console.log(`📧 Email: ${data.user?.email}`)
    console.log(`🆔 User ID: ${data.user?.id}`)
    console.log(`📅 Created: ${new Date(data.user?.created_at || '').toLocaleString()}`)
  }

  console.log('\n📝 E2E Test Credentials:')
  console.log('E2E_EMAIL=tester@example.com')
  console.log('E2E_PASSWORD=Passw0rd!')
  
  console.log('\n🧪 Ready for testing!')
}

seedTestUser().catch(console.error)
