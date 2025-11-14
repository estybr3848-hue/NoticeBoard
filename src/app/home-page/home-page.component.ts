import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NoticesComponent } from '../notices/notices.component';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    HeaderComponent,
    NoticesComponent,
    MatIcon,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  personalAreaView: boolean = false;
  isRegisteredUser: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isRegisteredUser = !!this.authService.getUser().id;
  }
}
