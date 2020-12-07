import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  workInfo: any = null;
  morningstar: any = null;
  notreDame: any = null;
  springLake: any = null;


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getWorkInfo();
  }

  getWorkInfo() {
    this.http.get('assets/data/work-info.json').subscribe(result => {
      this.workInfo = result;
      this.morningstar = result['Morningstar'];
      this.notreDame = result['University of Notre Dame'];
      this.springLake = result['Spring Lake Beach Patrol'];
    });
  }

}
