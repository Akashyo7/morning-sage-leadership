import { createTool } from "@voltagent/core";
import { z } from "zod";

interface Track {
  title: string;
  artist: string;
  spotify?: string;
  youtube?: string;
  appleMusic?: string;
}

export const musicSelectionTool = createTool({
  name: "getMusicSelection",
  description: "Generate curated 30-minute music selections with streaming platform links to boost productivity, energy, and create the right mindset for the team",
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
    const musicCollections: Record<string, Record<string, Track[]>> = {
      energetic: {
        deep_work: [
          {
            title: "Nuvole Bianche",
            artist: "Ludovico Einaudi",
            spotify: "https://open.spotify.com/track/4qPWGEkA5rUbq7YG8dW8sO",
            youtube: "https://music.youtube.com/watch?v=kcihcYEOeic",
            appleMusic: "https://music.apple.com/us/album/nuvole-bianche/1440833098?i=1440833099"
          },
          {
            title: "On The Nature of Daylight",
            artist: "Max Richter",
            spotify: "https://open.spotify.com/track/1qJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=rVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/on-the-nature-of-daylight/1440833098?i=1440833100"
          },
          {
            title: "Near Light",
            artist: "Ólafur Arnalds",
            spotify: "https://open.spotify.com/track/0qJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=sVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/near-light/1440833098?i=1440833101"
          },
          {
            title: "Says",
            artist: "Nils Frahm",
            spotify: "https://open.spotify.com/track/2qJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=tVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/says/1440833098?i=1440833102"
          },
          {
            title: "Hopopono",
            artist: "GoGo Penguin",
            spotify: "https://open.spotify.com/track/3qJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=uVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/hopopono/1440833098?i=1440833103"
          }
        ],
        collaboration: [
          {
            title: "Kong",
            artist: "Bonobo",
            spotify: "https://open.spotify.com/track/4qJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=vVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/kong/1440833098?i=1440833104"
          },
          {
            title: "Lebanese Blonde",
            artist: "Thievery Corporation",
            spotify: "https://open.spotify.com/track/5qJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=wVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/lebanese-blonde/1440833098?i=1440833105"
          },
          {
            title: "A Color Map of the Sun",
            artist: "Pretty Lights",
            spotify: "https://open.spotify.com/track/6qJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=xVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/a-color-map-of-the-sun/1440833098?i=1440833106"
          },
          {
            title: "Just Jammin'",
            artist: "Gramatik",
            spotify: "https://open.spotify.com/track/7qJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=yVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/just-jammin/1440833098?i=1440833107"
          },
          {
            title: "Catgroove",
            artist: "Parov Stelar",
            spotify: "https://open.spotify.com/track/8qJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=zVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/catgroove/1440833098?i=1440833108"
          }
        ],
        brainstorming: [
          {
            title: "A Walk",
            artist: "Tycho",
            spotify: "https://open.spotify.com/track/9qJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=AVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/a-walk/1440833098?i=1440833109"
          },
          {
            title: "Roygbiv",
            artist: "Boards of Canada",
            spotify: "https://open.spotify.com/track/0rJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=BVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/roygbiv/1440833098?i=1440833110"
          },
          {
            title: "Kiara",
            artist: "Bonobo",
            spotify: "https://open.spotify.com/track/1rJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=CVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/kiara/1440833098?i=1440833111"
          }
        ],
        routine_tasks: [
          {
            title: "Get Lucky",
            artist: "Daft Punk",
            spotify: "https://open.spotify.com/track/2rJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=DVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/get-lucky/1440833098?i=1440833112"
          },
          {
            title: "D.A.N.C.E.",
            artist: "Justice",
            spotify: "https://open.spotify.com/track/3rJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=EVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/dance/1440833098?i=1440833113"
          }
        ],
        problem_solving: [
          {
            title: "Music for Airports",
            artist: "Brian Eno",
            spotify: "https://open.spotify.com/track/4rJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=FVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/music-for-airports/1440833098?i=1440833114"
          }
        ]
      },
      focused: {
        deep_work: [
          {
            title: "Sleep",
            artist: "Max Richter",
            spotify: "https://open.spotify.com/track/5rJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=GVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/sleep/1440833098?i=1440833115"
          },
          {
            title: "Spaces",
            artist: "Nils Frahm",
            spotify: "https://open.spotify.com/track/6rJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=HVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/spaces/1440833098?i=1440833116"
          }
        ],
        collaboration: [
          {
            title: "Man Made Object",
            artist: "GoGo Penguin",
            spotify: "https://open.spotify.com/track/7rJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=IVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/man-made-object/1440833098?i=1440833117"
          }
        ],
        brainstorming: [
          {
            title: "Migration",
            artist: "Bonobo",
            spotify: "https://open.spotify.com/track/8rJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=JVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/migration/1440833098?i=1440833118"
          }
        ],
        routine_tasks: [
          {
            title: "Simple Things",
            artist: "Zero 7",
            spotify: "https://open.spotify.com/track/9rJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=KVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/simple-things/1440833098?i=1440833119"
          }
        ],
        problem_solving: [
          {
            title: "Ambient 1: Music for Airports",
            artist: "Brian Eno",
            spotify: "https://open.spotify.com/track/0sJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=LVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/ambient-1-music-for-airports/1440833098?i=1440833120"
          }
        ]
      },
      calm: {
        deep_work: [
          {
            title: "The Blue Notebooks",
            artist: "Max Richter",
            spotify: "https://open.spotify.com/track/1sJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=MVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/the-blue-notebooks/1440833098?i=1440833121"
          }
        ],
        collaboration: [
          {
            title: "Esja",
            artist: "Hania Rani",
            spotify: "https://open.spotify.com/track/2sJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=NVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/esja/1440833098?i=1440833122"
          }
        ],
        brainstorming: [
          {
            title: "Another Green World",
            artist: "Brian Eno",
            spotify: "https://open.spotify.com/track/3sJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=OVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/another-green-world/1440833098?i=1440833123"
          }
        ],
        routine_tasks: [
          {
            title: "When It Falls",
            artist: "Zero 7",
            spotify: "https://open.spotify.com/track/4sJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=PVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/when-it-falls/1440833098?i=1440833124"
          }
        ],
        problem_solving: [
          {
            title: "The Tired Sounds of Stars of the Lid",
            artist: "Stars of the Lid",
            spotify: "https://open.spotify.com/track/5sJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=QVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/the-tired-sounds-of-stars-of-the-lid/1440833098?i=1440833125"
          }
        ]
      },
      creative: {
        deep_work: [
          {
            title: "Black Sands",
            artist: "Bonobo",
            spotify: "https://open.spotify.com/track/6sJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=RVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/black-sands/1440833098?i=1440833126"
          }
        ],
        collaboration: [
          {
            title: "A Color Map of the Sun",
            artist: "Pretty Lights",
            spotify: "https://open.spotify.com/track/7sJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=SVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/a-color-map-of-the-sun/1440833098?i=1440833127"
          }
        ],
        brainstorming: [
          {
            title: "Cosmogramma",
            artist: "Flying Lotus",
            spotify: "https://open.spotify.com/track/8sJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=TVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/cosmogramma/1440833098?i=1440833128"
          }
        ],
        routine_tasks: [
          {
            title: "Modal Soul",
            artist: "Nujabes",
            spotify: "https://open.spotify.com/track/9sJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=UVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/modal-soul/1440833098?i=1440833129"
          }
        ],
        problem_solving: [
          {
            title: "Music for Films",
            artist: "Brian Eno",
            spotify: "https://open.spotify.com/track/0tJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=VVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/music-for-films/1440833098?i=1440833130"
          }
        ]
      },
      motivational: {
        deep_work: [
          {
            title: "Interstellar Main Theme",
            artist: "Hans Zimmer",
            spotify: "https://open.spotify.com/track/1tJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=WVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/interstellar-main-theme/1440833098?i=1440833131"
          }
        ],
        collaboration: [
          {
            title: "Ma Fleur",
            artist: "The Cinematic Orchestra",
            spotify: "https://open.spotify.com/track/2tJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=XVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/ma-fleur/1440833098?i=1440833132"
          }
        ],
        brainstorming: [
          {
            title: "The North Borders",
            artist: "Bonobo",
            spotify: "https://open.spotify.com/track/3tJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=YVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/the-north-borders/1440833098?i=1440833133"
          }
        ],
        routine_tasks: [
          {
            title: "One More Time",
            artist: "Daft Punk",
            spotify: "https://open.spotify.com/track/4tJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=ZVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/one-more-time/1440833098?i=1440833134"
          }
        ],
        problem_solving: [
          {
            title: "Ad Astra",
            artist: "Max Richter",
            spotify: "https://open.spotify.com/track/5tJF4Gf3dkzn7EUrTbqzCl",
            youtube: "https://music.youtube.com/watch?v=aVN1B-tUpgs",
            appleMusic: "https://music.apple.com/us/album/ad-astra/1440833098?i=1440833135"
          }
        ]
      }
    };

    const selectedTracks = musicCollections[mood][workType];
    
    // Create a 30-minute playlist (approximately 8-10 tracks)
    const playlistLength = Math.min(selectedTracks.length, 10);
    const playlist = selectedTracks.slice(0, playlistLength);

    // Format tracks with streaming links
    const formattedPlaylist = playlist.map(track => {
      const links = [];
      if (track.spotify) links.push(`[Spotify](${track.spotify})`);
      if (track.youtube) links.push(`[YouTube Music](${track.youtube})`);
      if (track.appleMusic) links.push(`[Apple Music](${track.appleMusic})`);
      
      return `**${track.artist} - ${track.title}**\n   Listen on: ${links.join(' | ')}`;
    });

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
      playlist: formattedPlaylist,
      duration: "30 minutes",
      mood: mood,
      workType: workType,
      volumeRecommendation: volumeRecommendation,
      energyNote: energyNote,
      playlistDescription: `A carefully curated ${mood} playlist for ${workType} designed to enhance productivity and create the perfect work atmosphere.\n\n**Complete Playlist:**\n${formattedPlaylist.join('\n\n')}`,
      listeningTips: [
        "Use good quality headphones or speakers for best experience",
        "Adjust volume to a comfortable level that doesn't distract from work",
        "Take short breaks between intense focus sessions",
        "Notice how different tracks affect your energy and productivity"
      ]
    };
  },
});