import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public recipe: Recipe,
    private dialogRef: MatDialogRef<RecipeDetailsComponent>,
    private router: Router
  ) { }

  close() {
    this.dialogRef.close();
  }

  openFullDetails(event: Event) {
    event.stopPropagation(); // prevent click bubbling
    this.close(); // close modal first
    this.router.navigate(['/recipes', this.recipe.id]); // navigate to full page
  }
}