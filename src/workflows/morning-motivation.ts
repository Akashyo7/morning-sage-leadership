import { Agent, createWorkflowChain } from "@voltagent/core";
import { z } from "zod";

// ==============================================================================
// Morning Sage Leadership Motivation Workflow
// Purpose: Provide daily inspiration and energy boost for teams
//
// Test Scenarios:
// 
// Scenario 1: Team starting deep work session
// Input JSON:
// {
//   "teamSize": 5,
//   "workType": "deep_work",
//   "desiredMood": "focused",
//   "timeOfDay": "early_morning",
//   "teamContext": "Working on quarterly planning"
// }
//
// Scenario 2: Creative brainstorming session
// Input JSON:
// {
//   "teamSize": 8,
//   "workType": "brainstorming",
//   "desiredMood": "creative",
//   "timeOfDay": "mid_morning",
//   "teamContext": "New product ideation session"
// }
//
// Scenario 3: High-energy collaboration
// Input JSON:
// {
//   "teamSize": 12,
//   "workType": "collaboration",
//   "desiredMood": "energetic",
//   "timeOfDay": "afternoon",
//   "teamContext": "Sprint planning and team alignment"
// }
// ==============================================================================

export const morningMotivationWorkflow = createWorkflowChain({
  id: "morning-motivation",
  name: "Morning Sage Leadership Motivation",
  purpose: "Provide daily wisdom, motivation, and music selection to energize teams and create the right mindset for productive work",

  input: z.object({
    teamSize: z.number().min(1).max(50).describe("Number of team members"),
    workType: z.enum(["deep_work", "collaboration", "brainstorming", "routine_tasks", "problem_solving"]).describe("Type of work the team will be doing"),
    desiredMood: z.enum(["energetic", "focused", "calm", "creative", "motivational"]).describe("Desired mood/energy for the session"),
    timeOfDay: z.enum(["early_morning", "mid_morning", "afternoon", "evening"]).describe("Time of day for the session"),
    teamContext: z.string().optional().describe("Optional context about current projects or challenges"),
    philosophyPreference: z.enum(["stoicism", "buddhism", "vadim_zeland", "neville_goddard", "mixed"]).optional().describe("Preferred philosophical tradition"),
  }),

  result: z.object({
    dailyWisdom: z.object({
      quote: z.string(),
      philosophy: z.string(),
      dailyAffirmation: z.string(),
      contextualAdvice: z.string(),
    }),
    musicSelection: z.object({
      playlist: z.array(z.string()),
      duration: z.string(),
      playlistDescription: z.string(),
      listeningTips: z.array(z.string()),
    }),
    sessionSummary: z.string(),
    energyLevel: z.enum(["low", "medium", "high", "peak"]),
  }),
})

  // Step 1: Prepare wisdom parameters
  .andThen({
    id: "prepare-wisdom",
    execute: async ({ data }) => {
      const philosophy = data.philosophyPreference || "mixed";
      
      // Map desired mood to appropriate philosophy mood
      let philosophyMood = data.desiredMood;
      if (data.desiredMood === "motivational") {
        philosophyMood = "energetic";
      }

      return {
        ...data,
        wisdomParams: {
          philosophy: philosophy,
          mood: philosophyMood,
          teamContext: data.teamContext,
        },
      };
    },
  })

  // Step 2: Prepare music parameters
  .andThen({
    id: "prepare-music",
    execute: async ({ data }) => {
      return {
        ...data,
        musicParams: {
          mood: data.desiredMood,
          workType: data.workType,
          teamSize: data.teamSize,
          timeOfDay: data.timeOfDay,
        },
      };
    },
  })

  // Step 3: Create session summary
  .andThen({
    id: "create-summary",
    execute: async ({ data }) => {
      const summary = {
        sessionId: `morning-${Date.now()}`,
        timestamp: new Date().toISOString(),
        teamSize: data.teamSize,
        workType: data.workType,
        desiredMood: data.desiredMood,
        timeOfDay: data.timeOfDay,
        wisdomParams: data.wisdomParams,
        musicParams: data.musicParams,
        instructions: {
          wisdom: "Use the motivational quotes tool with the prepared wisdom parameters",
          music: "Use the music selection tool with the prepared music parameters",
        },
      };

      return {
        ...data,
        sessionSummary: summary,
        message: `Morning motivation session prepared for ${data.teamSize} team members. Ready to generate ${data.wisdomParams.philosophy} wisdom and ${data.musicParams.mood} music selection.`,
      };
    },
  });