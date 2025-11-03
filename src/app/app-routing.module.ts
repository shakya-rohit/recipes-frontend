import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RecipeFullPageComponent } from './components/recipe-full-page/recipe-full-page.component';

const routes: Routes = [
  { path: '', component: SearchBarComponent },
  { path: 'recipes/:id', component: RecipeFullPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }