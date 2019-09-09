import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Input() country: any;
  imageSource: string;

  constructor() { }

  ngOnInit() {
    this.imageSource = 'assets/images/countries/' + this.country.abbreviation + '.jpg'
  }

}
