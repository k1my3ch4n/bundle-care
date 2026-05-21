import pc from "picocolors";
import ora, { type Ora } from "ora";

export const logger = {
  info: (message: string) => console.log(pc.cyan("ℹ"), message),
  success: (message: string) => console.log(pc.green("✓"), message),
  warn: (message: string) => console.log(pc.yellow("⚠"), message),
  error: (message: string) => console.log(pc.red("✖"), message),
  blank: () => console.log(),
  title: (message: string) => console.log(pc.bold(pc.magenta(message))),
};

export const createSpinner = (text: string): Ora => {
  return ora({ text, color: "cyan" });
};
