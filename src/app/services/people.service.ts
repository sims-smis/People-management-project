import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  // In a real app, this would be an API endpoint
  private apiUrl = 'api/people';
  
  // For demo purposes, we'll use in-memory data
  private peopleSubject = new BehaviorSubject<Person[]>([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '555-1234', department: 'Engineering', position: 'Software Developer', hireDate: new Date('2020-01-15') },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '555-5678', department: 'Marketing', position: 'Marketing Manager', hireDate: new Date('2019-06-10') },
    { id: 3, firstName: 'Michael', lastName: 'Johnson', email: 'michael.j@example.com', phone: '555-9012', department: 'HR', position: 'HR Specialist', hireDate: new Date('2021-03-22') },
    { id: 4, firstName: 'Emily', lastName: 'Williams', email: 'emily.w@example.com', phone: '555-3456', department: 'Finance', position: 'Financial Analyst', hireDate: new Date('2018-11-05') },
    { id: 5, firstName: 'David', lastName: 'Brown', email: 'david.b@example.com', phone: '555-7890', department: 'Engineering', position: 'QA Engineer', hireDate: new Date('2020-09-18') }
  ]);
  
  people$ = this.peopleSubject.asObservable();

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.people$;
  }

  getPerson(id: number): Observable<Person> {
    return this.people$.pipe(
      map(people => people.find(person => person.id === id)),
      map(person => person ? {...person} : null)
    );
  }

  addPerson(person: Person): Observable<Person> {
    const people = this.peopleSubject.getValue();
    const newId = Math.max(...people.map(p => p.id), 0) + 1;
    const newPerson = { ...person, id: newId };
    
    this.peopleSubject.next([...people, newPerson]);
    return of(newPerson);
  }

  updatePerson(person: Person): Observable<Person> {
    const people = this.peopleSubject.getValue();
    const index = people.findIndex(p => p.id === person.id);
    
    if (index !== -1) {
      const updatedPeople = [...people];
      updatedPeople[index] = { ...person };
      this.peopleSubject.next(updatedPeople);
      return of(updatedPeople[index]);
    }
    
    return of(null);
  }

  deletePerson(id: number): Observable<boolean> {
    const people = this.peopleSubject.getValue();
    const filteredPeople = people.filter(person => person.id !== id);
    
    if (filteredPeople.length !== people.length) {
      this.peopleSubject.next(filteredPeople);
      return of(true);
    }
    
    return of(false);
  }

  searchPeople(term: string): Observable<Person[]> {
    if (!term.trim()) {
      return this.getPeople();
    }
    
    term = term.toLowerCase();
    return this.people$.pipe(
      map(people => people.filter(person => 
        person.firstName.toLowerCase().includes(term) || 
        person.lastName.toLowerCase().includes(term) || 
        person.email.toLowerCase().includes(term) ||
        person.department.toLowerCase().includes(term) ||
        person.position.toLowerCase().includes(term)
      ))
    );
  }
}