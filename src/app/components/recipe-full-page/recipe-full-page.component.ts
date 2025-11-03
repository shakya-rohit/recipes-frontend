import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-full-page',
  templateUrl: './recipe-full-page.component.html',
  styleUrls: ['./recipe-full-page.component.css']
})
export class RecipeFullPageComponent implements OnInit {
  recipe!: Recipe;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getById(+id).subscribe({
        next: (data) => {
          this.recipe = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load recipe', err);
          this.loading = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}