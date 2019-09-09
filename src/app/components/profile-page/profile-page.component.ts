import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  locations;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getLocationInfo();
  }

  getLocationInfo() {
    this.http.get('assets/data/locations.json').subscribe(result => {
      this.locations = result;
    });
  }

}
