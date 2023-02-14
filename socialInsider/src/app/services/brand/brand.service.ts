import { Injectable } from '@angular/core';
import { Brand, BrandFinal, BrandsResult, DateSocial } from 'src/app/brand';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

  getProfileData(id: string, date: DateSocial, profile_type: string) {
    
    const body = {
      id: id,
      date: date,
      profile_type: profile_type
    }

    const headers =
     new HttpHeaders().set('Content-Type','application/json');

    return this.http.post(
      this.backendUrl, 
      JSON.stringify(body), 
      {headers: headers}
      );

  }
}
