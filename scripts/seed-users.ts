import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.SUPABASE_URL!
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(url, key)

interface TestUser {
  email: string
  password: string
  role: string
  metadata?: Record<string, any>
}

const testUsers: TestUser[] = [
  {
    email: 'tester@example.com',
    password: 'Passw0rd!',
    role: 'test-user',
    metadata: { created_by: 'seed-script', environment: 'test' }
  },
  {
    email: 'admin@example.com',
    password: 'AdminPass123!',
    role: 'admin',
    metadata: { created_by: 'seed-script', environment: 'test', permissions: ['read', 'write', 'admin'] }
  },
  {
    email: 'developer@example.com',
    password: 'DevPass123!',
    role: 'developer',
    metadata: { created_by: 'seed-script', environment: 'test', permissions: ['read', 'write'] }
  },
  {
    email: 'viewer@example.com',
    password: 'ViewerPass123!',
    role: 'viewer',
    metadata: { created_by: 'seed-script', environment: 'test', permissions: ['read'] }
  }
]

async function createUser(user: TestUser): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: {
        role: user.role,
        ...user.metadata
      }
    })

    if (error) {
      if (error.message.includes('already been registered')) {
        console.log(`⚠️  User already exists: ${user.email}`)
        return false
      } else {
        console.error(`❌ Error creating user ${user.email}:`, error.message)
        return false
      }
    } else {
      console.log(`✅ Created user: ${user.email} (${user.role})`)
      console.log(`   🆔 ID: ${data.user?.id}`)
      return true
    }
  } catch (err) {
    console.error(`❌ Unexpected error creating user ${user.email}:`, err)
    return false
  }
}

async function listExistingUsers(): Promise<void> {
  try {
    const { data, error } = await supabase.auth.admin.listUsers()
    
    if (error) {
      console.error('❌ Error fetching users:', error.message)
      return
    }

    console.log(`\n📋 Current users in database (${data.users.length}):`)
    data.users.forEach((user, index) => {
      const role = user.user_metadata?.role || 'unknown'
      const confirmed = user.email_confirmed_at ? '✅' : '❌'
      console.log(`${index + 1}. ${user.email} (${role}) ${confirmed}`)
      console.log(`   🆔 ${user.id}`)
      console.log(`   📅 ${new Date(user.created_at).toLocaleString()}`)
    })
  } catch (err) {
    console.error('❌ Error listing users:', err)
  }
}

async function seedUsers(): Promise<void> {
  console.log('🌱 Starting user seed process...')
  console.log(`📝 Creating ${testUsers.length} test users\n`)

  let created = 0
  let existing = 0

  for (const user of testUsers) {
    const wasCreated = await createUser(user)
    if (wasCreated) {
      created++
    } else {
      existing++
    }
  }

  console.log(`\n📊 Seed Summary:`)
  console.log(`   ✅ Created: ${created} users`)
  console.log(`   ⚠️  Already existed: ${existing} users`)
  console.log(`   📝 Total processed: ${testUsers.length} users`)

  await listExistingUsers()

  console.log('\n📝 E2E Test Credentials:')
  console.log('E2E_EMAIL=tester@example.com')
  console.log('E2E_PASSWORD=Passw0rd!')
  
  console.log('\n🧪 Ready for testing!')
}

seedUsers().catch(console.error)
