import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // Observable to track the sidebar's open/closed state
  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpenSubject.asObservable();

  constructor() { }

  // Toggle the sidebar state
  toggleSidebar() {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  // Open the sidebar
  openSidebar() {
    this.sidebarOpenSubject.next(true);
  }

  // Close the sidebar
  closeSidebar() {
    this.sidebarOpenSubject.next(false);
  }
}
