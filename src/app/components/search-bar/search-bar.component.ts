import { Component, HostListener } from '@angular/core';
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
  selectedIndex = -1; // track highlighted recipe
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
    ).subscribe(data => {
      this.recipes = data;
      this.selectedIndex = -1; // reset selection after new search
    });
  }

  onSearchChange(value: string) {
    this.query = value.trim();

    if (!this.query || this.query.length < 3) {
      this.recipes = [];
      this.selectedIndex = -1;
    }

    this.searchSubject.next(this.query);
  }

  openDetails(recipe: Recipe) {
    this.dialog.open(RecipeDetailsComponent, {
      width: 'min(80vw, 720px)',
      panelClass: 'recipe-dialog',
      enterAnimationDuration: '180ms',
      exitAnimationDuration: '140ms',
      data: recipe
    });
  }

  /** 🔹 Handle keyboard navigation */
  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.recipes.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.recipes.length;
      this.scrollToSelected();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.recipes.length) % this.recipes.length;
      this.scrollToSelected();
    } else if (event.key === 'Enter' && this.selectedIndex >= 0) {
      event.preventDefault();
      this.openDetails(this.recipes[this.selectedIndex]);
    }
  }

  private scrollToSelected() {
    setTimeout(() => {
      const list = document.querySelector('.suggestions') as HTMLElement | null;
      const selected = document.querySelector('.suggestions li.selected') as HTMLElement | null;
      if (!list || !selected) return;

      const listRect = list.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();

      // Scroll down if the selected item is below the visible area
      if (selectedRect.bottom > listRect.bottom) {
        list.scrollTop += (selectedRect.bottom - listRect.bottom) + 4;
      }
      // Scroll up if the selected item is above the visible area
      else if (selectedRect.top < listRect.top) {
        list.scrollTop -= (listRect.top - selectedRect.top) + 4;
      }
    }, 0);
  }
  
}