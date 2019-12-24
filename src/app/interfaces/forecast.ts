export interface Forecast {
    location: string;
    date: number;
    month: number;
    year: number;
    summary: string;
    icon: string;
    precipProbability: number;
    temperature: number;
    temperatureHigh: number;
    temperatureLow: number;
    humidity: number;

}