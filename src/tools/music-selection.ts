import { createTool } from "@voltagent/core";
import { z } from "zod";

export const musicSelectionTool = createTool({
  name: "getMusicSelection",
  description: "Generate curated 30-minute music selections to boost productivity, energy, and create the right mindset for the team",
  parameters: z.object({
    mood: z.enum(["energetic", "focused", "calm", "creative", "motivational"]).describe("The desired mood/energy for the music selection"),
    workType: z.enum(["deep_work", "collaboration", "brainstorming", "routine_tasks", "problem_solving"]).describe("The type of work the team will be doing"),
    teamSize: z.number().optional().describe("Number of team members (affects volume and energy recommendations)"),
    timeOfDay: z.enum(["early_morning", "mid_morning", "afternoon", "evening"]).describe("Time of day for the session"),
  }),
  execute: async ({ mood, workType, teamSize, timeOfDay }: {
    mood: "energetic" | "focused" | "calm" | "creative" | "motivational";
    workType: "deep_work" | "collaboration" | "brainstorming" | "routine_tasks" | "problem_solving";
    teamSize?: number;
    timeOfDay: "early_morning" | "mid_morning" | "afternoon" | "evening";
  }) => {
    const musicCollections = {
      energetic: {
        deep_work: [
          "Ludovico Einaudi - Nuvole Bianche (Extended Mix)",
          "Max Richter - On The Nature of Daylight",
          "Ólafur Arnalds - Near Light",
          "Nils Frahm - Says",
          "GoGo Penguin - Hopopono",
          "Kiasmos - Blurred EP",
          "Emancipator - Soon It Will Be Cold Enough"
        ],
        collaboration: [
          "Bonobo - Kong",
          "Thievery Corporation - Lebanese Blonde",
          "Nujabes - Aruarian Dance",
          "RJD2 - Ghostwriter",
          "Pretty Lights - A Color Map of the Sun",
          "Gramatik - Just Jammin'",
          "Parov Stelar - Catgroove"
        ],
        brainstorming: [
          "Tycho - A Walk",
          "Boards of Canada - Roygbiv",
          "Aphex Twin - Xtal",
          "Bonobo - Kiara",
          "Emancipator - Dusk to Dawn",
          "Blockhead - The Music Scene",
          "RJD2 - Work It Out"
        ],
        routine_tasks: [
          "Daft Punk - Random Access Memories",
          "Justice - Cross",
          "Moderat - III",
          "Caribou - Swim",
          "Four Tet - There Is Love in You",
          "Jamie xx - In Colour",
          "Disclosure - Settle"
        ],
        problem_solving: [
          "Brian Eno - Music for Airports",
          "Stars of the Lid - The Tired Sounds of Stars of the Lid",
          "Tim Hecker - Ravedeath, 1972",
          "William Basinski - The Disintegration Loops",
          "Grouper - Dragging a Dead Deer Up a Hill",
          "Loscil - Plume",
          "Rafael Anton Irisarri - The Shameless Years"
        ]
      },
      focused: {
        deep_work: [
          "Max Richter - Sleep (Excerpts)",
          "Nils Frahm - Spaces",
          "Ólafur Arnalds - Re:member",
          "Kiasmos - Swept EP",
          "Ben Lukas Boysen - Spells",
          "A Winged Victory for the Sullen - Invisible Cities",
          "Dustin O'Halloran - Opus 36"
        ],
        collaboration: [
          "GoGo Penguin - Man Made Object",
          "The Cinematic Orchestra - Every Day",
          "Portico Quartet - Ruins",
          "Mammal Hands - Floa",
          "Hania Rani - Esja",
          "Lambert - Sweet Apocalypse",
          "Rival Consoles - Howl"
        ],
        brainstorming: [
          "Bonobo - Migration",
          "Emancipator - Safe in the Steep Cliffs",
          "Tycho - Dive",
          "Boards of Canada - Music Has the Right to Children",
          "Aphex Twin - Selected Ambient Works",
          "Autechre - Tri Repetae",
          "Squarepusher - Go Plastic"
        ],
        routine_tasks: [
          "Café del Mar - Chillout Sessions",
          "Zero 7 - Simple Things",
          "Air - Moon Safari",
          "Thievery Corporation - The Mirror Conspiracy",
          "Kruder & Dorfmeister - The K&D Sessions",
          "Nightmares on Wax - Smokers Delight",
          "Morcheeba - Big Calm"
        ],
        problem_solving: [
          "Brian Eno - Ambient 1: Music for Airports",
          "Harold Budd & Brian Eno - The Plateaux of Mirror",
          "Stars of the Lid - And Their Refinement of the Decline",
          "Tim Hecker - Harmony in Ultraviolet",
          "Loscil - First Narrows",
          "Rafael Anton Irisarri - A Fragile Geography",
          "William Basinski - Melancholia"
        ]
      },
      calm: {
        deep_work: [
          "Max Richter - The Blue Notebooks",
          "Ólafur Arnalds - Island Songs",
          "Nils Frahm - All Melody",
          "Dustin O'Halloran - Piano Solos Vol. 2",
          "Hauschka - Abandoned City",
          "Peter Broderick - Music for Falling from Trees",
          "Goldmund - The Malady of Elegance"
        ],
        collaboration: [
          "Kiasmos - Blurred EP",
          "Hania Rani - Esja",
          "Lambert - Sweet Apocalypse",
          "GoGo Penguin - Hopopono",
          "Portico Quartet - Art in the Age of Automation",
          "Mammal Hands - Captured Spirits",
          "The Cinematic Orchestra - To Build a Home"
        ],
        brainstorming: [
          "Brian Eno - Another Green World",
          "Boards of Canada - Geogaddi",
          "Aphex Twin - Selected Ambient Works Volume II",
          "Autechre - Amber",
          "Biosphere - Substrata",
          "Global Communication - 76:14",
          "The Orb - Adventures Beyond the Ultraworld"
        ],
        routine_tasks: [
          "Zero 7 - When It Falls",
          "Air - Talkie Walkie",
          "Thievery Corporation - Richest Man in Babylon",
          "Bonobo - Days to Come",
          "Emancipator - Soon It Will Be Cold Enough",
          "Tycho - Past Is Prologue",
          "Boards of Canada - Campfire Headphase"
        ],
        problem_solving: [
          "Stars of the Lid - The Tired Sounds of Stars of the Lid",
          "Tim Hecker - Virgins",
          "William Basinski - The River",
          "Loscil - Monument Builders",
          "Rafael Anton Irisarri - The Shameless Years",
          "Grouper - A I A: Dream Loss",
          "Ben Frost - By the Throat"
        ]
      },
      creative: {
        deep_work: [
          "Bonobo - Black Sands",
          "Emancipator - Dusk to Dawn",
          "Tycho - Awake",
          "GoGo Penguin - Man Made Object",
          "Kiasmos - Swept",
          "Nils Frahm - Screws",
          "Ólafur Arnalds - Near Light"
        ],
        collaboration: [
          "Pretty Lights - A Color Map of the Sun",
          "Gramatik - The Age of Reason",
          "Parov Stelar - The Princess",
          "Caravan Palace - Robot Face",
          "Electro Swing Circus - Bella Belle",
          "Caro Emerald - Back It Up",
          "Jamie Berry - Grandiose"
        ],
        brainstorming: [
          "Flying Lotus - Cosmogramma",
          "Aphex Twin - Drukqs",
          "Squarepusher - Hard Normal Daddy",
          "Autechre - LP5",
          "Boards of Canada - Tomorrow's Harvest",
          "Four Tet - Rounds",
          "Caribou - Our Love"
        ],
        routine_tasks: [
          "Nujabes - Modal Soul",
          "J Dilla - Donuts",
          "Madlib - Shades of Blue",
          "DJ Shadow - Endtroducing",
          "RJD2 - Deadringer",
          "Blockhead - Music by Cavelight",
          "Prefuse 73 - Vocal Studies + Uprock Narratives"
        ],
        problem_solving: [
          "Brian Eno - Music for Films",
          "Harold Budd - The Room",
          "Stars of the Lid - Gravitational Pull vs. The Desire for an Aquatic Life",
          "Tim Hecker - An Imaginary Country",
          "Loscil - Endless Falls",
          "Rafael Anton Irisarri - Peripeteia",
          "William Basinski - Cascade"
        ]
      },
      motivational: {
        deep_work: [
          "Hans Zimmer - Interstellar Soundtrack",
          "Max Richter - Memoryhouse",
          "Ólafur Arnalds - For Now I Am Winter",
          "Nils Frahm - Felt",
          "Dustin O'Halloran - Lumiere",
          "A Winged Victory for the Sullen - Atomos",
          "Ben Lukas Boysen - Golden Times 1"
        ],
        collaboration: [
          "The Cinematic Orchestra - Ma Fleur",
          "GoGo Penguin - Humdrum Star",
          "Portico Quartet - Memory Streams",
          "Mammal Hands - Animalia",
          "Hania Rani - Home",
          "Lambert - Act of Forgiveness",
          "Rival Consoles - Articulation"
        ],
        brainstorming: [
          "Bonobo - The North Borders",
          "Emancipator - Safe in the Steep Cliffs",
          "Tycho - Epoch",
          "Boards of Canada - The Campfire Headphase",
          "Aphex Twin - Syro",
          "Four Tet - New Energy",
          "Caribou - Suddenly"
        ],
        routine_tasks: [
          "Daft Punk - Discovery",
          "Justice - Woman",
          "Moderat - II",
          "Disclosure - Caracal",
          "Jamie xx - In Colour",
          "ODESZA - In Return",
          "Flume - Skin"
        ],
        problem_solving: [
          "Max Richter - Ad Astra",
          "Ólafur Arnalds - Some Kind of Peace",
          "Nils Frahm - Music for Animals",
          "Kiasmos - Blurred EP",
          "Ben Lukas Boysen - Spells",
          "A Winged Victory for the Sullen - The Undivided Five",
          "Dustin O'Halloran - Silfur"
        ]
      }
    };

    const selectedTracks = musicCollections[mood][workType];
    
    // Create a 30-minute playlist (approximately 8-10 tracks)
    const playlistLength = Math.min(selectedTracks.length, 10);
    const playlist = selectedTracks.slice(0, playlistLength);

    // Add recommendations based on team size and time of day
    let volumeRecommendation = "Medium volume";
    let energyNote = "";

    if (teamSize && teamSize > 5) {
      volumeRecommendation = "Lower volume to allow for communication";
    }

    switch (timeOfDay) {
      case "early_morning":
        energyNote = "Gentle start to build energy gradually";
        break;
      case "mid_morning":
        energyNote = "Peak productivity time - maintain focus";
        break;
      case "afternoon":
        energyNote = "Combat afternoon slump with uplifting selections";
        break;
      case "evening":
        energyNote = "Wind down while maintaining productivity";
        break;
    }

    return {
      playlist: playlist,
      duration: "30 minutes",
      mood: mood,
      workType: workType,
      volumeRecommendation: volumeRecommendation,
      energyNote: energyNote,
      playlistDescription: `A carefully curated ${mood} playlist for ${workType} designed to enhance productivity and create the perfect work atmosphere.`,
      listeningTips: [
        "Use good quality headphones or speakers for best experience",
        "Adjust volume to a comfortable level that doesn't distract from work",
        "Take short breaks between intense focus sessions",
        "Notice how different tracks affect your energy and productivity"
      ]
    };
  },
});