import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Advertiser, IUserAuth } from '../Models/advertiser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uri: string = 'https://localhost:7182/api/Auth';
  private currentUser!: Advertiser;
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn$.asObservable();

  setUser(advertiser: Advertiser) {
    this.currentUser = advertiser;
    this.loggedIn$.next(true);
  }

  getUser() {
    return this.currentUser;
  }

  constructor(private http: HttpClient) { }

  authUser(userAuthDetails: IUserAuth): Observable<Advertiser> {
    return this.http.post<Advertiser>(`${this.uri}/AuthUser`, userAuthDetails);
  }

}
