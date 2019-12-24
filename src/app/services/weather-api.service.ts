import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import * as constants from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  readonly API_KEY = constants.API_KEY;
  readonly ROOT_URL = constants.ROOT_URL;

  constructor(private http: HttpClient) { }

  getWeatherData(newLatLong: string) {

    var TARGET_URL: string = this.ROOT_URL + '/' + this.API_KEY + '/' + newLatLong;
    return this.http.get(TARGET_URL);
  }

}
