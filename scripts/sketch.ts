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

const getFontSize = (width: number, textLength: number) => {
  const scaleFactor = 1.7; // relative to the font's aspect ratio, set to taste
  return (width / textLength) * scaleFactor;
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
    const SIZE = 500;
    const renderer = p.createCanvas(SIZE, SIZE);

    const cropSize = 70;
    const availableHeight = p.height - 2 * cropSize;

    p.background('#D9D9D9');

    // Draw text background
    p.noStroke();
    p.fill('#632682');
    p.rect(0, 0, p.width, cropSize);
    p.rect(0, p.height - cropSize, p.width, cropSize);

    // Draw text
    p.textAlign('center', 'center');
    p.textFont(inter);
    p.fill('#FFA100');

    const productData = getProduct();

    p.textSize(getFontSize(p.width * 0.8, productData.productName.length));
    p.text(productData.productName, p.width / 2, cropSize / 2 - p.textSize() / 2);

    const productDataString = `R$${productData.price.toFixed(2)} - ${getFormattedQuality(productData)} - ${
      productData.location
    }`;

    p.textSize(getFontSize(p.width * 0.6, productDataString.length));
    p.text(productDataString, p.width / 2, cropSize - p.textSize());

    const sellerInfoString = `${productData.sellerName} - ${productData.sellerPhone}`;

    p.fill(255);
    p.textSize(getFontSize(p.width * 0.8, sellerInfoString.length));
    p.text(sellerInfoString, p.width / 2, p.height - cropSize / 2 - 5);

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
