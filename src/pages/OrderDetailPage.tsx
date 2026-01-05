import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrderById, orderStatusConfig } from '../data/mockData';

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  // Get order data from centralized mock data
  const order = orderId ? getOrderById(orderId) : undefined;

  // If order not found, show error state
  if (!order) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-text-secondary mb-4">search_off</span>
          <h2 className="text-xl font-bold text-text-main mb-2">Không tìm thấy đơn hàng</h2>
          <p className="text-text-secondary mb-4">Đơn hàng #{orderId} không tồn tại trong hệ thống.</p>
          <button
            onClick={() => navigate('/orders')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = orderStatusConfig[order.status];

  const handleConfirmOrder = () => {
    alert(`Đã xác nhận đơn hàng #${order.id}`);
  };

  const handleCompleteOrder = () => {
    alert(`Đã hoàn thành đơn hàng #${order.id}`);
  };

  const handleCancelOrder = () => {
    if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      alert(`Đã hủy đơn hàng #${order.id}`);
      navigate('/orders');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link to="/" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary">
                <span className="material-symbols-outlined text-[18px] mr-1">home</span>
                Trang chủ
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-text-secondary text-[16px] mx-1">chevron_right</span>
                <Link to="/orders" className="text-sm font-medium text-text-secondary hover:text-primary">
                  Đơn hàng
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="material-symbols-outlined text-text-secondary text-[16px] mx-1">chevron_right</span>
                <span className="text-sm font-medium text-text-main">#{order.id}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">
                Chi tiết đơn hàng #{order.id}
              </h1>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusConfig.class}`}>
                <span className={`size-1.5 rounded-full ${statusConfig.dot} mr-1.5`}></span>
                {statusConfig.label}
              </span>
            </div>
            <p className="text-sm text-text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              Đặt lúc: {order.createdAt}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm font-medium text-text-main shadow-sm hover:bg-background-light transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] mr-2">print</span>
              In phiếu
            </button>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Products & Notes (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products List */}
            <div className="bg-surface-light rounded-xl shadow-sm border border-border-light overflow-hidden">
              <div className="px-6 py-4 border-b border-border-light flex justify-between items-center">
                <h2 className="text-lg font-bold text-text-main">Sản phẩm đã đặt</h2>
                <span className="text-sm text-text-secondary">{order.products.length} sản phẩm</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-background-light text-text-main">
                    <tr>
                      <th className="px-6 py-3 font-medium" scope="col">Sản phẩm</th>
                      <th className="px-6 py-3 font-medium text-right" scope="col">Đơn giá</th>
                      <th className="px-6 py-3 font-medium text-center" scope="col">SL</th>
                      <th className="px-6 py-3 font-medium text-right" scope="col">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {order.products.map((product, idx) => (
                      <tr key={idx} className="hover:bg-background-light/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="size-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                              <img
                                className="w-full h-full object-cover"
                                src={product.image}
                                alt={product.name}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-text-main">{product.name}</p>
                              <p className="text-xs text-text-secondary">SKU: {product.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-text-main">
                          {product.price.toLocaleString('vi-VN')}₫
                        </td>
                        <td className="px-6 py-4 text-center text-text-main">{product.quantity}</td>
                        <td className="px-6 py-4 text-right font-medium text-text-main">
                          {(product.price * product.quantity).toLocaleString('vi-VN')}₫
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Customer Notes */}
            {order.note && (
              <div className="bg-surface-light rounded-xl shadow-sm border border-border-light p-6">
                <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-secondary text-[20px]">sticky_note_2</span>
                  Ghi chú từ khách hàng
                </h3>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <p className="text-sm text-gray-800 italic">"{order.note}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Info & Actions (1/3 width) */}
          <div className="space-y-6">
            {/* Customer Info Card */}
            <div className="bg-surface-light rounded-xl shadow-sm border border-border-light p-6">
              <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 border-b border-border-light pb-2">
                Thông tin khách hàng
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-text-secondary">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-main">{order.customer.name}</p>
                    <p className="text-xs text-text-secondary">{order.customer.type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-text-secondary">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-main">{order.customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-text-secondary">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div>
                    <p className="text-sm text-text-main leading-relaxed">{order.customer.address}</p>
                    <div className="mt-2 h-24 w-full rounded-lg overflow-hidden relative bg-gray-200">
                      <img
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUQVHcVqFJZtax6zifqNENFG3YxCxQi8NK9ZPet5DYMtrMt_kzHYShdOMHDIWB_9VkQ03cTIF9zFirVPodiJS3KdfH21vsxAwHsB8Itm1y0kDBm2VEhx6h7bnTA1BJ8f13BApcOymY6J0pGxLgjI95cZtNzBAB2lDhkwvywUDeIvj3sZFeCzlKIWcgf67Onx_eIp6QmnzRw-2X715jTNK4ytG2qE-4z4lJOP11eQU59pIgxhce6Lw3eD-BP0c5fDAXnWDOsFzt_9Bf"
                        alt="Map location"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="material-symbols-outlined text-primary text-3xl drop-shadow-md">location_on</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-surface-light rounded-xl shadow-sm border border-border-light p-6">
              <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 border-b border-border-light pb-2">
                Thanh toán
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-text-main">
                  <span>Tạm tính</span>
                  <span>{order.subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between text-text-main">
                  <span>Phí giao hàng</span>
                  <span>{order.shippingFee.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Giảm giá</span>
                  <span>{order.discount.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="pt-3 mt-3 border-t border-border-light flex justify-between items-center">
                  <span className="font-bold text-text-main">Tổng cộng</span>
                  <span className="text-xl font-bold text-primary">{order.total.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="bg-green-50 rounded p-2 flex items-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">payments</span>
                  <span className="text-xs font-medium text-text-main">{order.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div className="flex flex-col gap-3">
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={handleConfirmOrder}
                    className="w-full rounded-lg bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 shadow-md transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">check_circle</span>
                    Xác nhận đơn
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleCompleteOrder}
                      className="rounded-lg bg-surface-light border border-border-light text-text-main font-medium py-2.5 px-4 shadow-sm hover:bg-background-light transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-primary">done_all</span>
                      Hoàn thành
                    </button>
                    <button
                      onClick={handleCancelOrder}
                      className="rounded-lg bg-surface-light border border-red-200 text-red-600 font-medium py-2.5 px-4 shadow-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">cancel</span>
                      Hủy đơn
                    </button>
                  </div>
                </>
              )}
              {order.status === 'shipping' && (
                <>
                  <button
                    onClick={handleCompleteOrder}
                    className="w-full rounded-lg bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 shadow-md transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">done_all</span>
                    Hoàn thành đơn
                  </button>
                  <button
                    onClick={handleCancelOrder}
                    className="w-full rounded-lg bg-surface-light border border-red-200 text-red-600 font-medium py-2.5 px-4 shadow-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">cancel</span>
                    Hủy đơn
                  </button>
                </>
              )}
              {(order.status === 'completed' || order.status === 'cancelled') && (
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full rounded-lg bg-surface-light border border-border-light text-text-main font-medium py-2.5 px-4 shadow-sm hover:bg-background-light transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  Quay lại danh sách
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
