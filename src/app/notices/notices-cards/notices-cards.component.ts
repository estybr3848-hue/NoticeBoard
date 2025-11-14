import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from "@angular/material/icon";
import { Notice } from '../../Models/notice.model';
import { NoticesService } from '../notices.service';
import { MatDialog } from '@angular/material/dialog';
import { NoticeType } from '../../Models/notice-type.model';
import { NewNoticeDialogComponent } from '../new-notice-dialog/new-notice-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { MatDividerModule } from "@angular/material/divider";
import { AuthService } from '../../auth/auth.service';

export enum DialogTypes {
  Edit = 1,
  Add = 2,
}

@Component({
  selector: 'app-notices-cards',
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './notices-cards.component.html',
  styleUrl: './notices-cards.component.scss'
})
export class NoticesCardsComponent {
  @Input() filteredNotices: Notice[] = [];
  @Input() types: NoticeType[] = [];
  @Input() personal: boolean = false;

  @Output() noticeChanged = new EventEmitter<Notice>();
  private destroy$ = new Subject<void>();

  constructor(private noticeService: NoticesService,
    private authService: AuthService,
    private dialog: MatDialog) { }

  onEdit(noticeId: number): void {
    const currentNotice = this.filteredNotices.find(n => n.id === noticeId);
    this.openNoticeDialog(currentNotice, DialogTypes.Edit);
  }

  onDelete(noticeId: number): void {
    this.noticeService.deleteNotice(noticeId).subscribe({
      next: () => {
        this.noticeChanged.emit();
      },
      error: err => console.error('שגיאה במחיקה', err)
    });
  }

  AddNotice(): void {
    const newNotice: Notice = {
      advertiser: this.authService.getUser(),
      id: 0,
      noticeName: '',
      noticeTitle: '',
      noticeContent: '',
      area: '',
      typeId: 0,
      type: new NoticeType(),
      advertiserId: this.authService.getUser().id
    }

    this.openNoticeDialog(newNotice, DialogTypes.Add);
  }

  openNoticeDialog(existingData?: Notice, source?: DialogTypes): void {
    const dialogRef = this.dialog.open(NewNoticeDialogComponent, {
      disableClose: true,
      data: existingData ?
        {
          notice: { ...existingData },
          source: source,
          typesList: this.types
        } : {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result.source === DialogTypes.Edit) {
          this.noticeService.updateNotice(result.notice as Notice).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: () => {
              this.noticeChanged.emit();
            },
            error: err => console.error('שגיאה בעדכון', err)

          });
        }
        else {
          this.noticeService.addNotice(result.notice as Notice).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: () => {
              this.noticeChanged.emit();
            },
            error: err => console.error('שגיאה ביצירת המודעה', err)

          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
