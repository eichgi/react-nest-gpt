import { Injectable, NotFoundException } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDiscusserUseCase, textToAudioUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
import OpenAI from 'openai';
import * as process from 'node:process';
import { prosConsDiscusserStreamUseCase } from './use-cases/pros-cons-stream.use-case';
import { translateUseCase } from './use-cases/translate.use-case';
import * as path from 'path';
import * as fs from 'node:fs';

@Injectable()
export class GptService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDiscusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }

  async prosConsDiscusserStream(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }

  async translate(translateDto: TranslateDto) {
    return await translateUseCase(this.openai, translateDto);
  }

  async textToAudio(textToAudioDto: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, textToAudioDto);
  }

  async getAudioByName(fileName: string) {
    const folderPath = path.resolve(__dirname, '../../', 'generated/audios');
    const speechFile = path.resolve(`${folderPath}/${fileName}.mp3`);

    if(!fs.existsSync(speechFile)) {
      new NotFoundException("File not found.");
    }

    return speechFile;
  }
}
