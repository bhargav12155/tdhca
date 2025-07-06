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
    MatDividerModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  householdForm!: FormGroup;
  // Explicitly initialize activeStep to ensure it's never undefined
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
    { name: 'Florida', abbreviation: 'FL' }, { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' }, { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' }, { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' }, { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' }, { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' }, { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' }, { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' }, { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' }, { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' }, { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' }, { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' }, { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' }, { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' }, { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' }, { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' }, { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' }, { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' }, { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' }, { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' }, { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' }, { name: 'Wyoming', abbreviation: 'WY' }
  ];
  counties = ['Travis', 'Harris', 'Dallas', 'Bexar'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('Home component initialized with activeStep:', this.activeStep);
    
    this.householdForm = this.fb.group({
      // Head of Household Information
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      prefix: [''],
      suffix: [''],
      dob: ['', Validators.required],
      gender: ['', Validators.required],

      // Contact Information
      phoneNumbers: this.fb.array([this.createPhoneNumber()]),
      email: ['', [Validators.required, Validators.email]],

      // Address Information
      mailingAddress: this.createAddressGroup(),
      billingAddress: this.createAddressGroup(),
      sameAsMailing: [false]
    });

    // Sync billing address with mailing address
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

  // Navigation method for switching between application steps
  setActiveStep(step: string): void {
    console.log('setActiveStep called with:', step);
    console.log('Current activeStep before change:', this.activeStep);
    this.activeStep = step;
    console.log('New activeStep after change:', this.activeStep);
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

  // Phone Numbers FormArray
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
      // After successful submission, navigate to the next step
      this.setActiveStep('household-members');
    } else {
      console.log('Form is invalid');
      this.householdForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.householdForm.reset();
    // Reset FormArray
    this.phoneNumbers.clear();
    this.addPhoneNumber();
  }
}
