import { createTool } from "@voltagent/core";
import { z } from "zod";

export const motivationalQuotesTool = createTool({
  name: "getMotivationalQuote",
  description: "Generate inspirational quotes and wisdom from stoicism, Buddhism, Vadim Zeland, and Neville Goddard to start the day with motivation and energy",
  parameters: z.object({
    philosophy: z.enum(["stoicism", "buddhism", "vadim_zeland", "neville_goddard", "mixed"]).describe("The philosophical tradition to draw from"),
    mood: z.enum(["energetic", "calm", "focused", "confident", "resilient"]).describe("The desired mood/energy for the day"),
    teamContext: z.string().optional().describe("Optional context about the team or current challenges"),
  }),
  execute: async ({ philosophy, mood, teamContext }) => {
    const philosophicalWisdom = {
      stoicism: {
        energetic: [
          "You have power over your mind - not outside events. Realize this, and you will find strength. - Marcus Aurelius",
          "The best revenge is not to be like your enemy. - Marcus Aurelius",
          "Waste no more time arguing what a good person should be. Be one. - Marcus Aurelius",
          "Every new beginning comes from some other beginning's end. - Seneca",
          "It is not what happens to you, but how you react to it that matters. - Epictetus"
        ],
        calm: [
          "When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. - Marcus Aurelius",
          "You are an actor in a play, which is as the author wants it to be. - Epictetus",
          "The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius"
        ],
        focused: [
          "Concentrate every minute like a Roman—like a man—on doing what's in front of you with precise and genuine seriousness. - Marcus Aurelius",
          "You have power over your mind - not outside events. Realize this, and you will find strength. - Marcus Aurelius"
        ],
        confident: [
          "The best revenge is not to be like your enemy. - Marcus Aurelius",
          "Waste no more time arguing what a good person should be. Be one. - Marcus Aurelius"
        ],
        resilient: [
          "The impediment to action advances action. What stands in the way becomes the way. - Marcus Aurelius",
          "Every new beginning comes from some other beginning's end. - Seneca"
        ]
      },
      buddhism: {
        energetic: [
          "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared. - Buddha",
          "The mind is everything. What you think you become. - Buddha",
          "Peace comes from within. Do not seek it without. - Buddha",
          "Better than a thousand hollow words, is one word that brings peace. - Buddha"
        ],
        calm: [
          "Peace comes from within. Do not seek it without. - Buddha",
          "Meditation brings wisdom; lack of meditation leaves ignorance. Know well what leads you forward and what holds you back. - Buddha",
          "The present moment is the only time over which we have dominion. - Thich Nhat Hanh"
        ],
        focused: [
          "The mind is everything. What you think you become. - Buddha",
          "What we think, we become. All that we are arises with our thoughts. - Buddha"
        ],
        confident: [
          "Believe nothing, no matter where you read it, or who said it, unless it agrees with your own reason and your own common sense. - Buddha",
          "You yourself, as much as anybody in the entire universe, deserve your love and affection. - Buddha"
        ],
        resilient: [
          "Pain is inevitable, suffering is optional. - Buddha",
          "The lotus flower blooms most beautifully from the deepest and thickest mud. - Buddha"
        ]
      },
      vadim_zeland: {
        energetic: [
          "Reality is a mirror that reflects your relationship to it. Change your relationship, and reality will change.",
          "The world is like a mirror: it reflects your face. Be friendly, and you will see friendly faces.",
          "Excess potential is created when you attribute excessive importance to something.",
          "Choose your reality like you choose clothes from your wardrobe.",
          "The world will meet you halfway when you stop fighting it and start dancing with it."
        ],
        calm: [
          "Reduce importance and increase effectiveness.",
          "The world is a mirror of your inner state. Change your inner state, and the world will change.",
          "Let go of the need to control everything. Allow life to flow."
        ],
        focused: [
          "Intention is not desire. Intention is the decision to have and to act.",
          "Focus on the goal, not on the obstacles.",
          "Your thoughts create your reality. Choose them wisely."
        ],
        confident: [
          "You are the director of your own reality show.",
          "Believe in your right to have what you want.",
          "You don't have to earn your happiness. You have the right to it."
        ],
        resilient: [
          "Every problem contains within itself the seed of its own solution.",
          "What doesn't kill you makes you stronger, but what doesn't challenge you leaves you weaker.",
          "Obstacles are just alternative routes to your destination."
        ]
      },
      neville_goddard: {
        energetic: [
          "Assume the feeling of your wish fulfilled and observe the route that your attention follows.",
          "The world is yourself pushed out. Ask yourself what you want to see reflected back to you.",
          "Imagination is the beginning of creation. You imagine what you desire, you will what you imagine, and at last, you create what you will.",
          "Change your conception of yourself and you will automatically change the world in which you live.",
          "The feeling of the wish fulfilled is the secret of all successful prayer."
        ],
        calm: [
          "Be still and know that I am God. Stillness is the key to accessing your inner power.",
          "Your imagination is your preview of life's coming attractions.",
          "Live in the end. Feel the reality of your fulfilled desire now."
        ],
        focused: [
          "Assume the feeling of your wish fulfilled and observe the route that your attention follows.",
          "Attention is the key. Where your attention goes, energy flows and results show.",
          "Persistence is the key to success. Never give up on your vision."
        ],
        confident: [
          "You are already that which you want to be, and your refusal to believe this is the only reason you do not see it.",
          "God's will for you is perfect happiness, perfect health, perfect expression.",
          "You are the operant power. You are the one who chooses what to experience."
        ],
        resilient: [
          "Every moment of your life, consciously or unconsciously, you are assuming a feeling. Make sure it's the feeling you want to experience.",
          "Failure is only delayed success. Keep assuming the feeling of your wish fulfilled.",
          "Your past does not determine your future. Your imagination does."
        ]
      }
    };

    let selectedQuotes: string[];
    
    if (philosophy === "mixed") {
      // Mix quotes from all philosophies
      const allQuotes = Object.values(philosophicalWisdom).flatMap(p => p[mood] || p.energetic);
      selectedQuotes = allQuotes.sort(() => 0.5 - Math.random()).slice(0, 3);
    } else {
      selectedQuotes = philosophicalWisdom[philosophy][mood] || philosophicalWisdom[philosophy].energetic;
    }

    // Select a random quote from the appropriate category
    const selectedQuote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];

    // Add contextual wisdom based on team context
    let contextualAdvice = "";
    if (teamContext) {
      contextualAdvice = `\n\nFor your team context: ${teamContext}\n\nRemember: Leadership is not about being in charge. It's about taking care of those in your charge. Today, lead by example with the energy and wisdom you embody.`;
    }

    return {
      quote: selectedQuote,
      philosophy: philosophy,
      mood: mood,
      contextualAdvice: contextualAdvice,
      dailyAffirmation: `Today, I choose to embody ${mood} energy and lead with wisdom, compassion, and strength.`
    };
  },
});