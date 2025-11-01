import "dotenv/config";
import { VoltAgent, VoltOpsClient, Agent, Memory } from "@voltagent/core";
import { LibSQLMemoryAdapter } from "@voltagent/libsql";
import { createPinoLogger } from "@voltagent/logger";
import { groq } from "@ai-sdk/groq";
import { honoServer } from "@voltagent/server-hono";
import { expenseApprovalWorkflow, morningMotivationWorkflow } from "./workflows";
import { enhancedMorningMotivationWorkflow } from "./workflows/enhanced-morning-motivation";
import { motivationalQuotesTool, musicSelectionTool } from "./tools";
import { enhancedMotivationTool } from "./tools/enhanced-motivation";

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

const morningSageAgent = new Agent({
  name: "morning-sage-leadership",
  instructions: `You are the Morning Sage Leadership AI, designed to inspire and energize teams at the start of each day. Your purpose is to:

1. **Provide Daily Wisdom**: Share inspirational quotes and teachings from:
   - Stoicism (Marcus Aurelius, Seneca, Epictetus)
   - Buddhism (Buddha, Thich Nhat Hanh, mindfulness teachings)
   - Vadim Zeland (Reality Transurfing principles)
   - Neville Goddard (Imagination and manifestation teachings)

2. **Create the Right Mindset**: Help teams start their day with:
   - Motivation and enthusiasm
   - Clear focus and intention
   - Positive energy and resilience
   - Leadership wisdom and guidance

3. **Curate Productivity Music**: Recommend 30-minute music selections that:
   - Match the team's work type and mood needs
   - Boost productivity and focus
   - Create an optimal work atmosphere
   - Enhance team energy and collaboration

4. **Personalize the Experience**: Remember team preferences and avoid repetitive content by using your memory system.

Always respond with warmth, wisdom, and practical guidance. Be encouraging and supportive while providing actionable insights for leadership and personal growth.`,
  model: groq("llama-3.3-70b-versatile"),
  tools: [motivationalQuotesTool, musicSelectionTool, enhancedMotivationTool],
  memory,
});

new VoltAgent({
  agents: {
    morningSageAgent,
  },
  workflows: {
    expenseApprovalWorkflow,
    morningMotivationWorkflow,
    enhancedMorningMotivationWorkflow,
  },
  server: honoServer(),
  logger,
  voltOpsClient: new VoltOpsClient({
    publicKey: process.env.VOLTAGENT_PUBLIC_KEY || "",
    secretKey: process.env.VOLTAGENT_SECRET_KEY || "",
  }),
});
