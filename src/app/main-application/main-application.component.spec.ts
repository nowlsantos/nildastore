
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainApplicationComponent } from './main-application.component';

describe('MainApplicationComponent', () => {
  let component: MainApplicationComponent;
  let fixture: ComponentFixture<MainApplicationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [MainApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
