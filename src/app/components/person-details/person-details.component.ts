import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  person: Person;
  isLoading = true;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PeopleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadPersonDetails(id);
    });
  }

  loadPersonDetails(id: number) {
    this.isLoading = true;
    this.peopleService.getPerson(id).subscribe(
      person => {
        this.person = person;
        this.isLoading = false;
      },
      error => {
        this.snackBar.open('Error loading person details', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.router.navigate(['/people']);
      }
    );
  }

  deletePerson() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '350px',
      data: { title: 'Delete Person', message: 'Are you sure you want to delete this person?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.peopleService.deletePerson(this.person.id).subscribe(
          success => {
            if (success) {
              this.snackBar.open('Person deleted successfully', 'Close', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
              });
              this.router.navigate(['/people']);
            } else {
              this.snackBar.open('Error deleting person', 'Close', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
              });
            }
          }
        );
      }
    });
  }
}