import type { Product } from '../../types';
import { useCartStore } from '../../stores/cartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };
  
  // Helper to get unit based on category
  const getUnit = () => {
    const name = product.name.toLowerCase();
    if (name.includes('lon') || name.includes('coca') || name.includes('pepsi')) return 'Lon';
    if (name.includes('chai') || name.includes('nước')) return 'Chai';
    if (name.includes('hộp') || name.includes('trứng')) return 'Hộp';
    if (name.includes('gói') || name.includes('mì')) return 'Gói';
    if (name.includes('túi') || name.includes('gạo')) return 'Túi';
    if (name.includes('lít') || name.includes('sữa') || name.includes('dầu')) return 'Lít';
    return 'Cái';
  };
  
  // Generate a fake barcode from SKU or ID
  const getBarcode = () => {
    if (product.sku) {
      return `893${product.id}${Math.random().toString().slice(2, 10)}`;
    }
    return `8934567${product.id.padStart(5, '0')}`;
  };
  
  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-xl border border-border-light hover:shadow-lg hover:border-primary cursor-pointer transition-all duration-200 overflow-hidden h-full"
      onClick={handleAddToCart}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-50 p-3">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url("${product.image}")` }}
        />
        
        {/* Quick Add Button (on hover) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="size-10 rounded-full bg-primary text-white shadow-lg flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
            <span className="material-symbols-outlined text-xl">add</span>
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-3 flex flex-col grow border-t border-border-light">
        {/* Product Name */}
        <h3 className="text-text-main text-sm font-semibold leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Price and Unit */}
        <div className="flex items-baseline gap-1 mb-2">
          <p className="text-primary text-base font-bold">{formatPrice(product.price)}</p>
          <span className="text-text-secondary text-xs">/ {getUnit()}</span>
        </div>
        
        {/* Barcode */}
        <div className="mt-auto flex items-center gap-1.5 text-text-secondary">
          <span className="material-symbols-outlined text-sm">barcode</span>
          <span className="text-xs font-mono">{getBarcode()}</span>
        </div>
      </div>
    </div>
  );
}
