import { Eta } from "eta";
import { 
  camelCase, 
  kebabCase, 
  pascalCase, 
  snakeCase, 
  constantCase,
  titleCase,
  sentenceCase
} from "change-case";
import { TemplateInput, TemplateInputZ } from "./schemas";

// Initialize Eta with custom configuration
const eta = new Eta({
  views: "./templates",
  cache: true,
  autoEscape: false,
  autoTrim: false,
  // Custom delimiters for better React/JSX compatibility
  tags: ["<%", "%>"],
  // Add custom helpers
  helpers: {
    // String case transformations
    camel: (str: string) => camelCase(str),
    kebab: (str: string) => kebabCase(str),
    pascal: (str: string) => pascalCase(str),
    snake: (str: string) => snakeCase(str),
    constant: (str: string) => constantCase(str),
    title: (str: string) => titleCase(str),
    sentence: (str: string) => sentenceCase(str),
    
    // String utilities
    upper: (str: string) => str.toUpperCase(),
    lower: (str: string) => str.toLowerCase(),
    capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
    
    // Array utilities
    join: (arr: any[], separator = ", ") => arr.join(separator),
    length: (arr: any[]) => arr.length,
    
    // Conditional helpers
    if: (condition: any, trueVal: any, falseVal: any) => condition ? trueVal : falseVal,
    unless: (condition: any, trueVal: any, falseVal: any) => !condition ? trueVal : falseVal,
    
    // Feature checks
    hasFeature: (features: string[], feature: string) => features.includes(feature),
    hasAnyFeature: (features: string[], ...checkFeatures: string[]) => 
      checkFeatures.some(feature => features.includes(feature)),
    
    // Theme helpers
    getThemeColor: (theme: any, color: string, fallback = "#000000") => 
      theme?.[color] || fallback,
    
    // Route helpers
    isActiveRoute: (currentRoute: string, route: string) => currentRoute === route,
    routeToComponent: (route: string) => {
      if (route === "/") return "HomePage";
      return pascalCase(route.replace(/\//g, "-").slice(1)) + "Page";
    },
    
    // File path helpers
    getFileExtension: (path: string) => path.split('.').pop() || '',
    getFileName: (path: string) => path.split('/').pop() || '',
    getDirName: (path: string) => path.split('/').slice(0, -1).join('/'),
    
    // JSON helpers
    json: (obj: any) => JSON.stringify(obj, null, 2),
    jsonCompact: (obj: any) => JSON.stringify(obj),
    
    // Date helpers
    now: () => new Date().toISOString(),
    year: () => new Date().getFullYear(),
    
    // Math helpers
    add: (a: number, b: number) => a + b,
    subtract: (a: number, b: number) => a - b,
    multiply: (a: number, b: number) => a * b,
    divide: (a: number, b: number) => a / b,
  }
});

export class TemplateEngine {
  private eta: Eta;

  constructor() {
    this.eta = eta;
  }

  /**
   * Generate a complete project structure from template input
   */
  async generateProject(input: TemplateInput): Promise<Record<string, string>> {
    // Validate input
    const validatedInput = TemplateInputZ.parse(input);
    
    const files: Record<string, string> = {};
    
    // Generate package.json
    files["package.json"] = await this.renderTemplate("package.json", validatedInput);
    
    // Generate main app files
    files["app/layout.tsx"] = await this.renderTemplate("app/layout.tsx", validatedInput);
    files["app/page.tsx"] = await this.renderTemplate("app/page.tsx", validatedInput);
    files["app/globals.css"] = await this.renderTemplate("app/globals.css", validatedInput);
    
    // Generate pages
    for (const page of validatedInput.pages) {
      const componentName = eta.helpers.routeToComponent(page.route);
      const fileName = `${kebabCase(componentName)}.tsx`;
      const filePath = `app${page.route === "/" ? "" : page.route}/${fileName}`;
      
      files[filePath] = await this.renderTemplate("app/page-template.tsx", {
        ...validatedInput,
        page,
        componentName
      });
    }
    
    // Generate components if needed
    if (validatedInput.features.includes("auth")) {
      files["components/auth/login-form.tsx"] = await this.renderTemplate("components/auth/login-form.tsx", validatedInput);
      files["components/auth/signup-form.tsx"] = await this.renderTemplate("components/auth/signup-form.tsx", validatedInput);
    }
    
    if (validatedInput.features.includes("forms")) {
      files["components/ui/form.tsx"] = await this.renderTemplate("components/ui/form.tsx", validatedInput);
    }
    
    // Generate configuration files
    files["tailwind.config.ts"] = await this.renderTemplate("tailwind.config.ts", validatedInput);
    files["next.config.js"] = await this.renderTemplate("next.config.js", validatedInput);
    files["tsconfig.json"] = await this.renderTemplate("tsconfig.json", validatedInput);
    
    // Generate README
    files["README.md"] = await this.renderTemplate("README.md", validatedInput);
    
    // Add custom assets
    for (const asset of validatedInput.assets) {
      files[asset.path] = asset.contents;
    }
    
    return files;
  }

  /**
   * Render a single template with data
   */
  async renderTemplate(templateName: string, data: any): Promise<string> {
    try {
      return await this.eta.renderAsync(templateName, data);
    } catch (error) {
      console.error(`Error rendering template ${templateName}:`, error);
      throw new Error(`Failed to render template: ${templateName}`);
    }
  }

  /**
   * Get available templates
   */
  getAvailableTemplates(): string[] {
    // This would scan the templates directory
    // For now, return a static list
    return [
      "package.json",
      "app/layout.tsx",
      "app/page.tsx",
      "app/page-template.tsx",
      "app/globals.css",
      "components/auth/login-form.tsx",
      "components/auth/signup-form.tsx",
      "components/ui/form.tsx",
      "tailwind.config.ts",
      "next.config.js",
      "tsconfig.json",
      "README.md"
    ];
  }

  /**
   * Validate template input
   */
  validateInput(input: unknown): TemplateInput {
    return TemplateInputZ.parse(input);
  }
}

// Export singleton instance
export const templateEngine = new TemplateEngine();
