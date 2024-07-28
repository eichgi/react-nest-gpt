import { IsString } from 'class-validator';

export class TextToAudioDto {
  @IsString()
  prompt: string;

  @IsString()
  voice: string;
}