export const maxDuration = 60;
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // Ensure this environment variable is set
});

// List of brainrot terms
const brainrotTerms = [
  "skibidi", "gyatt", "rizz", "only in ohio", "duke dennis", "did you pray today", "livvy dunne", "rizzing up baby gronk", "sussy imposter", 
  "pibby glitch in real life", "sigma alpha omega male grindset", "andrew tate", "goon cave", "freddy fazbear",
 "blud dawg", "shmlawg", "ishowspeed", "a whole bunch of turbulence", "ambatukam", "bro really thinks he's carti", 
  "literally hitting the griddy", "the ocky way", "kai cenat", "fanum tax","no edging in class",
  "bussing", "axel in harlem", "whopper whopper whopper whopper", "1 2 buckle my shoe", "goofy ahh", "aiden ross", 
  "quirked up white boy", "busting it down sexual style", "goated with the sauce", "john pork", "grimace shake", "kiki do you love me", "huggy wuggy", 
  "nathaniel b", "lightskin stare", "biggest bird", "omar the referee", "amogus", "uncanny",  "chungus", "keanu reeves", "pizza tower", 
  "zesty", "poggers", "kumalala", "savesta", "quandale dingle", "glizzy", "rose", "toy ankha zone", "thug shaker", "morbin time", "dj khaled", 
  "ayo the pizza here", "PLUH", "nair butthole waxing", "ugandan knuckles",
  "nickeh30", "ratio", "uwu", "delulu", "opium bird", "mewing", "fortnite battle pass", "all my fellas", "gta 6", "backrooms", "gigachad", "based", 
  "cringe", "redpilled",   "foot fetish", "F in the chat", "looksmaxxing", "gassy", "social credit", 
  "bing chilling", "mrbeast", "kid named finger", "better caul saul", "i am a surgeon", "hit or miss i guess they never miss huh", "i like ya cut g", 
  "ice spice", "gooning fr", "we go gym", "kevin james", "josh hutcherson", "coffin of andy and leyley", "i like my cheese drippy bruh"
];

export async function POST(req: Request) {
  try {
    // Parse the request body
    const data = await req.json();
    console.log(data);
    const { object1, object2, rounds } = data;

    
    console.log(object1, object2, rounds);

    // Validate input
    if (!object1 || !object2 || !rounds || typeof rounds !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input. Please provide object1, object2, and a valid number of rounds.' },
        { status: 400 }
      );
    }

    let rapBattle = [];
    let previousVerse = '';

    for (let i = 1; i <= rounds; i++) {
      // Select random brainrot terms to use in the verse
      const randomTerms1 = getRandomTerms();
      const randomTerms2 = getRandomTerms();

      // Object 1's verse (brainrot-style rap)
      const object1Response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a chaotic, brainrot-style rap generator. Use meme terms to create surreal and absurd raps in a battle format. Only return the lines followed by a \n to represent a break' },
          {
            role: 'user',
            content: `Object: ${object1}\nOpponent's Verse: ${
              previousVerse || 'Start the battle with chaotic meme energy.'
            }\nIncorporate terms like ${randomTerms1.join(", ")} into the verse to diss ${object2}, in a surreal, meme-filled rap. The brainrot terms should be used so the verse makes sense and roasts the other object.
            I want the verse to be around 10 lines`,
          },
        ],
      });

      //@ts-ignore
      const object1Verse = object1Response.choices[0].message.content.trim();

      // Object 2's verse (brainrot-style rap response)
      const object2Response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a chaotic, brainrot-style rap generator. Use meme terms to create surreal and absurd raps in a battle format. Only return the lines followed by a \n to represent a break' },
          {
            role: 'user',
            content: `Object: ${object2}\nOpponent's Verse: ${object1Verse}\nIncorporate terms like ${randomTerms2.join(", ")} into the verse and used these terms to diss ${object1} in a surreal, meme-filled rap. The brainrot terms should be used so the verse makes sense and roasts the other object
            I want the verse to be around 10 lines`,
          },
        ],
      });

      //@ts-ignore
      const object2Verse = object2Response.choices[0].message.content.trim();

      // Add this round's verses to the battle
      rapBattle.push({
        round: i,
        object1: object1Verse,
        object2: object2Verse,
      });

      // Update previousVerse for the next round
      previousVerse = object2Verse;
    }

    // Respond with the rap battle result
    return NextResponse.json({ battle: rapBattle });
  } catch (error) {
    console.error('Error generating brainrot rap battle:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating the brainrot rap battle.' },
      { status: 500 }
    );
  }
}

// Helper function to get random brainrot terms
function getRandomTerms(): string[] {
  const numTerms = Math.floor(Math.random() * 3) + 3;
  const shuffledTerms = [...brainrotTerms].sort(() => Math.random() - 0.5); // Shuffle the terms
  return shuffledTerms.slice(0, numTerms); // Pick the first few terms
}
