// Simple test for the build API
const testSpec = {
  name: "Test App",
  stack: "next-shadcn",
  features: ["auth"],
  pages: [{ route: "/", purpose: "Homepage" }],
  theme: {},
  assets: []
};

console.log("Testing build API...");

fetch('http://localhost:3000/api/build', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testSpec)
})
.then(res => {
  console.log('Status:', res.status);
  console.log('Headers:', [...res.headers.entries()]);
  return res.text();
})
.then(text => {
  console.log('Response:', text.substring(0, 200));
})
.catch(err => {
  console.error('Error:', err);
});
