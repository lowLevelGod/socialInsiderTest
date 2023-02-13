import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendRequestsComponent } from './backend-requests.component';

describe('BackendRequestsComponent', () => {
  let component: BackendRequestsComponent;
  let fixture: ComponentFixture<BackendRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
