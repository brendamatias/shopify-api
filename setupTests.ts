import { env } from "@/config";
import { execSync } from "child_process";

const runPrismaCommand = (command: string) => {
  execSync(`DATABASE_URL=${env.DATABASE_URL} npx prisma ${command}`, {
    stdio: "inherit",
  });
};

runPrismaCommand("generate");
runPrismaCommand("migrate deploy");
