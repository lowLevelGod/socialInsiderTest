import { Component, OnInit } from '@angular/core';
import { BrandFinal } from '../brand';
import { BrandService } from '../services/brand/brand.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-backend-requests',
  templateUrl: './backend-requests.component.html',
  styleUrls: ['./backend-requests.component.css']
})
export class BackendRequestsComponent implements OnInit {

  brands!: BrandFinal[];
  myGroup!: FormGroup;
  calendarDate: Date = new Date(Date.now());

  constructor(private brandService: BrandService) { }

  getBrands(){
    // console.log(this.calendarDate);
    this.brandService.getBrands(this.calendarDate)
    .subscribe(b => this.brands = b);
  }

  chooseDate(){
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.getBrands();
    this.myGroup = new FormGroup({
      firstName: new FormControl()
  });
  }
}
