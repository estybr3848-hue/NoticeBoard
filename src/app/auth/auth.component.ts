import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { AuthService } from './auth.service';
import { Advertiser } from '../Models/advertiser.model';


@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((userResult: Advertiser) => {
      this.authService.setUser(userResult);
    });
  }

}
