import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import * as excel from 'exceljs';

@Injectable()
export class FileReaderService {
  fileData = [];

  getFileData() {
    const workbook = XLSX.readFile('assets/file.xlsx');

    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]],
    );

    const filteredData = xlData.map((data) => ({
      segment: data['Segment'],
      country: data['Country'],
      product: data['Product'],
      unitSold: data['Units Sold'],
    }));

    this.fileData = filteredData;

    return this.fileData;
  }

  getFileSegment(segment) {
    this.getFileData();

    const dataBySegment = this.fileData.filter(
      (data) => data.segment === segment,
    );

    return dataBySegment;
  }

  getFileCountry(country) {
    this.getFileData();

    const dataByCountry = this.fileData.filter(
      (data) => data.country === country,
    );

    return dataByCountry;
  }

  getFileProduct(product) {
    this.getFileData();

    const dataByProduct = this.fileData.filter(
      (data) => data.product === product,
    );

    return dataByProduct;
  }

  getFileUnitsSold() {
    this.getFileData();
  }

  getFileUnitsSoldTotal(segment, country) {
    this.getFileData();

    const dataByUnitsSold = this.fileData.filter(
      (data) => data.segment === segment && data.country === country,
    );
    const arrayOfUnitSold = dataByUnitsSold.map((data) => data.unitSold);

    const summedUnitSold = arrayOfUnitSold.reduce((a, b) => a + b);

    const finalUnitSoldObj = {
      segment: segment,
      country: country,
      totalUnitSold: summedUnitSold,
    };

    return finalUnitSoldObj;
  }

  addNewData(newData) {
    const workbook = XLSX.readFile('assets/file.xlsx');

    const newObject = [
      {
        Segment: newData.Segment,
        Country: newData.Country,
        Product: newData.Product,
        UnitSold: newData.UnitSold,
      },
    ];

    XLSX.utils.sheet_add_json(workbook.Sheets.Sheet1, newObject, {
      header: ['Segment', 'Country', 'Product', 'Units Sold'],
      skipHeader: true,
      origin: -1,
    });

    XLSX.writeFile(workbook, 'assets/file.xlsx');

    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]],
    );

    const filteredData = xlData.map((data) => ({
      segment: data['Segment'],
      country: data['Country'],
      product: data['Product'],
      unitSold: data['Units Sold'],
    }));

    this.fileData = filteredData;

    return this.fileData;
  }

  removeData(id: number) {
    const workbook = XLSX.readFile('assets/file.xlsx');

    const sheet_name_list = workbook.SheetNames;
    const workBookSheet = workbook.Sheets[sheet_name_list[0]];

    function ec(r, c) {
      return XLSX.utils.encode_cell({ r: r, c: c });
    }

    function delete_row(ws, row_index) {
      const variable = XLSX.utils.decode_range(ws['!ref']);
      for (let R = row_index; R < variable.e.r; ++R) {
        for (let C = variable.s.c; C <= variable.e.c; ++C) {
          ws[ec(R, C)] = ws[ec(R + 1, C)];
        }
      }
      variable.e.r--;
      ws['!ref'] = XLSX.utils.encode_range(variable.s, variable.e);
    }

    delete_row(workBookSheet, id);

    XLSX.writeFile(workbook, 'assets/file.xlsx');

    const workbookUpdated = XLSX.readFile('assets/file.xlsx');

    const sheet_name_list_updated = workbookUpdated.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbookUpdated.Sheets[sheet_name_list_updated[0]],
    );

    const filteredData = xlData.map((data) => ({
      segment: data['Segment'],
      country: data['Country'],
      product: data['Product'],
      unitSold: data['Units Sold'],
    }));

    this.fileData = filteredData;

    return this.fileData;
  }

  searchData(data: string) {
    this.getFileData();

    const searchedData = this.fileData.map((el) => {
      if (Object.values(el).includes(data)) {
        return el;
      }
    });

    const finalSearchData = searchedData.filter((el) => el);

    return finalSearchData;
  }
}
