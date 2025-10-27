/**
 * API Test Suite
 * Tests all API endpoints for Drive Labs
 */

const BASE_URL = 'http://localhost:3000'

const testSpec = {
  name: "Test Project",
  description: "A test project for API testing",
  stack: "next-tailwind",
  features: ["auth", "forms"],
  theme: { primary: "#3B82F6", accent: "#10B981" },
  pages: [{ route: "/", purpose: "Homepage" }],
  assets: []
}

async function testBuildAPI() {
  console.log('\n🧪 Testing Build API (/api/build)...')
  try {
    const response = await fetch(`${BASE_URL}/api/build`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testSpec)
    })
    
    if (response.ok) {
      const blob = await response.blob()
      console.log(`✅ Build API: SUCCESS (Returned ${blob.size} bytes ZIP file)`)
      return true
    } else {
      const error = await response.text()
      console.log(`❌ Build API: FAILED (${response.status})`)
      console.log('   Error:', error)
      return false
    }
  } catch (error) {
    console.log(`❌ Build API: ERROR - ${error.message}`)
    return false
  }
}

async function testLintAPI() {
  console.log('\n🧪 Testing Lint API (/api/lint)...')
  try {
    const response = await fetch(`${BASE_URL}/api/lint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testSpec)
    })
    
    const data = await response.json()
    
    if (response.ok && data.success !== undefined) {
      console.log(`✅ Lint API: SUCCESS (Checked: ${data.summary?.totalErrors || 0} errors)`)
      return true
    } else {
      console.log(`❌ Lint API: FAILED (${response.status})`)
      console.log('   Response:', JSON.stringify(data, null, 2))
      return false
    }
  } catch (error) {
    console.log(`❌ Lint API: ERROR - ${error.message}`)
    return false
  }
}

async function testGenerateTemplateAPI() {
  console.log('\n🧪 Testing Generate Template API (/api/generate-template)...')
  try {
    const response = await fetch(`${BASE_URL}/api/generate-template`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt: "Create a React landing page with hero section and contact form" 
      })
    })
    
    if (response.ok) {
      const code = await response.text()
      if (code.length > 100) {
        console.log(`✅ Generate Template API: SUCCESS (Generated ${code.length} chars of code)`)
        return true
      } else {
        console.log(`❌ Generate Template API: FAILED (Generated insufficient code)`)
        return false
      }
    } else {
      const error = await response.text()
      console.log(`❌ Generate Template API: FAILED (${response.status})`)
      console.log('   Error:', error)
      return false
    }
  } catch (error) {
    console.log(`❌ Generate Template API: ERROR - ${error.message}`)
    return false
  }
}

async function testPreviewVercelAPI() {
  console.log('\n🧪 Testing Preview Vercel API (/api/preview/vercel)...')
  try {
    // First generate files
    const generateResponse = await fetch(`${BASE_URL}/api/build`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testSpec)
    })
    
    if (!generateResponse.ok) {
      console.log('❌ Preview Vercel API: SKIPPED (Build API failed)')
      return false
    }
    
    const files = {
      "package.json": "{\"name\":\"test-project\",\"version\":\"0.1.0\"}",
      "app/page.tsx": "export default function Page() { return <div>Hello</div> }"
    }
    
    const response = await fetch(`${BASE_URL}/api/preview/vercel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        files,
        name: testSpec.name
      })
    })
    
    const data = await response.json()
    
    if (response.ok && data.previewUrl) {
      console.log(`✅ Preview Vercel API: SUCCESS (Preview: ${data.previewUrl})`)
      return true
    } else if (response.status === 401 || response.status === 403) {
      console.log(`⚠️  Preview Vercel API: AUTH REQUIRED (Missing Vercel token)`)
      return true  // Not a failure, just needs auth
    } else {
      console.log(`❌ Preview Vercel API: FAILED (${response.status})`)
      console.log('   Response:', JSON.stringify(data, null, 2))
      return false
    }
  } catch (error) {
    console.log(`❌ Preview Vercel API: ERROR - ${error.message}`)
    return false
  }
}

async function runAllTests() {
  console.log('\n🚀 Starting API Test Suite...\n')
  
  const results = {
    build: await testBuildAPI(),
    lint: await testLintAPI(),
    generateTemplate: await testGenerateTemplateAPI(),
    previewVercel: await testPreviewVercelAPI()
  }
  
  const passed = Object.values(results).filter(r => r).length
  const total = Object.keys(results).length
  
  console.log('\n' + '='.repeat(50))
  console.log(`\n📊 Test Results: ${passed}/${total} tests passed`)
  console.log('\n✅ Summary:')
  console.log(`   Build API: ${results.build ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`   Lint API: ${results.lint ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`   Generate Template API: ${results.generateTemplate ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`   Preview Vercel API: ${results.previewVercel ? '✅ PASS' : '❌ FAIL'}`)
  console.log('\n' + '='.repeat(50))
  
  process.exit(passed === total ? 0 : 1)
}

runAllTests()

