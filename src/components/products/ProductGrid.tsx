import { useProductStore } from '../../stores/productStore';
import { ProductCard } from './ProductCard';

export function ProductGrid() {
  const getFilteredProducts = useProductStore(state => state.getFilteredProducts);
  const products = getFilteredProducts();

  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
            inventory_2
          </span>
          <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
