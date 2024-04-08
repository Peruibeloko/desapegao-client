type ProductQuality =
  | 'novo'
  | 'semiNovo'
  | 'usadoBoaCondicao'
  | 'usadoMarcasUso'
  | 'usadoFaltaPartes'
  | 'usadoQuebrado';

export interface Listing {
  productName: string;
  quality: ProductQuality;
  value: string;
  location: string;
  sellerName: string;
  sellerPhone: string;
}
