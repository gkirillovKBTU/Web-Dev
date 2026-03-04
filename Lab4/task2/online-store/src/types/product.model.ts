export interface ProductType {
  id: number;              
  name: string;            
  description: string;     
  price: number;           
  rating: number;          
  image: string;           
  images: [string, string, string, ...string[]]; 
  link: string;
  categoryId: number;
  likes: number;
}

export type CarouselImage = {
  url: string;
  alternativeName: string;
}