(()=>{var e={};e.id=702,e.ids=[702],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7561:e=>{"use strict";e.exports=require("node:fs")},9411:e=>{"use strict";e.exports=require("node:path")},7310:e=>{"use strict";e.exports=require("url")},5885:(e,a,t)=>{"use strict";t.r(a),t.d(a,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>d});var s=t(778),r=t(4089),i=t(3807),n=t.n(i),l=t(1544),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);t.d(a,o);let d=["",{children:["dashboard",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,8566)),"/Users/jamesarchibald/drive-labs/app/dashboard/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,7246)),"/Users/jamesarchibald/drive-labs/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,9757,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/jamesarchibald/drive-labs/app/dashboard/page.tsx"],p="/dashboard/page",u={require:t,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/dashboard/page",pathname:"/dashboard",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},9125:(e,a,t)=>{Promise.resolve().then(t.bind(t,4887))},4887:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>DashboardPage});var s=t(8497),r=t(5027),i=t(9363),n=t(4996);function cn(...e){return e.filter(Boolean).join(" ")}let l=(0,n.j)("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",{variants:{variant:{default:"bg-brand text-white hover:bg-brand-700",secondary:"bg-muted text-foreground hover:bg-brand-50",ghost:"bg-transparent hover:bg-brand-50",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",primary:"bg-brand text-white hover:bg-brand-700"},size:{sm:"h-9 px-3 rounded-md",md:"h-10 px-4 rounded-md",lg:"h-11 px-5 rounded-md"}},defaultVariants:{variant:"default",size:"md"}}),o=r.forwardRef(({className:e,variant:a,size:t,asChild:r=!1,...n},o)=>{let d=r?i.g7:"button";return s.jsx(d,{ref:o,className:cn(l({variant:a,size:t,className:e})),...n})});o.displayName="Button";let d=r.forwardRef(({className:e,...a},t)=>s.jsx("div",{ref:t,className:cn("rounded-xl border bg-muted text-fg shadow-sm",e),...a}));d.displayName="Card";let c=r.forwardRef(({className:e,...a},t)=>s.jsx("div",{ref:t,className:cn("flex flex-col space-y-1.5 p-4 md:p-6",e),...a}));c.displayName="CardHeader";let p=r.forwardRef(({className:e,...a},t)=>s.jsx("h3",{ref:t,className:cn("text-2xl font-semibold leading-none tracking-tight",e),...a}));p.displayName="CardTitle";let u=r.forwardRef(({className:e,...a},t)=>s.jsx("p",{ref:t,className:cn("text-sm text-muted",e),...a}));u.displayName="CardDescription";let m=r.forwardRef(({className:e,...a},t)=>s.jsx("div",{ref:t,className:cn("p-4 md:p-6 pt-0",e),...a}));m.displayName="CardContent";let x=r.forwardRef(({className:e,...a},t)=>s.jsx("div",{ref:t,className:cn("flex items-center p-4 md:p-6 pt-0",e),...a}));x.displayName="CardFooter";var f=t(3974);let h=f.fC,g=f.xz,b=f.h_;f.x8;let v=r.forwardRef(({className:e,...a},t)=>s.jsx(f.aV,{ref:t,className:cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...a}));v.displayName=f.aV.displayName;let j=r.forwardRef(({className:e,children:a,...t},r)=>(0,s.jsxs)(b,{children:[s.jsx(v,{}),(0,s.jsxs)(f.VY,{ref:r,className:cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-bg p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl focus:outline-none",e),onEscapeKeyDown:e=>e.preventDefault(),onPointerDownOutside:e=>e.preventDefault(),...t,children:[a,(0,s.jsxs)(f.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-bg transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:shadow-focus disabled:pointer-events-none data-[state=open]:bg-muted data-[state=open]:text-muted min-h-[44px] min-w-[44px] flex items-center justify-center","aria-label":"Close dialog",children:[s.jsx("svg",{className:"h-4 w-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}),s.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));j.displayName=f.VY.displayName;let DialogHeader=({className:e,...a})=>s.jsx("div",{className:cn("flex flex-col space-y-1.5 text-center sm:text-left",e),...a});DialogHeader.displayName="DialogHeader";let DialogFooter=({className:e,...a})=>s.jsx("div",{className:cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",e),...a});DialogFooter.displayName="DialogFooter";let y=r.forwardRef(({className:e,...a},t)=>s.jsx(f.Dx,{ref:t,className:cn("text-lg font-semibold leading-none tracking-tight",e),...a}));y.displayName=f.Dx.displayName;let N=r.forwardRef(({className:e,...a},t)=>s.jsx(f.dk,{ref:t,className:cn("text-sm text-muted",e),...a}));N.displayName=f.dk.displayName;let w=r.forwardRef(({className:e,type:a,...t},r)=>s.jsx("input",{type:a,className:cn("flex h-11 w-full rounded-md border border-ring bg-bg px-3 py-2 text-sm text-fg placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]",e),ref:r,...t}));w.displayName="Input";var C=t(2135),P=t(9066);function cn_cn(...e){return(0,P.m6)((0,C.W)(e))}let k=r.forwardRef(({className:e,...a},t)=>s.jsx("label",{ref:t,className:cn_cn("text-sm font-medium leading-none text-fg-high-contrast peer-disabled:cursor-not-allowed peer-disabled:opacity-70",e),...a}));k.displayName="Label";let S=r.forwardRef(({className:e,...a},t)=>s.jsx("textarea",{className:cn_cn("flex min-h-[80px] w-full rounded-md border border-ring bg-bg px-3 py-2 text-sm text-fg placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]",e),ref:t,...a}));S.displayName="Textarea";var D=t(776);function PreviewPane({files:e,template:a="react-ts"}){return s.jsx(D.xR,{template:a,files:e,options:{showTabs:!0,resizablePanels:!0,editorHeight:520,showLineNumbers:!1,layout:"preview"}})}let _=(0,n.j)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function Badge({className:e,variant:a,...t}){return s.jsx("div",{className:cn(_({variant:a}),e),...t})}var R=t(6460);let F=R.fC,E=r.forwardRef(({className:e,...a},t)=>s.jsx(R.aV,{ref:t,className:cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",e),...a}));E.displayName=R.aV.displayName;let A=r.forwardRef(({className:e,...a},t)=>s.jsx(R.xz,{ref:t,className:cn("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",e),...a}));A.displayName=R.xz.displayName;let L=r.forwardRef(({className:e,...a},t)=>s.jsx(R.VY,{ref:t,className:cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",e),...a}));L.displayName=R.VY.displayName;var O=t(630),T=t(3234);let z=r.forwardRef(({className:e,...a},t)=>s.jsx(O.fC,{ref:t,className:cn("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...a,children:s.jsx(O.z$,{className:cn("flex items-center justify-center text-current"),children:s.jsx(T.Z,{className:"h-4 w-4"})})}));z.displayName=O.fC.displayName;var $=t(19);let M=$.Ry({path:$.Z_().min(1),contents:$.Z_().default(""),encoding:$.Km(["utf8","base64"]).default("utf8")}),V=$.Ry({name:$.Z_().min(2).max(60),description:$.Z_().max(280).optional(),stack:$.Km(["next-tailwind","next-shadcn","remix"]).default("next-tailwind"),features:$.IX($.Km(["auth","stripe","supabase","seo","og","forms","email","i18n"])).default([]),theme:$.Ry({primary:$.Z_().optional(),accent:$.Z_().optional()}).default({}),pages:$.IX($.Ry({route:$.Z_().regex(/^\/[a-z0-9\-\/]*$/i),purpose:$.Z_()})).min(1),assets:$.IX(M).default([])});var q=t(6886),U=t(6125);let Z=new q.PZ;async function generateFilesClient(e){let a=V.parse(e),t={...a,nameParam:U.GL(a.name),Name:U.Ho(a.name)},s={};return s["package.json"]=Z.renderString(`
{
  "name": "<%= it.nameParam %>",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "tailwindcss": "^3.4.0"
  }
}`,t)||"",s["app/layout.tsx"]=Z.renderString(`
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '<%= it.Name %>',
  description: '<%= it.description || "A modern Next.js application" %>'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}`,t)||"",s["app/page.tsx"]=Z.renderString(`
export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to <%= it.Name %>
      </h1>
      
      <p className="text-lg text-center text-gray-600 mb-8">
        <%= it.description || "A modern Next.js application built with Drive Labs" %>
      </p>

<% if (it.features.includes("auth")) { %>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
        <p className="text-gray-600 mb-4">
          Sign in or create an account to get started.
        </p>
        <div className="space-y-2">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Sign In
          </button>
          <button className="w-full border border-gray-300 py-2 px-4 rounded hover:bg-gray-50">
            Sign Up
          </button>
        </div>
      </div>
<% } %>

<% if (it.features.includes("forms")) { %>
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2" type="text" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2" type="email" />
          </div>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" type="submit">
            Submit
          </button>
        </form>
      </div>
<% } %>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<% for (const feature of it.features) { %>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold"><%= feature.charAt(0).toUpperCase() + feature.slice(1) %></h3>
          </div>
<% } %>
        </div>
      </div>
    </main>
  )
}`,t)||"",s["app/globals.css"]=`
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}

body {
  color: rgb(var(--foreground));
  background: rgb(var(--background));
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`,s["tailwind.config.ts"]=`
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [],
}
export default config`,s["next.config.js"]=`
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig`,s["tsconfig.json"]=`
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`,s}function SpecEditor({onSpecChange:e,onPreview:a,onDownload:t,onDeploy:i}){let[n,l]=(0,r.useState)({name:"My Awesome App",description:"A modern web application",stack:"next-tailwind",features:[],theme:{},pages:[{route:"/",purpose:"Homepage"}],assets:[]}),[x,f]=(0,r.useState)([]),[h,g]=(0,r.useState)(!1),[b,v]=(0,r.useState)({});(0,r.useEffect)(()=>{try{let a=V.parse(n);f([]),g(!0),e(a)}catch(a){let e=a.errors?.map(e=>`${e.path.join(".")}: ${e.message}`)||[a.message];f(e),g(!1)}},[n,e]),(0,r.useEffect)(()=>{h&&generateFilesClient(n).then(v)},[n,h]);let updateSpec=e=>{l(a=>({...a,...e}))},toggleFeature=e=>{let a=n.features||[],t=a.includes(e)?a.filter(a=>a!==e):[...a,e];updateSpec({features:t})},updatePage=(e,a)=>{let t=[...n.pages||[]];t[e]={...t[e],...a},updateSpec({pages:t})},removePage=e=>{let a=(n.pages||[]).filter((a,t)=>t!==e);updateSpec({pages:a})};return(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[(0,s.jsxs)(d,{children:[(0,s.jsxs)(c,{children:[s.jsx(p,{children:"Project Specification"}),(0,s.jsxs)(u,{children:["Configure your project with live validation",h&&s.jsx(Badge,{className:"ml-2",variant:"secondary",children:"✓ Valid"})]})]}),(0,s.jsxs)(m,{children:[(0,s.jsxs)(F,{defaultValue:"basic",className:"w-full",children:[(0,s.jsxs)(E,{className:"grid w-full grid-cols-4",children:[s.jsx(A,{value:"basic",children:"Basic"}),s.jsx(A,{value:"features",children:"Features"}),s.jsx(A,{value:"pages",children:"Pages"}),s.jsx(A,{value:"theme",children:"Theme"})]}),(0,s.jsxs)(L,{value:"basic",className:"space-y-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx(k,{htmlFor:"name",children:"Project Name"}),s.jsx(w,{id:"name",value:n.name||"",onChange:e=>updateSpec({name:e.target.value}),placeholder:"My Awesome App"})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx(k,{htmlFor:"description",children:"Description"}),s.jsx(S,{id:"description",value:n.description||"",onChange:e=>updateSpec({description:e.target.value}),placeholder:"A modern web application",rows:3})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx(k,{htmlFor:"stack",children:"Stack"}),s.jsx("select",{id:"stack",value:n.stack||"next-tailwind",onChange:e=>updateSpec({stack:e.target.value}),className:"w-full p-2 border rounded-md",children:[{value:"next-tailwind",label:"Next.js + Tailwind"},{value:"next-shadcn",label:"Next.js + shadcn/ui"},{value:"remix",label:"Remix"}].map(e=>s.jsx("option",{value:e.value,children:e.label},e.value))})]})]}),s.jsx(L,{value:"features",className:"space-y-4",children:(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx(k,{children:"Features"}),s.jsx("div",{className:"grid grid-cols-2 gap-2",children:["auth","stripe","supabase","seo","og","forms","email","i18n"].map(e=>(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[s.jsx(z,{id:e,checked:n.features?.includes(e)||!1,onCheckedChange:()=>toggleFeature(e)}),s.jsx(k,{htmlFor:e,className:"text-sm",children:e.charAt(0).toUpperCase()+e.slice(1)})]},e))})]})}),s.jsx(L,{value:"pages",className:"space-y-4",children:(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[s.jsx(k,{children:"Pages"}),s.jsx(o,{onClick:()=>{let e=[...n.pages||[],{route:"/new-page",purpose:"New page"}];updateSpec({pages:e})},size:"sm",children:"Add Page"})]}),s.jsx("div",{className:"space-y-2",children:(n.pages||[]).map((e,a)=>(0,s.jsxs)("div",{className:"flex gap-2 items-center",children:[s.jsx(w,{value:e.route,onChange:e=>updatePage(a,{route:e.target.value}),placeholder:"/route",className:"flex-1"}),s.jsx(w,{value:e.purpose,onChange:e=>updatePage(a,{purpose:e.target.value}),placeholder:"Purpose",className:"flex-1"}),s.jsx(o,{onClick:()=>removePage(a),variant:"outline",size:"sm",children:"\xd7"})]},a))})]})}),(0,s.jsxs)(L,{value:"theme",className:"space-y-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx(k,{htmlFor:"primary",children:"Primary Color"}),(0,s.jsxs)("div",{className:"flex gap-2",children:[s.jsx(w,{id:"primary",value:n.theme?.primary||"",onChange:e=>updateSpec({theme:{...n.theme,primary:e.target.value}}),placeholder:"#3B82F6"}),s.jsx("input",{type:"color",value:n.theme?.primary||"#3B82F6",onChange:e=>updateSpec({theme:{...n.theme,primary:e.target.value}}),className:"w-12 h-10 border rounded"})]})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx(k,{htmlFor:"accent",children:"Accent Color"}),(0,s.jsxs)("div",{className:"flex gap-2",children:[s.jsx(w,{id:"accent",value:n.theme?.accent||"",onChange:e=>updateSpec({theme:{...n.theme,accent:e.target.value}}),placeholder:"#10B981"}),s.jsx("input",{type:"color",value:n.theme?.accent||"#10B981",onChange:e=>updateSpec({theme:{...n.theme,accent:e.target.value}}),className:"w-12 h-10 border rounded"})]})]})]})]}),x.length>0&&(0,s.jsxs)("div",{className:"mt-4 p-3 bg-red-50 border border-red-200 rounded-md",children:[s.jsx("h4",{className:"text-sm font-medium text-red-800 mb-2",children:"Validation Errors:"}),s.jsx("ul",{className:"text-sm text-red-700 space-y-1",children:x.map((e,a)=>(0,s.jsxs)("li",{children:["• ",e]},a))})]}),(0,s.jsxs)("div",{className:"mt-6 grid grid-cols-1 md:grid-cols-3 gap-2",children:[s.jsx(o,{onClick:()=>a(n),disabled:!h,variant:"secondary",className:"w-full",children:"\uD83D\uDE80 Live Preview"}),s.jsx(o,{onClick:()=>t(n),disabled:!h,variant:"outline",className:"w-full",children:"\uD83D\uDCE6 Download ZIP"}),s.jsx(o,{onClick:()=>i(n),disabled:!h,variant:"default",className:"w-full",children:"\uD83D\uDE80 Deploy Now"})]})]})]}),(0,s.jsxs)(d,{children:[(0,s.jsxs)(c,{children:[s.jsx(p,{children:"Live Preview"}),s.jsx(u,{children:"Real-time preview of your generated project"})]}),s.jsx(m,{children:h&&Object.keys(b).length>0?s.jsx("div",{className:"h-96 border rounded-md overflow-hidden",children:s.jsx("iframe",{srcDoc:`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <script src="https://cdn.tailwindcss.com"></script>
                      <style>
                        body { margin: 0; font-family: system-ui, sans-serif; }
                        .container { max-width: 1200px; margin: 0 auto; padding: 1rem; }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <h1 class="text-4xl font-bold mb-4">${n.name}</h1>
                        <p class="text-lg text-gray-600 mb-8">${n.description}</p>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                          ${(n.features||[]).map(e=>`<div class="p-4 border rounded-lg">
                              <h3 class="font-semibold">${e.charAt(0).toUpperCase()+e.slice(1)}</h3>
                            </div>`).join("")}
                        </div>
                      </div>
                    </body>
                  </html>
                `,className:"w-full h-full",title:"Live Preview"})}):s.jsx("div",{className:"h-96 flex items-center justify-center text-gray-500",children:h?"Generating preview...":"Fix validation errors to see preview"})})]})]})}function DashboardPage(){let[e,a]=(0,r.useState)(!1),[t,i]=(0,r.useState)(""),[n,l]=(0,r.useState)(""),[x,f]=(0,r.useState)(!1),[b,v]=(0,r.useState)({}),[C,P]=(0,r.useState)("React"),[D,_]=(0,r.useState)("hero section, features, and contact form");async function handlePreview(e){try{let a=await fetch("/api/preview/vercel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({files:await generateFilesClient(e),name:e.name})}),{previewUrl:t}=await a.json();t?(alert(`✅ Preview deployed! Opening ${t}`),window.open(t,"_blank")):alert("❌ Failed to deploy preview")}catch(e){console.error("Preview error:",e),alert("❌ Error deploying preview")}}async function handleDownload(e){try{let a=await fetch("/api/build",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(a.ok){let t=await a.blob(),s=URL.createObjectURL(t),r=document.createElement("a");r.href=s,r.download=`${e.name}-starter.zip`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s),alert("✅ Project downloaded successfully!")}else alert("❌ Failed to generate project")}catch(e){console.error("Download error:",e),alert("❌ Error generating project")}}async function handleDeploy(e){try{let a=await fetch("/api/lint",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),t=await a.json();if(!t.success){alert(`❌ Quality gates failed. ${t.summary.totalErrors} errors found. Please fix them before deploying.`);return}let s=await fetch("/api/preview/vercel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({files:await generateFilesClient(e),name:e.name})}),{previewUrl:r}=await s.json();r?(alert(`✅ Quality gates passed! Deployed to ${r}`),window.open(r,"_blank")):alert("❌ Failed to deploy")}catch(e){console.error("Deploy error:",e),alert("❌ Error during deployment")}}let handleCreateProject=async()=>{if(t.trim()){f(!0);try{await new Promise(e=>setTimeout(e,2e3)),alert(`Project "${t}" created successfully!`),i(""),l(""),a(!1)}catch(e){console.error("Failed to create project:",e)}finally{f(!1)}}};return s.jsx("div",{className:"min-h-screen bg-gray-50",children:(0,s.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-8",children:[(0,s.jsxs)("div",{children:[s.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"Dashboard"}),s.jsx("p",{className:"text-gray-600",children:"Manage your projects and applications"})]}),(0,s.jsxs)(h,{open:e,onOpenChange:a,children:[s.jsx(g,{asChild:!0,children:s.jsx(o,{children:"New Project"})}),(0,s.jsxs)(j,{className:"sm:max-w-[425px]",children:[(0,s.jsxs)(DialogHeader,{children:[s.jsx(y,{children:"Create New Project"}),s.jsx(N,{children:"Start a new project by providing some basic information."})]}),(0,s.jsxs)("div",{className:"grid gap-4 py-4",children:[(0,s.jsxs)("div",{className:"grid gap-2",children:[s.jsx(k,{htmlFor:"project-name",children:"Project Name"}),s.jsx(w,{id:"project-name",value:t,onChange:e=>i(e.target.value),placeholder:"Enter project name"})]}),(0,s.jsxs)("div",{className:"grid gap-2",children:[s.jsx(k,{htmlFor:"project-description",children:"Description"}),s.jsx(S,{id:"project-description",value:n,onChange:e=>l(e.target.value),placeholder:"Enter project description",rows:3})]})]}),(0,s.jsxs)(DialogFooter,{children:[s.jsx(o,{variant:"secondary",onClick:()=>a(!1),children:"Cancel"}),s.jsx(o,{onClick:handleCreateProject,disabled:!t.trim()||x,children:x?"Creating...":"Create"})]})]})]})]}),(0,s.jsxs)("div",{className:"grid gap-6",children:[(0,s.jsxs)(d,{children:[(0,s.jsxs)(c,{children:[s.jsx(p,{children:"Recent Projects"}),s.jsx(u,{children:"Your recently created and modified projects"})]}),s.jsx(m,{children:s.jsx("div",{className:"text-center py-8 text-gray-500",children:s.jsx("p",{children:"No projects yet. Create your first project to get started!"})})})]}),(0,s.jsxs)("div",{className:"grid md:grid-cols-2 gap-6",children:[(0,s.jsxs)(d,{children:[(0,s.jsxs)(c,{children:[s.jsx(p,{children:"Quick Actions"}),s.jsx(u,{children:"Common tasks and shortcuts"})]}),(0,s.jsxs)(m,{className:"space-y-2",children:[s.jsx(o,{variant:"outline",className:"w-full justify-start",children:"Import Project"}),s.jsx(o,{variant:"outline",className:"w-full justify-start",children:"View Templates"}),s.jsx(o,{variant:"outline",className:"w-full justify-start",children:"Settings"})]})]}),(0,s.jsxs)(d,{children:[(0,s.jsxs)(c,{children:[s.jsx(p,{children:"Getting Started"}),s.jsx(u,{children:"Learn how to use Drive Labs"})]}),(0,s.jsxs)(m,{className:"space-y-2",children:[s.jsx(o,{variant:"outline",className:"w-full justify-start",children:"Documentation"}),s.jsx(o,{variant:"outline",className:"w-full justify-start",children:"Examples"}),s.jsx(o,{variant:"outline",className:"w-full justify-start",children:"Support"})]})]})]})]}),s.jsx("div",{className:"mt-8",children:s.jsx(SpecEditor,{onSpecChange:e=>{},onPreview:handlePreview,onDownload:handleDownload,onDeploy:handleDeploy})}),Object.keys(b).length>0&&s.jsx("div",{className:"mt-8",children:(0,s.jsxs)(d,{children:[(0,s.jsxs)(c,{children:[s.jsx(p,{children:"Generated Code Preview"}),s.jsx(u,{children:"Interactive code playground"})]}),s.jsx(m,{children:s.jsx(PreviewPane,{files:b})})]})})]})})}},8566:(e,a,t)=>{"use strict";t.r(a),t.d(a,{$$typeof:()=>n,__esModule:()=>i,default:()=>o});var s=t(3985);let r=(0,s.createProxy)(String.raw`/Users/jamesarchibald/drive-labs/app/dashboard/page.tsx`),{__esModule:i,$$typeof:n}=r,l=r.default,o=l}};var a=require("../../webpack-runtime.js");a.C(e);var __webpack_exec__=e=>a(a.s=e),t=a.X(0,[68,959,921],()=>__webpack_exec__(5885));module.exports=t})();