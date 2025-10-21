import type { DriveBot, BotContext } from "../types/bot";

export async function runBotsSequential(
  bots: DriveBot[],
  initialState: any,
  ctx: BotContext
): Promise<any> {
  let state = initialState;
  
  for (const bot of bots) {
    await ctx.log(`START:${bot.name}`);
    try {
      const output = await bot.run(state, ctx);
      state = { ...state, ...output };
      await ctx.log(`END:${bot.name}`, output);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      await ctx.log(`ERROR:${bot.name}`, { error: errorMessage });
      throw error;
    }
  }
  
  return state;
}
