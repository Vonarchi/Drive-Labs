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

const testUsers = [
  {
    email: 'tester@example.com',
    password: 'Passw0rd!',
    role: 'user'
  },
  {
    email: 'admin@example.com',
    password: 'AdminPass123!',
    role: 'admin'
  },
  {
    email: 'developer@example.com',
    password: 'DevPass123!',
    role: 'developer'
  }
]

const sampleProjects = [
  {
    name: 'labs-demo',
    description: 'Demo project for testing',
    status: 'active'
  },
  {
    name: 'test-app',
    description: 'Test application',
    status: 'completed'
  },
  {
    name: 'sample-project',
    description: 'Sample project for development',
    status: 'pending'
  }
]

async function createUsers() {
  console.log('🔄 Creating test users...')
  
  for (const user of testUsers) {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          role: user.role
        }
      })

      if (error) {
        if (error.message.includes('already registered')) {
          console.log(`⚠️  User already exists: ${user.email}`)
        } else {
          console.error(`❌ Error creating user ${user.email}:`, error.message)
        }
      } else {
        console.log(`✅ Created user: ${user.email} (${user.role})`)
      }
    } catch (err) {
      console.error(`❌ Unexpected error creating user ${user.email}:`, err.message)
    }
  }
}

async function createSampleData() {
  console.log('🔄 Creating sample data...')
  
  // Get the first user to associate projects with
  const { data: users } = await supabase.auth.admin.listUsers()
  const firstUser = users?.users?.[0]
  
  if (!firstUser) {
    console.log('⚠️  No users found, skipping sample data creation')
    return
  }

  for (const project of sampleProjects) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          run_id: `${project.name}-${Date.now()}`,
          project_spec: {
            name: project.name,
            description: project.description,
            status: project.status
          },
          owner_id: firstUser.id,
          status: 'completed'
        })

      if (error) {
        console.error(`❌ Error creating project ${project.name}:`, error.message)
      } else {
        console.log(`✅ Created project: ${project.name}`)
      }
    } catch (err) {
      console.error(`❌ Unexpected error creating project ${project.name}:`, err.message)
    }
  }
}

async function seed() {
  console.log('🌱 Starting database seed...')
  
  try {
    await createUsers()
    await createSampleData()
    
    console.log('\n✅ Seed completed successfully!')
    console.log('\n📋 Test users created:')
    testUsers.forEach(user => {
      console.log(`   ${user.email} (${user.role})`)
    })
    
    console.log('\n📝 Add these to your .env file for E2E tests:')
    console.log(`E2E_EMAIL=${testUsers[0].email}`)
    console.log(`E2E_PASSWORD=${testUsers[0].password}`)
    
  } catch (error) {
    console.error('❌ Seed failed:', error.message)
    process.exit(1)
  }
}

seed()
