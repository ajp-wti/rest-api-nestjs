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
  totalUnitSum: any = {
    country: '',
    segment: '',
    sum: '',
  }
  noDuplicatedCountry: any = []
  noDuplicatedProduct: any = []
  noDuplicatedSegment: any = []
  totalRecords: any
  page: any = 1
  showInvalid: boolean = false
  showInvalidUnit: boolean = false
  isTotalSum: boolean = false

  public title = 'My Angular App';
  public isAuthenticated: boolean;

  dataForm = this.fb.group({
    segment: [''],
    country: [''],
    product: [''],
    newSegment: ['', Validators.required],
    newCountry: ['', Validators.required],
    newProduct: ['', Validators.required],
    newUnitSold: ['', Validators.required],
    searchData: [''],
    segmentUnit: [''],
    countryUnit: [''],
  })

  constructor(
    private apiService: ApiServiceService,
    private fb: FormBuilder
  ) {
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.getAllData()
  }

  getAllData() {
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

    if (this.dataForm.invalid) {
      this.showInvalid = true
      setTimeout(() => {
        this.showInvalid = false
      },3000)
    } else {
      this.showInvalid = false


      this.apiService.addNewData(newDataToAdd).subscribe((result)=>{
        result.forEach((el: any, index) => {
          el.id = index
        })

        this.dataContent = result
        this.totalRecords = result.length
      })

      this.dataForm.reset()
    }
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

    if (!this.dataForm.get('searchData')?.value) {
      this.getAllData()
      return
    }

    this.apiService.searchValue(this.dataForm.get('searchData')?.value).subscribe((result)=>{
      result.forEach((el: any, index) => {
        el.id = index
      })

      this.dataContent = result
      this.totalRecords = result.length
    })
  }

  getTotalUnitSum(event: Event) {
    event.preventDefault();

    const selectedCountry = this.dataForm.get('countryUnit')?.value;
    const selectedSegment = this.dataForm.get('segmentUnit')?.value;

    if (!selectedCountry || !selectedSegment) {
      this.showInvalidUnit = true
      setTimeout(() => {
        this.showInvalidUnit = false
      },3000)
    } else {
      this.showInvalidUnit = false

      this.apiService.getTotalUnit(selectedSegment, selectedCountry).subscribe((result: any)=>{
        this.isTotalSum = true

        this.totalUnitSum.segment = result.segment
        this.totalUnitSum.country = result.country
        this.totalUnitSum.sum = result.totalUnitSold
      })

      this.dataForm.reset()
    }
  }
}
