import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmFeatureComponent } from './mdm-feature.component';

describe('MdmFeatureComponent', () => {
  let component: MdmFeatureComponent;
  let fixture: ComponentFixture<MdmFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdmFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdmFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
