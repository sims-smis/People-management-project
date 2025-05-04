import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person } from '../models/person.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // Makes the service available app-wide without needing to register it in a module
})
export class PeopleService {
  private apiUrl = `${environment.apiUrl}/people`; // Base API endpoint for people-related operations

  constructor(private http: HttpClient) {}

  // Fetch list of all people
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch a single person by ID
  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new person
  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing person's details
  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/${person.id}`, person).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a person by ID
  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Search for people by a search term (e.g., name or email)
  searchPeople(term: string): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}?q=${term}`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors from all requests
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    // Client-side or network error
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } 
    // Backend returned an unsuccessful response code
    else {
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage); // Log error for debugging
    return throwError(errorMessage); // Pass error to component
  }
}
