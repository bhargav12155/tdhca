import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatChipsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  // Sample data for application status
  applicationStatus = [
    { id: 'APP-2025-001', program: 'Rental Assistance', status: 'In Review', submitted: '2025-06-15', nextAction: 'Documentation Review' },
    { id: 'APP-2025-002', program: 'Homebuyer Assistance', status: 'Approved', submitted: '2025-05-22', nextAction: 'Funding Disbursement' },
    { id: 'APP-2025-003', program: 'Home Repair', status: 'Pending', submitted: '2025-06-28', nextAction: 'Submit Additional Documents' }
  ];
  
  // Sample data for notifications
  notifications = [
    { message: 'Your application APP-2025-001 requires additional documentation', date: '2025-06-30', read: false },
    { message: 'Application APP-2025-002 has been approved', date: '2025-06-25', read: true },
    { message: 'New housing program announced: Energy Efficiency Upgrade Assistance', date: '2025-06-20', read: false }
  ];
  
  // Display columns for the applications table
  displayedColumns: string[] = ['id', 'program', 'status', 'submitted', 'nextAction', 'actions'];
  
}
