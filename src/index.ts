import "dotenv/config";
import { VoltAgent, VoltOpsClient, Agent, Memory } from "@voltagent/core";
import { LibSQLMemoryAdapter } from "@voltagent/libsql";
import { createPinoLogger } from "@voltagent/logger";
import { groq } from "@ai-sdk/groq";
import { honoServer } from "@voltagent/server-hono";
import { expenseApprovalWorkflow } from "./workflows";
import { weatherTool } from "./tools";

// Create a logger instance
const logger = createPinoLogger({
  name: "morning-sage-leadership",
  level: "info",
});

// Configure persistent memory (LibSQL / SQLite)
const memory = new Memory({
  storage: new LibSQLMemoryAdapter({
    url: "file:./.voltagent/memory.db",
    logger: logger.child({ component: "libsql" }),
  }),
});

const agent = new Agent({
  name: "morning-sage-leadership",
  instructions: "A helpful assistant that can check weather and help with various tasks",
  model: groq("llama-3.3-70b-versatile"),
  tools: [weatherTool],
  memory,
});

new VoltAgent({
  agents: {
    agent,
  },
  workflows: {
    expenseApprovalWorkflow,
  },
  server: honoServer(),
  logger,
  voltOpsClient: new VoltOpsClient({
    publicKey: process.env.VOLTAGENT_PUBLIC_KEY || "",
    secretKey: process.env.VOLTAGENT_SECRET_KEY || "",
  }),
});
