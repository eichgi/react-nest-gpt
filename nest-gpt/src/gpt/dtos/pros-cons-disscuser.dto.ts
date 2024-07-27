import { IsString } from 'class-validator';

export class ProsConsDiscusserDto {
  @IsString()
  prompt: string;
}