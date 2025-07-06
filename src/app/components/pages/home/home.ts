import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  householdForm!: FormGroup;
  activeStep = 'personal-info';

  prefixes = ['Mr.', 'Mrs.', 'Ms.', 'Miss', 'Dr.', 'Prof.', 'Rev.'];
  suffixes = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'V', 'VI'];
  genders = ['Male', 'Female', 'Other'];
  phoneTypes = ['Mobile', 'Landline', 'Work'];
  states = [
    { name: 'Alabama', abbreviation: 'AL' }, { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' }, { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' }, { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' }, { name: 'Delaware', abbreviation: 'DE' },
    // ... add all other states
    { name: 'Texas', abbreviation: 'TX' },
  ];
  counties = ['Travis', 'Williamson', 'Harris', 'Dallas']; // Example counties

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.householdForm = this.fb.group({
      prefix: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      suffix: [''],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumbers: this.fb.array([this.createPhoneNumber()]),
      email: ['', [Validators.required, Validators.email]],
      mailingAddress: this.createAddressGroup(),
      sameAsMailing: [false],
      billingAddress: this.createAddressGroup()
    });

    // Sync billing address with mailing address if checkbox is checked
    this.householdForm.get('sameAsMailing')!.valueChanges.subscribe(checked => {
      if (checked) {
        this.householdForm.get('billingAddress')!.setValue(this.householdForm.get('mailingAddress')!.value);
        this.householdForm.get('billingAddress')!.disable();
      } else {
        this.householdForm.get('billingAddress')!.enable();
        this.householdForm.get('billingAddress')!.reset();
      }
    });
  }

  setActiveStep(step: string): void {
    this.activeStep = step;
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['TX', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      county: ['', Validators.required]
    });
  }

  get phoneNumbers(): FormArray {
    return this.householdForm.get('phoneNumbers') as FormArray;
  }

  createPhoneNumber(): FormGroup {
    return this.fb.group({
      phoneType: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      extension: [''],
      isPrimary: [false]
    });
  }

  addPhoneNumber(): void {
    this.phoneNumbers.push(this.createPhoneNumber());
  }

  removePhoneNumber(index: number): void {
    this.phoneNumbers.removeAt(index);
  }

  onSubmit(): void {
    if (this.householdForm.valid) {
      console.log('Form Submitted!', this.householdForm.value);
      this.setActiveStep('household-members');
    } else {
      console.log('Form is invalid');
      this.householdForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.householdForm.reset();
    this.phoneNumbers.clear();
    this.addPhoneNumber();
    this._snackBar.open('Action Cancelled', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
