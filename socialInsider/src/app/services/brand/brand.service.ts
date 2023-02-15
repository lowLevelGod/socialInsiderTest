import { Injectable } from '@angular/core';
import { BrandFinal } from 'src/app/brand';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  backendUrl: string = 'http://localhost:4200/backendCompare';

  constructor(private http: HttpClient) { }

  getBrands(d: Date) {
    var result = this.http.post<BrandFinal[]>(this.backendUrl, {date: new Date(d).getTime()});

    return result;
  }
}
