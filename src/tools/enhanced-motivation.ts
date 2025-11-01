import { createTool } from "@voltagent/core";
import { z } from "zod";
import crypto from "crypto";

// Import existing tools for fallback
import { motivationalQuotesTool } from "./motivational-quotes";
import { musicSelectionTool } from "./music-selection";

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface EnhancedMotivationResult {
  source: 'llm' | 'static';
  quote: {
    text: string;
    author: string;
    philosophy: string;
    explanation: string;
  };
  music: {
    playlist: Array<{
      title: string;
      artist: string;
      reasoning: string;
      links: {
        spotify: string;
        youtube: string;
        apple: string;
      };
    }>;
    totalDuration: string;
    workType: string;
  };
  personalMessage: string;
  dailyAffirmation: string;
}

// Generate session-unique seed for consistent but varied content
function generateSessionSeed(userInput: string): string {
  const today = new Date().toDateString();
  const inputHash = crypto.createHash('md5').update(userInput.toLowerCase()).digest('hex').slice(0, 8);
  return `${today}-${inputHash}`;
}

// Determine if we should use LLM (70%) or static (30%) based on session seed
function shouldUseLLM(sessionSeed: string): boolean {
  const seedHash = crypto.createHash('md5').update(sessionSeed).digest('hex');
  const hashValue = parseInt(seedHash.slice(0, 8), 16);
  return (hashValue % 100) < 70; // 70% chance for LLM
}

// Call Groq API with Llama 3.3 70B
async function callGroqAPI(prompt: string): Promise<string> {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY environment variable is required");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a wise leadership mentor combining Stoicism, Buddhism, Vadim Zeland, and Neville Goddard philosophies. Respond only with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
  }

  const data: GroqResponse = await response.json();
  return data.choices[0].message.content;
}

// Generate LLM-powered content
async function generateLLMContent(userInput: string, sessionSeed: string): Promise<EnhancedMotivationResult> {
  const prompt = `
CONTEXT: You are a wise leadership mentor combining Stoicism, Buddhism, Vadim Zeland, and Neville Goddard philosophies.

INPUT: "${userInput}"
SESSION_SEED: "${sessionSeed}"

TASK: Generate a personalized morning motivation session with:

1. PHILOSOPHICAL QUOTE: Select an actual quote from Marcus Aurelius, Buddha, Vadim Zeland, or Neville Goddard that resonates with the user's context. Explain its relevance in 2-3 sentences.

2. MUSIC CURATION: Recommend 5 tracks for a 30-minute focus session. Consider:
   - Inferred work type (deep work/creative/collaborative)
   - Energy level needed based on input
   - Time of day context
   - Provide brief reasoning for each selection

3. PERSONALIZED MESSAGE: Craft a human-like, encouraging message (100-150 words) that:
   - Addresses their specific challenge/goal
   - Integrates the philosophical wisdom
   - Gives actionable guidance
   - Maintains warm, mentor-like tone

4. DAILY AFFIRMATION: Create a powerful, personal affirmation based on their input.

CONSTRAINTS:
- Use session seed for consistent but varied selections
- Avoid preachy or robotic language
- Keep response under 800 words total
- Format as valid JSON only

RESPONSE FORMAT:
{
  "quote": {
    "text": "Actual quote text",
    "author": "Author name",
    "philosophy": "Stoicism/Buddhism/Reality Transurfing/New Thought",
    "explanation": "2-3 sentence explanation of relevance"
  },
  "music": {
    "playlist": [
      {
        "title": "Track Title",
        "artist": "Artist Name",
        "reasoning": "Brief reason for selection",
        "links": {
          "spotify": "https://open.spotify.com/track/example",
          "youtube": "https://music.youtube.com/watch?v=example",
          "apple": "https://music.apple.com/track/example"
        }
      }
    ],
    "totalDuration": "30 minutes",
    "workType": "deep work/creative/collaborative"
  },
  "personalMessage": "Warm, human-like message addressing their specific context",
  "dailyAffirmation": "Powerful personal affirmation"
}
`;

  try {
    const response = await callGroqAPI(prompt);
    const parsed = JSON.parse(response);
    
    return {
      source: 'llm',
      ...parsed
    };
  } catch (error) {
    console.error("LLM generation failed, falling back to static content:", error);
    throw error;
  }
}

