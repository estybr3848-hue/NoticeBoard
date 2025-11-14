import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNoticeDialogComponent } from './new-notice-dialog.component';

describe('NewNoticeComponent', () => {
  let component: NewNoticeDialogComponent;
  let fixture: ComponentFixture<NewNoticeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewNoticeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewNoticeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
