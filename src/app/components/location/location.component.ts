import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  animations: [
    trigger('inOutAnimation', 
      [
        transition(':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('.65s ease-out', 
                    style({ height: '*', opacity: 1 }))
          ]
        ),
        transition(':leave', 
          [
            style({ height: '*', opacity: 1 }),
            animate('.65s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class LocationComponent implements OnInit {

  @Input() country: any;
  imageSource: string;
  iconSource: string;
  showDetails = false;
  overviewList = '';
  @ViewChild('headerIcon', {static: false}) headerIcon;

  constructor() { }

  ngOnInit() {
    this.imageSource = 'assets/images/countries/' + this.country.abbreviation + '.jpg';
    this.iconSource = 'assets/images/countries-icons/' + this.country.abbreviation + '.svg';
    if (!this.isUS()) {
      const locations = this.country.locations.map(x => x.location)
      this.overviewList = this.verbalizeList(locations);
    }
  }

  ngAfterViewInit() {
    this.headerIcon.nativeElement.style.backgroundImage = 'url(' + this.iconSource + ')';
  }

  verbalizeList(list) {
    let outstring = '';
    list.forEach((element, index) => {
      if (index < list.length-1) {
        outstring += element + ', ';
      } else {
        outstring += element;
      }
    });
    return outstring
  }

  isUS() {
    return this.country.abbreviation === 'US';
  }

  onDetailsButtonClick() {
    this.showDetails = !this.showDetails;
  }

}
