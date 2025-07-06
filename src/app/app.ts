import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Sidebar } from './components/layout/sidebar/sidebar';
import { SidebarService } from './services/sidebar.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Sidebar, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit, OnDestroy {
  protected title = 'TDHCA';
  isSidebarOpen: boolean = false;
  private sidebarSubscription!: Subscription;

  constructor(
    private translate: TranslateService,
    private sidebarService: SidebarService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    // Subscribe to sidebar state changes
    this.sidebarSubscription = this.sidebarService.sidebarOpen$.subscribe(
      (isOpen) => (this.isSidebarOpen = isOpen)
    );
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }
}
