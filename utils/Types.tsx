export interface Product {
  _id: string;
  imageUrls: string[]; // URLs after resolving storage IDs
  title: string;
  category: string;
  description: string;
  size: string;
  condition: string;
  price: number;
  approved: boolean;
  brand?: string;
  fabrics?: string;
  highlights?: string;
  userId: string;
  images: string[]; // URLs after resolving storage IDs
  //Add more fields: Sold
  sold: boolean;
}
