import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { Notice } from '../../Models/notice.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoticesService } from '../notices.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { DialogTypes } from '../notices-cards/notices-cards.component';
import { NoticeType } from '../../Models/notice-type.model';


@Component({
  selector: 'app-new-notice-dialog',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './new-notice-dialog.component.html',
  styleUrl: './new-notice-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewNoticeDialogComponent {
  noticeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private noticeService: NoticesService,
    public dialogRef: MatDialogRef<NewNoticeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { notice: Notice, source: DialogTypes, typesList: NoticeType[] }
  ) { }

  ngOnInit(): void {
    this.noticeForm = this.fb.group({
      firstName: [{ value: this.data?.notice?.advertiser?.firstName || '', disabled: true }, Validators.required],
      lastName: [{ value: this.data?.notice?.advertiser?.lastName || '', disabled: true }, Validators.required],
      phoneNumber: [{ value: this.data?.notice?.advertiser?.phoneNumber || '', disabled: true }, Validators.required],
      email: [{ value: this.data?.notice?.advertiser?.email || '', disabled: true }, [Validators.required, Validators.email]],
      noticeTitle: [this.data?.notice?.noticeTitle || '', Validators.required],
      noticeContent: [this.data?.notice?.noticeContent || '', Validators.required],
      area: [this.data?.notice?.area || '', Validators.required],
      typeId: [this.data.notice?.typeId || null, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSave(): void {
    if (this.noticeForm.valid) {
      if (this.data.source === DialogTypes.Edit) {
        this.dialogRef.close({
          notice: { id: this.data?.notice?.id, ...this.noticeForm.value },
          source: this.data.source
        });
      }
      else {
        this.dialogRef.close({
          notice: {
            advertiser: this.data.notice.advertiser,
            advertiserId: this.data.notice.advertiserId,
            ...this.noticeForm.value
          },
          source: this.data.source
        });
      }

    }
  }
}
