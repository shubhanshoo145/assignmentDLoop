import { Document } from "mongoose";

export interface IStreet {
    region_code: number,
    region_name: string,
    city_code: number,
    city_name: string,
    street_code: number,
    street_name: string,
    street_name__status: string,
    official_code: number,
    streetId: number
}

export interface IStreetDocument extends Document, IStreet {

}