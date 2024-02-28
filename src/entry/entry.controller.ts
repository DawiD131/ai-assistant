import { Body, Controller, Post } from '@nestjs/common';
import { HandleQueryDto } from './dto';
import { EntryService } from './entry.service';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}
  @Post('/query')
  handleQuery(@Body() handleQueryDto: HandleQueryDto) {
    return this.entryService.handleQuery(handleQueryDto.query);
  }
}
