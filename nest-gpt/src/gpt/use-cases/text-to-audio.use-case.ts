import OpenAI from 'openai';
import * as path from 'path';
import * as fs from 'fs';
import * as process from 'node:process';

interface Options {
  prompt: string;
  voice?: string;
}

export const textToAudioUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, voice } = options;

  const voices = {
    'nova': 'nova',
    'alloy': 'alloy',
  };

  const selectedVoice = voices[voice] ?? 'nova';

  const folderPath = path.resolve(__dirname, '../../../', 'generated/audios');
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true });

  const mp3 = await openai.audio.speech.create({
    voice: selectedVoice,
    model: 'tts-1',
    input: prompt,
    response_format: 'mp3',
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(speechFile, buffer);

  return speechFile;
};