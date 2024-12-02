import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // Ensure this environment variable is set
});

export async function POST(req: Request) {

	try{
		const data = await req.json();

		const { objectName} = data;

		if (!objectName) {
			return NextResponse.json(
			  { error: 'Invalid input. Please provide name of object' },
			  { status: 400 }
			);
		}

		const response = await openai.images.generate({
			model: "dall-e-2",
			prompt: `${objectName} holding a microphone at a rap battle contest. Make the object have eyes, arms, mouth and legs. Its is holding a mic
			and standing in a room and rapping lyrics to the audience`,
			n: 1,
			size: "1024x1024",
		});

		const image_url = response.data[0].url;

    	return NextResponse.json({imageUrl: image_url });
	} catch (error) {
		console.error('Error generating image:', error);
		return NextResponse.json({ error: 'An error occurred while generating the image' }, { status: 500 });
	}
}