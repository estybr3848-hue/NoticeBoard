import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesFilterComponent } from './notices-filter.component';

describe('NoticesFilterComponent', () => {
  let component: NoticesFilterComponent;
  let fixture: ComponentFixture<NoticesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticesFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
