import { NextResponse } from "next/server";
import { execa } from "execa";
import { writeFileSync, mkdirSync, rmSync } from "fs";
import { join } from "path";
import { generateProjectFiles } from "@/lib/generator";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const spec = await req.json();
    const files = await generateProjectFiles(spec);
    
    // Create temporary directory for linting
    const tempDir = join(process.cwd(), "temp-lint", Date.now().toString());
    mkdirSync(tempDir, { recursive: true });
    
    try {
      // Write files to temp directory
      for (const file of files) {
        const filePath = join(tempDir, file.path);
        const dir = filePath.substring(0, filePath.lastIndexOf("/"));
        mkdirSync(dir, { recursive: true });
        writeFileSync(filePath, file.data);
      }
      
      // Create ESLint config
      const eslintConfig = {
        extends: ["@vercel/style-guide"],
        parserOptions: {
          ecmaVersion: 2022,
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
        env: {
          browser: true,
          es2022: true,
          node: true,
        },
        rules: {
          // Relax some rules for generated code
          "@typescript-eslint/no-unused-vars": "warn",
          "@typescript-eslint/no-explicit-any": "warn",
        },
      };
      
      writeFileSync(
        join(tempDir, ".eslintrc.json"),
        JSON.stringify(eslintConfig, null, 2)
      );
      
      // Create Prettier config
      const prettierConfig = {
        semi: true,
        trailingComma: "es5",
        singleQuote: false,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
      };
      
      writeFileSync(
        join(tempDir, ".prettierrc.json"),
        JSON.stringify(prettierConfig, null, 2)
      );
      
      // Create package.json for dependencies
      const packageJson = {
        name: "temp-lint-project",
        version: "1.0.0",
        devDependencies: {
          "@vercel/style-guide": "latest",
          "eslint": "^8.0.0",
          "prettier": "^3.0.0",
          "typescript": "^5.0.0",
        },
      };
      
      writeFileSync(
        join(tempDir, "package.json"),
        JSON.stringify(packageJson, null, 2)
      );
      
      // Run ESLint
      const eslintResult = await execa("npx", ["eslint", ".", "--format", "json"], {
        cwd: tempDir,
        reject: false,
      });
      
      // Run Prettier check
      const prettierResult = await execa("npx", ["prettier", "--check", "."], {
        cwd: tempDir,
        reject: false,
      });
      
      // Run TypeScript check
      const tscResult = await execa("npx", ["tsc", "--noEmit"], {
        cwd: tempDir,
        reject: false,
      });
      
      const eslintOutput = eslintResult.exitCode === 0 ? [] : JSON.parse(eslintResult.stdout);
      const prettierOutput = prettierResult.exitCode === 0 ? [] : prettierResult.stdout.split("\n").filter(Boolean);
      const tscOutput = tscResult.exitCode === 0 ? [] : tscResult.stdout.split("\n").filter(Boolean);
      
      const hasErrors = eslintOutput.length > 0 || prettierOutput.length > 0 || tscOutput.length > 0;
      
      return NextResponse.json({
        success: !hasErrors,
        results: {
          eslint: {
            passed: eslintResult.exitCode === 0,
            errors: eslintOutput,
          },
          prettier: {
            passed: prettierResult.exitCode === 0,
            errors: prettierOutput,
          },
          typescript: {
            passed: tscResult.exitCode === 0,
            errors: tscOutput,
          },
        },
        summary: {
          totalErrors: eslintOutput.length + prettierOutput.length + tscOutput.length,
          passed: !hasErrors,
        },
      });
      
    } finally {
      // Clean up temp directory
      rmSync(tempDir, { recursive: true, force: true });
    }
    
  } catch (error) {
    console.error("Linting error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to run linting checks",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
