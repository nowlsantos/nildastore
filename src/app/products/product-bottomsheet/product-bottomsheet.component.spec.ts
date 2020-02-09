import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBottomsheetComponent } from './product-bottomsheet.component';

describe('ProductBottomsheetComponent', () => {
  let component: ProductBottomsheetComponent;
  let fixture: ComponentFixture<ProductBottomsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBottomsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
