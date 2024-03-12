import { z } from 'zod';

const Listing = z.object({
  productImage: z.string(),
  productName: z.string(),
  quality: z.enum(['novo', 'semiNovo', 'usadoBoaCondicao', 'usadoMarcasUso', 'usadoFaltaPartes', 'usadoQuebrado']),
  value: z.number(),
  location: z.string(),
  sellerName: z.string(),
  sellerPhone: z.string()
});

export default Listing