import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  isEditMode = false;
  personId: number;
  pageTitle = 'Add New Person';
  
  departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Operations',
    'Customer Support',
    'Research & Development'
  ];

  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.createForm();
    
    // Check if we're in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.personId = +params['id'];
        this.pageTitle = 'Edit Person';
        this.loadPersonData();
      }
    });
  }

  createForm() {
    this.personForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\d{3}-\d{4}$|^\d{3}-\d{3}-\d{4}$/)]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      hireDate: [new Date(), Validators.required]
    });
  }

  loadPersonData() {
    this.peopleService.getPerson(this.personId).subscribe(person => {
      if (person) {
        this.personForm.patchValue({
          firstName: person.firstName,
          lastName: person.lastName,
          email: person.email,
          phone: person.phone,
          department: person.department,
          position: person.position,
          hireDate: new Date(person.hireDate)
        });
      } else {
        this.snackBar.open('Person not found', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.router.navigate(['/people']);
      }
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      const personData: Person = {
        ...this.personForm.value,
        id: this.isEditMode ? this.personId : null
      };

      if (this.isEditMode) {
        this.peopleService.updatePerson(personData).subscribe(
          updatedPerson => {
            this.snackBar.open('Person updated successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.router.navigate(['/people', updatedPerson.id]);
          },
          error => {
            this.snackBar.open('Error updating person', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        );
      } else {
        this.peopleService.addPerson(personData).subscribe(
          newPerson => {
            this.snackBar.open('Person added successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.router.navigate(['/people', newPerson.id]);
          },
          error => {
            this.snackBar.open('Error adding person', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        );
      }
    } else {
      this.markFormGroupTouched(this.personForm);
    }
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Convenience getter for form fields
  get f() { return this.personForm.controls; }
}