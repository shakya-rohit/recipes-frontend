export interface Recipe {
  id: number;
  name: string;
  highlightedName: string;
  cuisine: string;
  highlightedCuisine: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  caloriesPerServing: number;
  servings: number;
  difficulty: string;
  rating: number;
  reviewCount: number;
  userId: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  mealType: string[];
}