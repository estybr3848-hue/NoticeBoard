import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { IUserAuth } from '../../Models/advertiser.model';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-auth-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthDialogComponent implements OnDestroy {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const userAuth = this.loginForm.value as IUserAuth;
      this.authService.authUser(userAuth).pipe(
        catchError(err => {
          if (err.status === 404) {
            this.errorMessage = 'שם המשתמש או הסיסמה לא נכונים';
          } else {
            this.errorMessage = 'שגיאה בשרת, נסי שוב';
          }
          return of(null);
        }),
        takeUntil(this.destroy$)
      ).subscribe(res => {
        if (res) {
          this.dialogRef.close(res);
        }
      });
    }
  }

  guestLogin() {
    console.log('Guest login');
    this.dialogRef.close({ username: 'Guest' });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
