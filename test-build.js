#!/usr/bin/env node

// Test script to verify the build functionality
const { generateProjectFiles } = require('./src/lib/generator.ts');

async function testBuild() {
  console.log('🧪 Testing project generation...');
  
  const testSpec = {
    name: "Test App",
    description: "A test application",
    stack: "next-shadcn",
    features: ["auth", "forms"],
    pages: [
      { route: "/", purpose: "Homepage" },
      { route: "/about", purpose: "About page" }
    ],
    theme: { primary: "#3B82F6", accent: "#10B981" },
    assets: []
  };

  try {
    const files = await generateProjectFiles(testSpec);
    
    console.log(`✅ Generated ${files.length} files:`);
    files.forEach(file => {
      console.log(`  - ${file.path} (${file.data.length} bytes)`);
    });
    
    // Check for key files
    const hasPackageJson = files.some(f => f.path === 'package.json');
    const hasLayout = files.some(f => f.path === 'app/layout.tsx');
    const hasPage = files.some(f => f.path === 'app/page.tsx');
    const hasComponents = files.some(f => f.path.includes('components/ui/'));
    
    console.log('\n📋 File checks:');
    console.log(`  package.json: ${hasPackageJson ? '✅' : '❌'}`);
    console.log(`  app/layout.tsx: ${hasLayout ? '✅' : '❌'}`);
    console.log(`  app/page.tsx: ${hasPage ? '✅' : '❌'}`);
    console.log(`  UI components: ${hasComponents ? '✅' : '❌'}`);
    
    if (hasPackageJson && hasLayout && hasPage && hasComponents) {
      console.log('\n🎉 All tests passed! Build functionality is working.');
      return true;
    } else {
      console.log('\n❌ Some tests failed.');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

// Run the test
testBuild().then(success => {
  process.exit(success ? 0 : 1);
});
