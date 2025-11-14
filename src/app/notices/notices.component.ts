import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NoticesService } from './notices.service';
import { Subject, takeUntil } from 'rxjs';
import { Notice } from '../Models/notice.model';
import { MatDialog } from '@angular/material/dialog';
import { Advertiser } from '../Models/advertiser.model';
import { NoticeType } from '../Models/notice-type.model';
import { NoticesCardsComponent } from './notices-cards/notices-cards.component';
import { NoticesFilterComponent } from './notices-filter/notices-filter.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-notices',
  imports: [NoticesCardsComponent,
            NoticesFilterComponent ],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.scss'
})
export class NoticesComponent implements OnInit, OnDestroy {
  @Input() personal: boolean = false;
  private destroy$ = new Subject<void>();

  allNotices!: Notice[];
  filteredNotices!: Notice[];
  typesList!: NoticeType[];
  advertisersList!: Advertiser[];

  constructor(private noticeService: NoticesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.noticeService.getAllNoticeData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      if (this.personal) {
        const onlyPersonalNotice = data.notices.filter(f=>f.advertiserId === this.authService.getUser().id)
        this.allNotices = onlyPersonalNotice;
        this.filteredNotices = onlyPersonalNotice;
      }
      else {
        this.allNotices = data.notices;
        this.filteredNotices = data.notices;
      }
    
      this.typesList = data.noticeTypes;
      this.advertisersList = data.advertisers;
    });
  }

  applyFilter(filter: any) {
    this.filteredNotices = this.allNotices.filter(n =>
      (!filter.typeId || n.typeId === filter.typeId) &&
      (!filter.advertiserId || n.advertiserId === filter.advertiserId) &&
      (!filter.text || n.noticeContent.includes(filter.text)
        || n.noticeTitle.includes(filter.text))
    );
  }

  handleNoticeChanged(): void {
    this.loadAllData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
