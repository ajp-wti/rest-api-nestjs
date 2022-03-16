import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from "./services/api-service.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataContent = []
  noDuplicatedCountry: any = []
  noDuplicatedProduct: any = []
  noDuplicatedSegment: any = []
  totalRecords: any
  page: any = 1

  public title = 'My Angular App';
  public isAuthenticated: boolean;

  selectedSegment: string | undefined

  dataForm = this.fb.group({
    segment: [''],
    country: [''],
    product: [''],
    newSegment: ['', Validators.required],
    newCountry: ['', Validators.required],
    newProduct: ['', Validators.required],
    newUnitSold: ['', Validators.required],
    searchData: [''],
  })

  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder
  ) {
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.apiService.getData().subscribe((result)=>{
      result.forEach((el: any, index) => {
        el.id = index
      })

      this.dataContent = result
      this.totalRecords = result.length

      const noDuplicatedSegmentArr = result.map(segment => segment['segment'])
      this.noDuplicatedSegment = [...new Set(noDuplicatedSegmentArr)]
      const noDuplicatedProductArr = result.map(product => product['product'])
      this.noDuplicatedProduct = [...new Set(noDuplicatedProductArr)]
      const noDuplicatedCountryArr = result.map(country => country['country'])
      this.noDuplicatedCountry = [...new Set(noDuplicatedCountryArr)]

    })
  }

  getFileSegment(event: Event) {
    event.preventDefault();

    this.apiService.getFileSegment(this.dataForm.get('segment')?.value).subscribe((result)=>{
      result.forEach((el: any, index) => {
        el.id = index
      })

      this.dataContent = result
      this.totalRecords = result.length
    })

    this.dataForm.reset()
  }

  getFileCountry(event: Event) {
    event.preventDefault();

    this.apiService.getFileCountry(this.dataForm.get('country')?.value).subscribe((result)=>{
      result.forEach((el: any, index) => {
        el.id = index
      })

      this.dataContent = result
      this.totalRecords = result.length
    })

    this.dataForm.reset()
  }

  getFileProduct(event: Event) {
    event.preventDefault();

    this.apiService.getFileProduct(this.dataForm.get('product')?.value).subscribe((result)=>{
      result.forEach((el: any, index) => {
        el.id = index
      })

      this.dataContent = result
      this.totalRecords = result.length
    })

    this.dataForm.reset()
  }

  addNewData(event: Event) {
    event.preventDefault();

    const newDataToAdd = {
        Segment: this.dataForm.get('newSegment')!.value,
        Country: this.dataForm.get('newCountry')!.value,
        Product: this.dataForm.get('newProduct')!.value,
        UnitSold: this.dataForm.get('newUnitSold')!.value,
      }

    this.apiService.addNewData(newDataToAdd).subscribe((result)=>{
      result.forEach((el: any, index) => {
        el.id = index
      })

      this.dataContent = result
      this.totalRecords = result.length
    })

    this.dataForm.reset()
  }

  onRemove(event: Event, index: any) {
    event.preventDefault();

    this.apiService.removeData(index).subscribe((result)=>{
      result.forEach((el: any, index) => {
        el.id = index
      })

      this.dataContent = result
      this.totalRecords = result.length
    })
  }

  onSearch(event: Event) {
    event.preventDefault();

    this.apiService.searchValue(this.dataForm.get('searchData')?.value).subscribe((result)=>{
      result.forEach((el: any, index) => {
        el.id = index
      })

      this.dataContent = result
      this.totalRecords = result.length
    })
  }
}
