import { Component, NgIterable, OnInit } from '@angular/core';
import { Brand, BrandFinal, BrandsResult, DateSocial } from '../brand';
import { BrandService } from '../services/brand/brand.service';
import { Observable, firstValueFrom, merge } from 'rxjs';
import { concatMap, map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-backend-requests',
  templateUrl: './backend-requests.component.html',
  styleUrls: ['./backend-requests.component.css']
})
export class BackendRequestsComponent implements OnInit {

  brands: BrandFinal[] = [];

  constructor(private brandService: BrandService) { }

  getProfileData(id: string,
    d: DateSocial,
    profile_type: string) {

    return this.brandService.getProfileData(id,
      d,
      profile_type)
      .pipe(
        map(b => {
          var tmp = JSON.parse(JSON.stringify(b));
          const key1 = Object.keys(tmp.resp)[0];
          const keys = Object.keys(tmp.resp[key1]);

          var totalFans = 0;
          var totalEngagement = 0;

          for (let i = 0; i < keys.length; ++i) {
            const key = keys[i];
            totalEngagement += Number(tmp.resp[key1][key].engagement);
            console.log(key, tmp.resp[key1][key]);
          }

          const res = {
            totalEngagement: totalEngagement,
            totalFans: totalFans
          }

          return res;
        })
      );

  }

   async getBrands() {
    this.brandService.getBrands()
      .pipe(
        switchMap(brands => {
          const res = brands.map(b => {
            const stats = b.profiles.map(p => {
              const d = {
                start: new Date(p.profile_added).getTime(),
                end: Infinity,
                timezone: "Europe/London"
              };
              return this.getProfileData(p.id, d, p.profile_type)
            })

            console.log(stats);
            const brand = {
                    name: b.brandname,
                    totalProfiles: b.profiles.length,
                    stats: stats
                  };
              return brand;
          })

          return res;
        })
      )
      .subscribe(data =>{
        data.stats.forEach(x => {
          this.brands.push({
            name: data.name,
            totalProfiles: data.totalProfiles,
            totalEngagement: 0,
            totalFans: 0
          })
        })
      })
      // .subscribe(brands => {

      //   brands.forEach(b => {

      //     var totalEngagement = 0;
      //     var totalFans = 0;

      //     b.profiles.forEach(async p => {
      //       const d = {
      //         start: new Date(p.profile_added).getTime(),
      //         end: Infinity,
      //         timezone: "Europe/London"
      //       };
      //       const stats = await firstValueFrom(this.getProfileData(p.id, d, p.profile_type));

      //       totalEngagement += stats.totalEngagement;
      //       totalFans += stats.totalFans;
      //     });

      //     const brand = {
      //       name: b.brandname,
      //       totalProfiles: b.profiles.length,
      //       totalEngagement: totalEngagement,
      //       totalFans: totalFans
      //     };

      //     this.brands.push(brand);

      //   });

      // }

      // );
  }

  ngOnInit(): void {
    this.getBrands();
  }
}
