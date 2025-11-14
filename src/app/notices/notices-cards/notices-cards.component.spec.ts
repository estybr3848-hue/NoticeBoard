import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesCardsComponent } from './notices-cards.component';

describe('NoticesCardsComponent', () => {
  let component: NoticesCardsComponent;
  let fixture: ComponentFixture<NoticesCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticesCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
