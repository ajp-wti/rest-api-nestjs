import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  dataUrl = "http://localhost:3000/fileData";

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<[]>(this.dataUrl)
  }

  getFileSegment(segment: any) {
    return this.http.get<[]>(`${this.dataUrl}/segment/${segment}`)
  }

  getFileCountry(country: any) {
    return this.http.get<[]>(`${this.dataUrl}/country/${country}`)
  }

  getFileProduct(product: any) {
    return this.http.get<[]>(`${this.dataUrl}/products/${product}`)
  }

  addNewData(data: any) {
    return this.http.post<[]>(this.dataUrl, data)
  }

  removeData(id: any) {
    return this.http.delete<[]>(`${this.dataUrl}/row/${id}`)
  }

  searchValue(data: any) {
    return this.http.get<[]>(`${this.dataUrl}/allData/${data}`)
  }

  getTotalUnit(segment: any, country: any) {
    return this.http.get<[]>(`${this.dataUrl}/unitsSolds/${segment}/${country}`)
  }
}
