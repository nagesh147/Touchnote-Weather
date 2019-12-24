import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { WeatherApiService } from '../../services/weather-api.service';
import { Forecast } from '../../interfaces/forecast';
import { Location } from '../../interfaces/location';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private weather: WeatherApiService) { }

  forecast: Forecast;
  weatherData: Observable<Object>;
  locationList: Location[];
  location: Location;

  ngOnInit() {
    this.initLocationData();
    this.initDropdownList();
    this.getWeatherForecast();
    //Refresh every minute
    interval(60000).subscribe(x => {
      console.log("Logging at each interval");
      this.initDropdownList();
      this.initLocationData();
      this.getWeatherForecast();
    });
  }

  setWeatherData(latlong: string) {
    this.weatherData = this.weather.getWeatherData(latlong);
  }

  getForecast() {
    //subscribe to the incoming observable data and clone fields into the Forecast object
    this.weatherData.subscribe((data: any) => this.forecast = {
      //Current (Today's) Forecast
      location: data['timezone'],
      summary: data.currently['summary'],
      date: new Date(data['currently']['time'] * 1000).getDate(),
      month: new Date(data['currently']['time'] * 1000).getMonth(),
      year: new Date(data['currently']['time'] * 1000).getFullYear(),
      icon: data['currently']['icon'],
      precipProbability: data['currently']['precipProbability'],
      temperature: Math.round(this.getCelsiusTemperature(data['currently']['temperature'])),
      temperatureHigh: data['currently']['temperatureHigh'],
      temperatureLow: data['currently']['temperatureLow'],
      humidity: data['currently']['humidity']

    });
  }


  //Initializes a  list of locations and their associated lat-long coordinates
  initLocationData() {
    this.locationList = [

      {
        name: "London",
        latitude: 51.5074,
        longitude: 0.1278
      } as Location,
      {
        name: "Hyderabad",
        latitude: 17.3850,
        longitude: 78.4867
      } as Location,
      {
        name: "Los Angeles",
        latitude: 37.8267,
        longitude: -122.4233
      } as Location,
      {
        name: "Paris",
        latitude: 48.8566,
        longitude: 2.3522
      } as Location,
      {
        name: "Tokyo",
        latitude: 35.6762,
        longitude: 139.6503
      } as Location,
      {
        name: "New York",
        latitude: 40.7128,
        longitude: 74.0060
      } as Location
    ];
  }

  //initializes the select dropdown list
  initDropdownList() {

    var selectList: HTMLElement = document.getElementById("city-select");

    for (var i = 0; i < this.locationList.length; i++) {
      var option = document.createElement("option");
      option.value = this.locationList[i].name;
      option.text = this.locationList[i].name;
      selectList.appendChild(option);
    }
  }

  getLatLongString(cityName: string): string {

    for (var i = 0; i < this.locationList.length; i++) {
      if (this.locationList[i].name === cityName) {
        return "" + this.locationList[i].latitude + "," + this.locationList[i].longitude;
      }
    }
    return "0,0";
  }

  //get the weather forecast for the city selected in the dropdown menu
  getWeatherForecast() {

    //Get the value from the selected Element
    //Note: Have to cast TypeScript HTMLElements to HTMLInputElements in order to access their value
    var location = <HTMLInputElement>document.getElementById("city-select");


    //make the HTTP request for the selected city and store the response in the component
    this.setWeatherData(this.getLatLongString(location.value));

    //update the display with the forecast data
    this.getForecast();
  }

  getCelsiusTemperature(farenheit: number) {
    return (farenheit - 32) * (5 / 9);
  }

}
