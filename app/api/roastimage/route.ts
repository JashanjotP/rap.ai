export const maxDuration = 60;
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // Ensure this environment variable is set
});

export async function POST(req: Request) {
	try {
	  // Parse the request body
	  const data = await req.json();
	  const { imageUrl} = data;

	  const response = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
		  {
			role: "user",
			content: [
			  { type: "text", text: "You have been given a image. Roast something in it in a lighthearted or humorous way that makes fun of the image" },
			  {
				type: "image_url",
				image_url: {
				  "url": imageUrl,
				},
			  },
			],
		  },
		],
	  });
	  const roastData = response.choices[0].message.content?.trim()
	  console.log(roastData);

	  return NextResponse.json({ roast: roastData});
	}
	catch (error) {
		console.error('Error in image roasting:', error);
		return new Response('Error parsing request body', { status: 400 });
	}
}