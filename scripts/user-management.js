#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const commands = {
  'create': async (email, password) => {
    try {
      console.log(`🔄 Creating user: ${email}`);
      
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

      if (error) {
        console.error('❌ Error creating user:', error.message);
        return;
      }

      console.log('✅ User created successfully!');
      console.log('📧 Email:', email);
      console.log('🆔 User ID:', data.user.id);
      
    } catch (err) {
      console.error('❌ Unexpected error:', err.message);
    }
  },

  'list': async () => {
    try {
      console.log('🔄 Fetching users...');
      
      const { data, error } = await supabase.auth.admin.listUsers();

      if (error) {
        console.error('❌ Error fetching users:', error.message);
        return;
      }

      console.log(`\n📋 Found ${data.users.length} users:`);
      data.users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.email} (${user.id})`);
        console.log(`   Created: ${new Date(user.created_at).toLocaleString()}`);
        console.log(`   Confirmed: ${user.email_confirmed_at ? '✅' : '❌'}`);
        console.log('');
      });
      
    } catch (err) {
      console.error('❌ Unexpected error:', err.message);
    }
  },

  'delete': async (email) => {
    try {
      console.log(`🔄 Deleting user: ${email}`);
      
      // First, get the user by email
      const { data: users, error: listError } = await supabase.auth.admin.listUsers();
      
      if (listError) {
        console.error('❌ Error fetching users:', listError.message);
        return;
      }

      const user = users.users.find(u => u.email === email);
      if (!user) {
        console.error(`❌ User not found: ${email}`);
        return;
      }

      const { error } = await supabase.auth.admin.deleteUser(user.id);

      if (error) {
        console.error('❌ Error deleting user:', error.message);
        return;
      }

      console.log('✅ User deleted successfully!');
      
    } catch (err) {
      console.error('❌ Unexpected error:', err.message);
    }
  },

  'help': () => {
    console.log(`
🔧 Supabase User Management Script

Usage:
  node scripts/user-management.js <command> [args...]

Commands:
  create <email> <password>    Create a new user
  list                        List all users
  delete <email>              Delete a user by email
  help                        Show this help message

Examples:
  node scripts/user-management.js create test@example.com password123
  node scripts/user-management.js list
  node scripts/user-management.js delete test@example.com
    `);
  }
};

async function main() {
  const [,, command, ...args] = process.argv;

  if (!command || !commands[command]) {
    commands.help();
    process.exit(1);
  }

  await commands[command](...args);
}

main();
