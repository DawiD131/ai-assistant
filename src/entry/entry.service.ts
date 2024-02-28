import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai.service';

@Injectable()
export class EntryService {
  constructor(private readonly openAiService: OpenaiService) {}

  async handleQuery(query: string) {
    return this.openAiService.getQuery({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: query,
        },
      ],
    });
  }
}
