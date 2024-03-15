import type p5 from 'p5';
import type { Listing } from '@/typings/Listing';

const getFormattedQuality = ({ quality }: Listing) => {
  return {
    novo: 'Novo',
    semiNovo: 'Semi-novo',
    usadoBoaCondicao: 'Usado (Boa condição)',
    usadoMarcasUso: 'Usado (Marcas de uso)',
    usadoFaltaPartes: 'Usado (Faltam partes/peças)',
    usadoQuebrado: 'Usado (Quebrado)'
  }[quality];
};

export default (getProduct: () => Listing, fontPath: string) => (p: p5) => {
  let img: p5.Image;
  let inter: p5.Font;

  p.preload = () => {
    const imgUrl = getProduct().productImage;
    img = p.loadImage(imgUrl ?? '');
    inter = p.loadFont(fontPath);
  };

  p.setup = () => {
    const SIZE = 286;
    const renderer = p.createCanvas(SIZE, SIZE);

    const cropSize = 40;
    const availableHeight = p.height - 2 * cropSize;

    p.background('#D9D9D9');

    // Draw text background
    p.noStroke();
    p.fill('#632682');
    p.rect(0, 0, p.width, cropSize);
    p.rect(0, p.height - cropSize, p.width, cropSize);

    // Draw text
    p.textAlign('center');
    p.textFont(inter);
    p.fill('#FFA100');

    const productData = getProduct();

    p.textSize(16);
    p.text(productData.productName, p.width / 2, cropSize / 2 - 5);

    p.textSize(14);
    p.text(
      `R$${productData.price.toFixed(2)} - ${getFormattedQuality(productData)} - ${productData.location}`,
      p.width / 2,
      cropSize - 5
    );

    p.fill(255);
    p.textSize(19);
    p.text(`${productData.sellerName} - ${productData.sellerPhone}`, p.width / 2, p.height - 19 / 2 - 3);

    // Draw product image
    const aspectRatioImg = img.width / img.height;
    const aspectRatioFrame = p.width / availableHeight;

    if (aspectRatioImg > aspectRatioFrame) {
      const x = 0;
      const width = p.width;
      const height = width / aspectRatioImg;
      const y = p.height / 2 - height / 2;
      p.image(img, x, y, width, height);
    } else {
      const y = cropSize;
      const height = availableHeight;
      const width = height * aspectRatioImg;
      const x = p.width / 2 - width / 2;
      p.image(img, x, y, width, height);
    }

    (renderer.elt as HTMLCanvasElement).toBlob(blob => {
      if (!blob) return;
    });
  };

  p.draw = () => {};
};
