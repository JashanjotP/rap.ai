import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import { NextResponse } from 'next/server';

const pollyClient = new PollyClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { text } = data;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text cannot be empty' },
        { status: 400 }
      );
    }

    const command = new SynthesizeSpeechCommand({
      Engine: 'generative',
      LanguageCode: 'en-US',
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: 'Matthew',
    });

    const { AudioStream } = await pollyClient.send(command);

    // Convert AudioStream to Base64
    if (!AudioStream) {
      throw new Error('AudioStream is undefined');
    }

    const audioChunks: Buffer[] = [];
    // @ts-ignore
    for await (const chunk of AudioStream) {
      audioChunks.push(chunk as Buffer);
    }
    // @ts-ignore
    const audioBuffer = Buffer.concat(audioChunks);
    const audioBase64 = audioBuffer.toString('base64');

    // Return a Data URL for audio
    return NextResponse.json({
      audioUrl: `data:audio/mp3;base64,${audioBase64}`,
    });
  } catch (err: any) {
    console.error('Error in Polly TTS:', err);
    return NextResponse.json(
      { error: 'Failed to synthesize speech', details: err.message },
      { status: 500 }
    );
  }
}
