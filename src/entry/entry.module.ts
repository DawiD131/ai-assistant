import { Module } from '@nestjs/common';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { OpenaiService } from '../openai.service';

@Module({
  controllers: [EntryController],
  providers: [EntryService, OpenaiService],
})
export class EntryModule {}