// Generate static content using existing tools
async function generateStaticContent(userInput: string): Promise<EnhancedMotivationResult> {
  // Infer mood from user input for static tools
  const { quoteMood, musicMood } = inferMoodFromInput(userInput);
  
  let quoteResult: any = null;
  let musicResult: any = null;
  
  try {
    if (motivationalQuotesTool.execute) {
      quoteResult = await motivationalQuotesTool.execute({ 
        mood: quoteMood,
        philosophy: "mixed"
      });
    }
    
    if (musicSelectionTool.execute) {
      musicResult = await musicSelectionTool.execute({
        mood: musicMood,
        workType: "deep_work",
        teamSize: 1,
        timeOfDay: "mid_morning"
      });
    }
  } catch (error) {
    console.error('Error executing static tools:', error);
  }

  return {
    source: 'static',
    quote: {
      text: quoteResult?.quote || "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: quoteResult?.author || "Chinese Proverb",
      philosophy: quoteResult?.philosophy || "Ancient Wisdom",
      explanation: quoteResult?.contextualAdvice || "Every moment is a new opportunity to begin again."
    },
    music: {
      playlist: (musicResult?.tracks || []).map((track: any) => ({
        title: track.title || "Untitled",
        artist: track.artist || "Unknown Artist",
        reasoning: "Curated for morning productivity",
        links: {
          spotify: track.spotify || "#",
          youtube: track.youtube || "#",
          apple: track.appleMusic || "#"
        }
      })),
      totalDuration: musicResult?.duration || "30 minutes",
      workType: musicResult?.workType || "deep work"
    },
    personalMessage: `Good morning! Based on your input "${userInput}", ${quoteResult?.contextualAdvice || 'here is your daily motivation'}. ${musicResult?.description || 'Your curated playlist is ready to boost your productivity.'}`,
    dailyAffirmation: quoteResult?.dailyAffirmation || "Today, I embrace challenges as opportunities for growth."
  };
}

// Mood mapping function to convert between different tool types
function inferMoodFromInput(input: string): {
  quoteMood: "energetic" | "calm" | "focused" | "confident" | "resilient";
  musicMood: "energetic" | "focused" | "calm" | "creative" | "motivational";
} {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('energy') || lowerInput.includes('pump') || lowerInput.includes('excited')) {
    return { quoteMood: "energetic", musicMood: "energetic" };
  } else if (lowerInput.includes('focus') || lowerInput.includes('concentrate') || lowerInput.includes('deep work')) {
    return { quoteMood: "focused", musicMood: "focused" };
  } else if (lowerInput.includes('calm') || lowerInput.includes('peace') || lowerInput.includes('relax')) {
    return { quoteMood: "calm", musicMood: "calm" };
  } else if (lowerInput.includes('confident') || lowerInput.includes('strong') || lowerInput.includes('bold')) {
    return { quoteMood: "confident", musicMood: "motivational" };
  } else if (lowerInput.includes('creative') || lowerInput.includes('innovation') || lowerInput.includes('brainstorm')) {
    return { quoteMood: "energetic", musicMood: "creative" };
  } else if (lowerInput.includes('resilient') || lowerInput.includes('tough') || lowerInput.includes('challenge')) {
    return { quoteMood: "resilient", musicMood: "motivational" };
  }
  
  // Default to energetic for morning motivation
  return { quoteMood: "energetic", musicMood: "energetic" };
}

export const enhancedMotivationTool = createTool({
  name: "getEnhancedMotivation",
  description: "Generate personalized morning motivation with LLM-powered quotes, music, and messaging (70% LLM, 30% static)",
  parameters: z.object({
    userInput: z.string().describe("Natural language input about goals, challenges, or daily intentions"),
    forceStatic: z.boolean().optional().describe("Force use of static content (for testing)")
  }),
  execute: async ({ userInput, forceStatic = false }) => {
    try {
      const sessionSeed = generateSessionSeed(userInput);
      const useLLM = !forceStatic && shouldUseLLM(sessionSeed);

      console.log(`Session: ${sessionSeed}, Using: ${useLLM ? 'LLM' : 'Static'} content`);

      if (useLLM) {
        try {
          return await generateLLMContent(userInput, sessionSeed);
        } catch (error) {
          console.log("LLM failed, falling back to static content");
          return await generateStaticContent(userInput);
        }
      } else {
        return await generateStaticContent(userInput);
      }
    } catch (error) {
      console.error("Enhanced motivation tool error:", error);
      
      // Ultimate fallback
      return {
        source: 'static' as const,
        quote: {
          text: "The best time to plant a tree was 20 years ago. The second best time is now.",
          author: "Chinese Proverb",
          philosophy: "Ancient Wisdom",
          explanation: "This reminds us that while we cannot change the past, we always have the power to take action in the present moment."
        },
        music: {
          playlist: [{
            title: "Weightless",
            artist: "Marconi Union",
            reasoning: "Scientifically designed to reduce anxiety and promote focus",
            links: {
              spotify: "https://open.spotify.com/track/3jXmOCHGGbwKdyGCqLgZGE",
              youtube: "https://music.youtube.com/watch?v=UfcAVejslrU",
              apple: "https://music.apple.com/us/album/weightless/1440833225?i=1440833226"
            }
          }],
          totalDuration: "30 minutes",
          workType: "deep work"
        },
        personalMessage: "Every morning is a fresh start and an opportunity to move closer to your goals. Take a deep breath, set your intention, and trust in your ability to make today meaningful.",
        dailyAffirmation: "I embrace this day with confidence, clarity, and purpose."
      };
    }
  },
});