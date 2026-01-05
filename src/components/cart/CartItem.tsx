import { useCartStore } from '../../stores/cartStore';
import type { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const handleIncrement = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    } else {
      removeItem(item.product.id);
    }
  };

  return (
    <div className="flex gap-3 group">
      {/* Product Image */}
      <div 
        className="size-16 rounded-lg bg-gray-100 bg-center bg-cover shrink-0"
        style={{ backgroundImage: `url("${item.product.image}")` }}
      />
      
      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-semibold text-text-main line-clamp-2">
            {item.product.name}
          </h4>
          <button 
            onClick={() => removeItem(item.product.id)}
            className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
        
        <div className="flex items-end justify-between mt-1">
          <div className="text-primary font-bold text-sm">
            {formatPrice(item.product.price * item.quantity)}
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center bg-background-light rounded-lg border border-border-light h-8">
            <button 
              onClick={handleDecrement}
              className="w-8 h-full flex items-center justify-center hover:bg-gray-200 rounded-l-lg transition-colors text-text-secondary"
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <input 
              type="text" 
              value={item.quantity}
              readOnly
              className="w-10 h-full text-center bg-transparent border-none p-0 text-sm font-semibold text-text-main focus:ring-0"
            />
            <button 
              onClick={handleIncrement}
              className="w-8 h-full flex items-center justify-center hover:bg-gray-200 rounded-r-lg transition-colors text-primary"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
