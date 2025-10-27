/**
 * OpenAI API Test
 */

const BASE_URL = 'http://localhost:3000'

async function testOpenAIAPI() {
  console.log('\n🧪 Testing OpenAI Integration...\n')
  
  const testCases = [
    {
      name: "Simple Component",
      prompt: "Create a React button component with onClick handler"
    },
    {
      name: "Next.js Page", 
      prompt: "Create a Next.js 14 page component with app router"
    },
    {
      name: "Complex UI",
      prompt: "Create a card component with header, body, and footer sections"
    }
  ]
  
  let passed = 0
  let failed = 0
  
  for (const testCase of testCases) {
    try {
      console.log(`Testing: ${testCase.name}`)
      
      const response = await fetch(`${BASE_URL}/api/generate-template`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: testCase.prompt })
      })
      
      if (response.ok) {
        const code = await response.text()
        if (code.length > 100 && code.includes('export')) {
          console.log(`   ✅ SUCCESS - Generated ${code.length} characters`)
          passed++
        } else {
          console.log(`   ❌ FAILED - Insufficient code (${code.length} chars)`)
          failed++
        }
      } else {
        const error = await response.text()
        console.log(`   ❌ FAILED - HTTP ${response.status}: ${error}`)
        failed++
      }
    } catch (error) {
      console.log(`   ❌ ERROR - ${error.message}`)
      failed++
    }
  }
  
  console.log('\n' + '='.repeat(50))
  console.log(`📊 Results: ${passed} passed, ${failed} failed`)
  console.log(`✅ OpenAI API Status: ${passed === testCases.length ? 'WORKING' : 'HAS ISSUES'}`)
  console.log('='.repeat(50) + '\n')
  
  return passed === testCases.length
}

testOpenAIAPI().then(success => process.exit(success ? 0 : 1))

