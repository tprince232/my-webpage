import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  locations;
  @ViewChild('bannerPic', {static: false}) bannerPic;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getLocationInfo();
  }

  ngAfterViewInit() {
    this.bannerPic.nativeElement.style.backgroundImage = 'url(assets/images/header.jpg)';
  }

  getLocationInfo() {
    this.http.get('assets/data/locations.json').subscribe(result => {
      this.locations = result;
    });
  }

}
