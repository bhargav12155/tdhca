import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit, OnDestroy {
  @Input() isOpen: boolean = true;
  private sidebarSubscription?: Subscription;
  
  constructor(private sidebarService: SidebarService) {}
  
  ngOnInit() {
    // Subscribe to sidebar state changes
    this.sidebarSubscription = this.sidebarService.sidebarOpen$.subscribe(
      isOpen => this.isOpen = isOpen
    );
  }
  
  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }
  
  // Method to close sidebar after navigation on mobile
  closeOnMobile() {
    if (window.innerWidth < 768) {
      this.sidebarService.closeSidebar();
    }
  }
}
