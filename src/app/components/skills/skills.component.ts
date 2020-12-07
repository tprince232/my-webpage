import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skillsData: any = {};

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    Promise.all([
      this.http.get('assets/data/skills.json'),
      this.http.get('assets/data/skills-categories.json')
    ]).then((result: any) => {
      const skills = result[0];
      const categories = result[1];

      categories.forEach(category => {
        const group = this.skillsData[category.position] = {};

      })
    })
    
  }

}
