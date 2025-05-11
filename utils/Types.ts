export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  imageUrls: string[];
  category: string;
  seller: string;
  createdAt: string;
  updatedAt: string;
}

export interface InitiatePayment {
  amount: number;
  currency: string;
  items: Product[];
  success_url: string;
  failure_url: string;
}
