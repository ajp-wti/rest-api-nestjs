import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileReaderController } from './fileReader/fileReader.controller';
import { FileReaderService } from './fileReader/fileReader.service';

@Module({
  imports: [],
  controllers: [AppController, FileReaderController],
  providers: [AppService, FileReaderService],
})
export class AppModule {}
