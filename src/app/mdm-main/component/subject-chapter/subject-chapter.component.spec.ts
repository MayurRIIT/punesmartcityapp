import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectChapterComponent } from './subject-chapter.component';

describe('SubjectChapterComponent', () => {
  let component: SubjectChapterComponent;
  let fixture: ComponentFixture<SubjectChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectChapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
