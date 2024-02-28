import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources';

@Injectable()
export class OpenaiService implements OnApplicationBootstrap {
  constructor(private readonly configService: ConfigService) {}

  public instance: OpenAI;
  async onApplicationBootstrap() {
    this.instance = new OpenAI({
      apiKey: this.configService.get<string>('OPEN_AI_API_KEY'),
    });
  }

  async getQuery(params: ChatCompletionCreateParamsNonStreaming) {
    const { choices } = await this.instance.chat.completions.create({
      model: params.model,
      messages: params.messages,
    });

    return choices[0].message.content;
  }
}
