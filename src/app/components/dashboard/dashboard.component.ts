import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalPeople = 0;
  departmentStats: {name: string, count: number}[] = [];
  recentlyAddedPeople: Person[] = [];

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getPeople().subscribe(people => {
      this.totalPeople = people.length;
      this.recentlyAddedPeople = [...people]
        .sort((a, b) => b.id - a.id)
        .slice(0, 3);
      
      // Calculate department statistics
      const departments = {};
      people.forEach(person => {
        if (!departments[person.department]) {
          departments[person.department] = 0;
        }
        departments[person.department]++;
      });
      
      this.departmentStats = Object.keys(departments).map(name => ({
        name,
        count: departments[name]
      }));
    });
  }
}