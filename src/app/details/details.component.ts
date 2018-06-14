import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService} from '../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  //day 1
  day1Temp: number;
  day1State: string;
  day1Name: string;
  // day 2
  day2Temp: number;
  day2State: string;
  day2Name: string;
  //day 3 
  day3Temp: number;
  day3State: string;
  day3Name: string;

  // day 4
  day4Temp: number;
  day4State: string;
  day4Name: string;


  //day 5
  day5Temp: number;
  day5State: string;
  day5Name: string;

  hum: number;
  wind: any;
  temp: number;
  state: string;
  weather: string;
  city: string;
  today: string;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;

  constructor(
    public activateRouter: ActivatedRoute,
    public weatherService: WeatherService,
  ) { }

  ngOnInit() {
    const toadyNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[toadyNumberInWeek]
    this.activateRouter.paramMap.subscribe((route: any) => {

      this.city = route.params.city;
      this.sub1 = this.weatherService.getWeatherState(this.city).subscribe((state) => this.state = state);
      this.sub2 = this.weatherService.getCurrentTemp(this.city).subscribe((temperature) => this.temp = temperature);
      this.sub3 = this.weatherService.getCurrentHum(this.city).subscribe((humidity) => this.hum = humidity);
      this.sub4 = this.weatherService.getCurrentWind(this.city).subscribe((windSpeed) => this.wind = windSpeed);
      this.sub5 = this.weatherService.getForcaste(this.city).subscribe((data: any) => {
        console.log(data);

        for (let i = 0; i < data.length; i++) {
          const date = new Date(data[i].dt_txt).getDay()
          console.log(days[date]);
          if (((date === toadyNumberInWeek + 1) || (toadyNumberInWeek === 6 && date === 0)) && !this.day1Name) {
            this.day1Name = days[date];
            this.day1State = data[i].weather[0].main;
            this.day1Temp = Math.round(data[i].main.temp);

          } else if (!!this.day1Name && !this.day2Name && days[date] !== this.day1Name) {
            this.day2Name = days[date];
            this.day2State = data[i].weather[0].main;
            this.day2Temp = Math.round(data[i].main.temp);

          }
          else if (!!this.day2Name && !this.day3Name && days[date] !== this.day2Name) {
            this.day3Name = days[date];
            this.day3State = data[i].weather[0].main;
            this.day3Temp = Math.round(data[i].main.temp);

          } else if (!!this.day3Name && !this.day4Name && days[date] !== this.day3Name) {
            this.day4Name = days[date];
            this.day4State = data[i].weather[0].main;
            this.day4Temp = Math.round(data[i].main.temp);

          } else if (!!this.day4Name && !this.day5Name && days[date] !== this.day4Name) {
            this.day5Name = days[date];
            this.day5State = data[i].weather[0].main;
            this.day5Temp = Math.round(data[i].main.temp);


          }
        }
      });
    });
  }

  ngOnDestroy(){
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
  }

}


