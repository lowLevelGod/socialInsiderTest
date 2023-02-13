import { Timestamp } from "rxjs";

export interface BrandsResult {
    id: number,
    error: string,
    result: Brand[]
}

export interface Profile {
    id: string;
    name: string;
    profile_type: string;
    profile_added: Date;
}

export interface Brand {
    brandname: string;
    profiles: [Profile];
  }


export interface DateSocial {
    start: number;
    end: number;
    timezone: string;
}

export interface BrandFinal {
    name: string;
    totalProfiles: number;
    totalFans: number;
    totalEngagement: number;
}