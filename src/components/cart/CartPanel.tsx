import { useCartStore } from '../../stores/cartStore';
import { CartItem } from './CartItem';

export function CartPanel() {
  const items = useCartStore(state => state.items);
  const getSubtotal = useCartStore(state => state.getSubtotal);
  const getItemCount = useCartStore(state => state.getItemCount);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  return (
    <aside className="w-[380px] flex flex-col bg-surface-light border-l border-border-light shadow-xl z-10 shrink-0">
      {/* Order Type Tabs */}
      <div className="flex border-b border-border-light bg-gray-50">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border-b-2 border-primary text-primary font-semibold text-sm">
          <span className="material-symbols-outlined text-lg">point_of_sale</span>
          THU NGÂN
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-text-secondary hover:bg-white/50 font-medium text-sm transition-colors">
          <span className="material-symbols-outlined text-lg">takeout_dining</span>
          MANG VỀ
        </button>
      </div>
      
      {/* Order Status */}
      <div className="px-4 py-2 border-b border-border-light bg-gradient-to-r from-gray-50 to-white">
        <p className="text-xs text-text-secondary text-right">Chưa có đơn</p>
      </div>
      
      {/* Customer Info Section */}
      <div className="px-4 py-3 border-b border-border-light flex items-center gap-3 bg-amber-50/50">
        <div className="size-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
          <span className="material-symbols-outlined text-sm">person_off</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-text-main">KHÁCH HÀNG KHÔNG CUNG CẤP THÔNG TIN</p>
        </div>
        <button className="flex items-center gap-1 text-primary hover:text-primary-dark text-sm font-medium transition-colors">
          <span className="material-symbols-outlined text-lg">person_add</span>
          <span className="text-xs">(F4)</span>
        </button>
      </div>
      
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-text-secondary">
            <div className="size-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-red-300">shopping_cart</span>
            </div>
            <p className="text-base font-semibold text-text-main mb-1">Giỏ hàng trống</p>
            <p className="text-sm text-center px-4 mb-4">
              Chọn hàng hóa từ danh sách bên trái để thêm vào đơn hàng
            </p>
            <button className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium transition-colors">
              <span className="material-symbols-outlined text-lg">qr_code_scanner</span>
              Hoặc quét mã vạch để thêm nhanh
            </button>
          </div>
        ) : (
          items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))
        )}
      </div>
      
      {/* Footer: Totals & Checkout */}
      <div className="bg-surface-light border-t border-border-light p-4 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] z-20">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-secondary">Tạm tính ({itemCount} món)</span>
            <span className="font-semibold text-text-main">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-secondary">Giảm giá</span>
            <span className="font-semibold text-text-main">0đ</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
            <span className="text-base font-bold text-text-main">Tổng cộng</span>
            <span className="text-xl font-bold text-primary">{formatPrice(subtotal)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <button 
            className="col-span-1 flex items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-text-secondary transition-colors h-12"
            title="In hóa đơn"
          >
            <span className="material-symbols-outlined">print</span>
          </button>
          <button 
            className={`col-span-3 flex items-center justify-center gap-2 rounded-xl font-bold text-base transition-all h-12 ${
              items.length > 0 
                ? 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-green-200 active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={items.length === 0}
          >
            <span>Thanh toán</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
