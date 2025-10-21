export type BotContext = {
  runId: string;
  mem: Record<string, unknown>;
  log: (ev: string, data?: unknown) => void | Promise<void>;
};

export type BotInput = {
  projectSpec: any;
  artifacts?: string[];
  issues?: any[];
};

export type BotOutput = {
  updates?: Partial<BotInput["projectSpec"]>;
  files?: Array<{ path: string; content: string }>;
  issues?: any[];
  artifactZipPath?: string;
  notes?: string;
};

export interface DriveBot {
  name: string;
  run(input: BotInput, ctx: BotContext): Promise<BotOutput>;
}

