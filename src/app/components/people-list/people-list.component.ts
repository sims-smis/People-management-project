import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'position', 'actions'];
  dataSource: MatTableDataSource<Person>;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private peopleService: PeopleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.peopleService.getPeople().subscribe(people => {
      this.dataSource = new MatTableDataSource(people);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      // Custom filter predicate for better searching
      this.dataSource.filterPredicate = (data: Person, filter: string) => {
        const searchStr = (data.firstName + ' ' + data.lastName + ' ' + 
                          data.email + ' ' + data.department + ' ' + 
                          data.position).toLowerCase();
        return searchStr.indexOf(filter.toLowerCase()) !== -1;
      };
    });
  }

  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.applyFilter();
  }

  deletePerson(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '350px',
      data: { title: 'Delete Person', message: 'Are you sure you want to delete this person?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.peopleService.deletePerson(id).subscribe(success => {
          if (success) {
            this.snackBar.open('Person deleted successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.loadPeople();
          } else {
            this.snackBar.open('Error deleting person', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        });
      }
    });
  }

  getFullName(person: Person): string {
    return `${person.firstName} ${person.lastName}`;
  }
}