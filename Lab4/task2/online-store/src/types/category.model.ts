export interface Category {
  id: number;              
  name: string;
}

export type CategoryMapping = Record<string, Category>

export const CATEGORIES: CategoryMapping = {
    Smartphones: {id: 1, name: "Smartphones"},
    Laptops: {id: 2, name: "Laptops"},
    Headphones: {id: 3, name: "Headphones"},
    Computers: {id: 4, name: "Computers"}
}