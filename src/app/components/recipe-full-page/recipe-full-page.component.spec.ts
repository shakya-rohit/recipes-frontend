import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFullPageComponent } from './recipe-full-page.component';

describe('RecipeFullPageComponent', () => {
  let component: RecipeFullPageComponent;
  let fixture: ComponentFixture<RecipeFullPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeFullPageComponent]
    });
    fixture = TestBed.createComponent(RecipeFullPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
