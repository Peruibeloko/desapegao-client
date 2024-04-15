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

export default (getListing: () => Listing, getImage: () => string, setImage: (img: string) => void) => (p: p5) => {
  let img: p5.Image;

  const getFontSize = ([hBound, vBound]: [number, number], text: string) => {
    p.textSize(vBound);
    const w = p.textWidth(text);
    const h = p.textAscent() + p.textDescent();

    switch (true) {
      case w > hBound:
        return p.textSize() * (hBound / w);
      case h > vBound:
        return p.textSize() * (vBound / h);
      case vBound > hBound:
        return p.textSize() / (hBound / w);
      default:
        return vBound;
    }
  };

  p.preload = () => {
    const imgData = getImage();
    img = p.loadImage(imgData ?? '');
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

    // Font
    p.textFont('Inter');
    p.textStyle('bold');

    // Product name
    const listing = getListing();

    p.textAlign('center', 'bottom');
    p.fill('#FFA100');
    p.textSize(getFontSize([p.width * 0.9, cropSize / 2], listing.productName));
    p.text(listing.productName, p.width / 2, cropSize / 2 + 5);

    const formattedPrice = Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(
      +listing.value
    );
    // Product info
    const productDataString = `${formattedPrice} - ${getFormattedQuality(listing)} - ${listing.location}`;

    p.textAlign('center', 'top');
    p.textSize(getFontSize([p.width * 0.8, cropSize / 2], productDataString));
    p.text(productDataString, p.width / 2, cropSize / 2 + 5);

    // Seller info
    const sellerInfoString = `${listing.sellerName} - ${listing.sellerPhone}`;

    p.fill(255);
    p.textAlign('center', 'center');
    p.textSize(getFontSize([p.width * 0.9, cropSize], sellerInfoString));
    p.text(sellerInfoString, p.width / 2, p.height - cropSize / 2);

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

    const imgData = (renderer.elt as HTMLCanvasElement).toDataURL();
    setImage(imgData);
  };

  p.draw = () => {};
};
