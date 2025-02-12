import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaleEntryComponent } from './new-sale-entry.component';

describe('NewSaleEntryComponent', () => {
  let component: NewSaleEntryComponent;
  let fixture: ComponentFixture<NewSaleEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewSaleEntryComponent]
    });
    fixture = TestBed.createComponent(NewSaleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
