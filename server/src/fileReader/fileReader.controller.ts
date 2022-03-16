import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FileReaderService } from './fileReader.service';

@Controller('fileData')
export class FileReaderController {
  constructor(private readonly fileService: FileReaderService) {}
  @Get()
  getAllFileData() {
    return this.fileService.getFileData();
  }

  @Get('segment/:segment')
  getFileSegment(@Param('segment') segment) {
    return this.fileService.getFileSegment(segment);
  }

  @Get('country/:country')
  getFileCountry(@Param('country') country) {
    return this.fileService.getFileCountry(country);
  }

  @Get('products/:product')
  getFileProduct(@Param('product') product) {
    return this.fileService.getFileProduct(product);
  }

  @Get('unitsSold')
  getFileUnitsSold() {
    return this.fileService.getFileUnitsSold();
  }

  @Get('unitsSolds/:segment/:country')
  getFileUnitsSoldTotal(@Param('segment') segment, @Param('country') country) {
    return this.fileService.getFileUnitsSoldTotal(segment, country);
  }

  @Get('allData/:data')
  searchData(@Param('data') data) {
    return this.fileService.searchData(data);
  }

  @Post()
  addNewData(@Body() body) {
    return this.fileService.addNewData(body);
  }

  @Delete('row/:id')
  removeData(@Param('id') id: number) {
    return this.fileService.removeData(id);
  }
}
