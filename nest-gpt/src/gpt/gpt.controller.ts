import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {
  }

  @Post('orthography-check')
  orthographyCheck(
    @Body() orthographyDto: OrthographyDto,
  ) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(
    @Body() prosConsDisscusserDto: ProsConsDiscusserDto,
  ) {
    return this.gptService.prosConsDiscusser(prosConsDisscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() prosConsDisscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream = await this.gptService.prosConsDiscusserStream(prosConsDisscusserDto);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      //console.log("piece", piece);
      res.write(piece);
    }

    res.end();
  }

  @Post('translate')
  async translate(
    @Body() translateDto: TranslateDto,
  ) {
    return this.gptService.translate(translateDto);
  }

  @Post('text-to-audio')
  async texToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response,
  ) {
    const filePath = await this.gptService.textToAudio(textToAudioDto);

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Get('text-to-audio/:fileName')
  async GetAudioFile(
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    const filePath = await this.gptService.getAudioByName(fileName);

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }
}
