import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = environment.apiBaseUrl;

  lastQuery = '';           // store last query
  lastResults: Recipe[] = [];  // store last results

  constructor(private http: HttpClient) {}

  getAll(query: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/search?query=${query}`);
  }

  getHighlighted(query: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/search-highlight?query=${query}`);
  }

  getById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }
}