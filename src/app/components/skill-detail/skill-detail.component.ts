import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss']
})
export class SkillDetailComponent implements OnInit {

  resourcePath: string = 'assets/images/icons/skills/'
  @Input() skill;

  constructor() { }

  ngOnInit() {
  }

}
