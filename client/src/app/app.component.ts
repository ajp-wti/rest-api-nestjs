import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from "./services/api-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataContent = []
  totalRecords: any
  page: any = 1

  public title = 'My Angular App';
  public isAuthenticated: boolean;

  segment = new FormControl('');
  country = new FormControl('');
  product = new FormControl('');
  newProduct = new FormGroup({
    segment: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    unitSold: new FormControl('', Validators.required),
  });


  constructor(private apiService: ApiServiceService) {
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.apiService.getData().subscribe((result)=>{
      this.dataContent = result
      this.totalRecords = result.length
      console.log(result)
    })
  }

  getFileSegment(event: Event) {
    event.preventDefault();

    this.apiService.getFileSegment(this.segment.value).subscribe((result)=>{
      this.dataContent = result
      this.totalRecords = result.length
    })

    this.segment.reset()
  }

  getFileCountry(event: Event) {
    event.preventDefault();

    this.apiService.getFileCountry(this.country.value).subscribe((result)=>{
      this.dataContent = result
      this.totalRecords = result.length
    })

    this.segment.reset()
  }

  getFileProduct(event: Event) {
    event.preventDefault();

    this.apiService.getFileProduct(this.product.value).subscribe((result)=>{
      this.dataContent = result
      this.totalRecords = result.length
    })

    this.product.reset()
  }

  addNewData(event: Event) {
    event.preventDefault();

    const newDataToAdd = {
        Segment: this.newProduct.get('segment')!.value,
        Country: this.newProduct.get('country')!.value,
        Product: this.newProduct.get('product')!.value,
        UnitSold: this.newProduct.get('unitSold')!.value,
      }

    this.apiService.addNewData(newDataToAdd).subscribe((result)=>{
      this.dataContent = result
      this.totalRecords = result.length
    })

    this.newProduct.reset()
  }

  onRemove(event: Event, index: any) {
    event.preventDefault();

    this.apiService.removeData(index).subscribe((result)=>{
      console.log(result)
      this.dataContent = result
      this.totalRecords = result.length
    })
  }
}
