import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs'; 

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  groups: Group[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    forkJoin([
      this.http.get('assets/data/skills.json'),
      this.http.get('assets/data/skills-categories.json')
    ]).subscribe((result: any) => {
      const skills = result[0];
      const categories = result[1];

      this.groups = categories.filter(x => x.active === true);
      this.groups.forEach(group => {
        group.skills = skills.filter(skill => 
          skill.show === true && group.tags.includes(skill.tag)
        ).sort((x, y) => y.level - x.level);
      })
    })
    
  }
}

class Group {
  label: string;
  tags: string[];
  image: string;
  position: number;
  active: boolean;
  skills: any[];
}
