import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSucceededComponent } from './sign-up-succeeded.component';

describe('SignUpSucceededComponent', () => {
  let component: SignUpSucceededComponent;
  let fixture: ComponentFixture<SignUpSucceededComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpSucceededComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpSucceededComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
