import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NoticeType } from '../../Models/notice-type.model';
import { Advertiser } from '../../Models/advertiser.model';

@Component({
  selector: 'app-notices-filter',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule, 
    MatInputModule, 
    MatSelectModule],
  templateUrl: './notices-filter.component.html',
  styleUrl: './notices-filter.component.scss'
})
export class NoticesFilterComponent {
  @Input() types: NoticeType[] = [];
  @Input() advertisers: Advertiser[] = [];

  @Output() filterChanged = new EventEmitter<any>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      typeId: [''],
      advertiserId: [''],
      text: ['']
    });

    this.filterForm.valueChanges.subscribe(value => {
      this.filterChanged.emit(value);
    });
  }
}
