import { createWorkflowChain } from "@voltagent/core";
import { z } from "zod";
import { enhancedMotivationTool } from "../tools/enhanced-motivation";

export const enhancedMorningMotivationWorkflow = createWorkflowChain({
  id: "enhanced-morning-motivation",
  name: "Enhanced Morning Motivation",
  purpose: "Enhanced morning motivation with LLM-powered personalized quotes, music, and messaging",

  input: z.object({
    userInput: z.string().describe("Your goals, challenges, or intentions for the day"),
    forceStatic: z.boolean().optional().describe("Force static content (for testing)")
  }),

  result: z.object({
    data: z.object({
      source: z.string(),
      quote: z.object({
        text: z.string(),
        author: z.string(),
        philosophy: z.string(),
        explanation: z.string()
      }),
      music: z.object({
        playlist: z.array(z.any()),
        totalDuration: z.string(),
        workType: z.string()
      }),
      personalMessage: z.string(),
      dailyAffirmation: z.string()
    }),
    summary: z.string()
  })
})

.andThen({
  id: "generate-enhanced-motivation",
  execute: async ({ data }) => {
    let motivation: any = null;
    
    if (enhancedMotivationTool.execute) {
      motivation = await enhancedMotivationTool.execute({
        userInput: data.userInput,
        forceStatic: data.forceStatic
      });
    }
    
    // Provide fallback if tool execution fails
    if (!motivation) {
      motivation = {
        source: 'static',
        quote: {
          text: "The best time to plant a tree was 20 years ago. The second best time is now.",
          author: "Chinese Proverb",
          philosophy: "Ancient Wisdom",
          explanation: "Every moment is a new opportunity to begin again."
        },
        music: {
          playlist: [],
          totalDuration: "30 minutes",
          workType: "deep work"
        },
        personalMessage: "Good morning! Today is a new opportunity for growth and success.",
        dailyAffirmation: "Today, I embrace challenges as opportunities for growth."
      };
    }
    
    // Format music playlist for display
    const playlistText = (motivation.music?.playlist || [])
      .map((track: any) => 
        `**${track.title || 'Untitled'}** by ${track.artist || 'Unknown Artist'}\n` +
        `*${track.reasoning || 'Curated for productivity'}*\n` +
        `🎵 [Spotify](${track.links?.spotify || '#'}) | [YouTube Music](${track.links?.youtube || '#'}) | [Apple Music](${track.links?.apple || '#'})\n`
      )
      .join('\n');

    // Create hybrid response: structured data + natural language
    const response = {
      // Structured data for API consumers
      data: {
        source: motivation.source || 'static',
        quote: motivation.quote || {},
        music: motivation.music || {},
        personalMessage: motivation.personalMessage || '',
        dailyAffirmation: motivation.dailyAffirmation || ''
      },
      
      // Natural language summary for human consumption
      summary: `## 🌅 Your Morning Motivation ${motivation.source === 'llm' ? '(AI-Powered)' : '(Curated)'}

### 💭 Today's Wisdom
> "${motivation.quote?.text || 'Stay focused and keep moving forward.'}"
> 
> — **${motivation.quote?.author || 'Unknown'}** (${motivation.quote?.philosophy || 'Wisdom'})

${motivation.quote?.explanation || 'Every day is a new opportunity.'}

### 🎵 Your Focus Playlist (${motivation.music?.totalDuration || '30 minutes'})
*Curated for ${motivation.music?.workType || 'productivity'}*

${playlistText || 'No tracks available at the moment.'}

### 🎯 Personal Message
${motivation.personalMessage || 'Have a great day!'}

### ✨ Daily Affirmation
*"${motivation.dailyAffirmation || 'Today is full of possibilities.'}"*

---
*Generated with ${motivation.source === 'llm' ? 'AI intelligence' : 'curated wisdom'} • Start with gentle volume and adjust to your comfort level*`
    };

    return response;
  }
});