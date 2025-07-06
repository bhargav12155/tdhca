import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SidebarService } from '../../../services/sidebar.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterDialog } from '../../dialogs/register-dialog/register-dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink,
    TranslateModule,
    MatDialogModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  constructor(
    private translate: TranslateService,
    private sidebarService: SidebarService,
    public dialog: MatDialog
  ) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }
}
