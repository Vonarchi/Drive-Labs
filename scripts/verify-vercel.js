const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({ path: '.env.local' });

const token = process.env.VERCEL_TOKEN;
const orgId = process.env.VERCEL_ORG_ID;

async function verify() {
  const res = await fetch("https://api.vercel.com/v2/teams", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  console.log("✅ Connected to Vercel. Your org ID is:", orgId);
  console.log("Team list:", data.teams?.map(t => t.slug));
}

verify().catch(console.error);
