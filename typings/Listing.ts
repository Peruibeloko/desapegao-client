import { z } from 'zod';

const ListingSchema = z.object({
  productImage: z.string(),
  productName: z.string(),
  quality: z.enum(['novo', 'semiNovo', 'usadoBoaCondicao', 'usadoMarcasUso', 'usadoFaltaPartes', 'usadoQuebrado']),
  value: z.string().regex(/^\d+$/),
  location: z.string(),
  sellerName: z.string(),
  sellerPhone: z.string().length(11).regex(/^\d+$/)
});

export type Listing = z.infer<typeof ListingSchema>;
export type ProvidedListing = {
  listing: Ref<Listing>;
  updateListing: (k: keyof Listing, v: Listing[typeof k]) => void;
  setListing: (v: Listing) => void
};
export default ListingSchema;
