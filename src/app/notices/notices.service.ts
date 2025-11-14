import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notice } from '../Models/notice.model';
import { Observable } from 'rxjs';
import { noticesData } from '../Models/notices-data.model';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {
  private uri = 'https://localhost:7182/api/NoticeBoard';

  constructor(private http: HttpClient) { }

  getAllNoticeData(): Observable<noticesData> {
    return this.http.get<noticesData>(`${this.uri}/GetAllNoticeData`);
  }

  addNotice(notice: Notice): Observable<any>  {
    return this.http.post<any>(`${this.uri}/AddNotice/`, notice);
  }

  updateNotice(notice: Notice): Observable<any>  {
    return this.http.put<any>(`${this.uri}/UpdateNotice/ ${notice.id}`, notice);
  }

  deleteNotice(noticeId: number): Observable<any>  {
    return this.http.delete<any>(`${this.uri}/DeleteNotice/${noticeId}`)
  }
}
