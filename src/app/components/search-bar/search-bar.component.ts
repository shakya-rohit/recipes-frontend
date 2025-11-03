import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { of, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  query = '';
  recipes: Recipe[] = [];
  private searchSubject = new Subject<string>();

  constructor(private recipeService: RecipeService, private dialog: MatDialog) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (query.length >= 3) {
          return this.recipeService.getHighlighted(query);
        } else {
          return of([]); // clear results immediately
        }
      })
    ).subscribe(data => this.recipes = data);
  }

  onSearchChange(value: string) {
    this.query = value.trim();

    // ✅ Immediately clear results (before debounce delay)
    if (!this.query || this.query.length < 3) {
      this.recipes = [];
    }

    // ✅ Always emit value — pipeline decides if fetch or clear
    this.searchSubject.next(this.query);
  }

  openDetails(recipe: Recipe) {
    this.dialog.open(RecipeDetailsComponent, {
      width: 'min(80vw, 720px)',
      panelClass: 'recipe-dialog',      // used by the component CSS rules above
      enterAnimationDuration: '180ms',
      exitAnimationDuration: '140ms',
      data: recipe
    });
  }
}