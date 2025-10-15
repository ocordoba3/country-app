import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCode } from './by-code';

describe('ByCode', () => {
  let component: ByCode;
  let fixture: ComponentFixture<ByCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
