import { Component, OnInit } from '@angular/core';
import { BrandFinal } from '../brand';
import { BrandService } from '../services/brand/brand.service';

@Component({
  selector: 'app-backend-requests',
  templateUrl: './backend-requests.component.html',
  styleUrls: ['./backend-requests.component.css']
})
export class BackendRequestsComponent implements OnInit {

  brands!: BrandFinal[];
  calendarDate: Date = new Date(Date.now());

  constructor(private brandService: BrandService) { }

  getBrands() {
    this.brandService.getBrands(this.calendarDate)
      .subscribe(b => this.brands = b);
  }

  chooseDate() {
    //refresh component with new data from api
    this.ngOnInit(); 
  }

  ngOnInit(): void {
    this.getBrands();
  }
}
