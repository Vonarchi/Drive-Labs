import { execSync } from 'node:child_process'
import fs from 'node:fs'

const sh = (cmd: string) => { console.log(`\n$ ${cmd}`); execSync(cmd, { stdio: 'inherit' }) }
const exists = (p: string) => fs.existsSync(p)

async function stage(name: string, run: () => void) {
  console.log(`\n🟦 FOREMAN: ${name.toUpperCase()} STAGE`)
  try { run(); console.log(`✅ ${name}`) }
  catch (e: any) { console.error(`❌ ${name} failed\n`, e?.message ?? e); process.exit(1) }
}

async function main() {
  console.log('🚀 FOREMAN: Starting Labs Demo Pipeline')
  console.log('📋 Project: labs-demo | Stack: nextjs14-react18 | Auth: supabase')
  
  // DB (Bot 2)
  await stage('blueprint', () => sh('pnpm db:push'))

  // QA seed
  await stage('seed', () => sh('pnpm seed:test-user'))

  // App generation via Orchestrator (Bot 1/3)
  const spec = JSON.stringify({
    projectSpec: {
      name: 'CreamCode',
      goal: 'Generate production-grade web apps from structured specs.',
      stack: { frontend: 'Next.js 14', backend: 'Node', db: 'Supabase' },
      features: [
        'Project wizard (form → spec.json)',
        'Template catalog (Next.js + Tailwind + shadcn)',
        'Renderer (ETA) → zip artifact',
        'Auth (Supabase) + saved projects',
        'Download + Deploy to Vercel',
        'Audit log + billing hooks'
      ],
      brandProfile: 'modern-comfy'
    }
  }).replace(/"/g, '\\"')

  await stage('app', () =>
    sh(`node -e "fetch('http://localhost:3000/pipeline/run',{method:'POST',headers:{'content-type':'application/json'},body:'${spec}'}).then(r=>r.text()).then(t=>console.log(t)).catch(e=>{console.error(e);process.exit(1)})"`)
  )

  // UI presence (Bot 5)
  if (!exists('src/components/ui/button.tsx')) throw new Error('UI kit missing: src/components/ui/button.tsx')

  // Copy presence (Bot 6)
  if (!exists('supabase/seed/pro_prompts.sql')) console.warn('ℹ️ pro_prompts seed missing (Bot 6)')

  // Build
  await stage('build', () => sh('pnpm build'))

  // QA (Bot 7)
  await stage('unit', () => sh('pnpm test'))
  await stage('e2e',  () => sh('pnpm test:e2e'))
  await stage('lh',   () => sh('pnpm test:lh'))

  console.log('\n🟩 FOREMAN: all stages green — ready to deploy')
}

main()
