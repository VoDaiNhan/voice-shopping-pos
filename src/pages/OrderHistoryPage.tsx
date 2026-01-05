import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersData, orderStatusConfig, type OrderStatus, type OrderItem } from '../data/mockData';

export function OrderHistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate stats
  const pendingCount = ordersData.filter((o) => o.status === 'pending').length;
  const shippingCount = ordersData.filter((o) => o.status === 'shipping').length;
  const completedCount = ordersData.filter((o) => o.status === 'completed').length;
  const todayRevenue = ordersData
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

  // Filter orders
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery);
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const tabs: { key: OrderStatus | 'all'; label: string; count?: number }[] = [
    { key: 'pending', label: 'Chờ duyệt', count: pendingCount },
    { key: 'shipping', label: 'Đang giao', count: shippingCount },
    { key: 'completed', label: 'Hoàn tất' },
    { key: 'cancelled', label: 'Đã hủy' },
  ];

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Get display products (max 2 + "more" count)  
  const getDisplayProducts = (order: OrderItem) => {
    const display = order.products.slice(0, 2);
    const moreCount = order.products.length - 2;
    return { display, moreCount: moreCount > 0 ? moreCount : 0 };
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6 pb-10">
        {/* Header and Stats */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">Đơn Hàng Trực Tuyến</h1>
              <p className="text-text-secondary text-sm mt-1">{today}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-surface-light border border-border-light rounded-lg text-sm font-medium hover:bg-background-light transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                <span>Bộ lọc</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm shadow-green-200">
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                <span>Làm mới</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col p-5 rounded-xl bg-surface-light border border-border-light shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-text-secondary text-sm font-medium">Chờ duyệt</p>
                <span className="bg-yellow-100 text-yellow-700 p-1 rounded">
                  <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
                </span>
              </div>
              <p className="text-text-main text-2xl font-bold">{pendingCount}</p>
            </div>
            <div className="flex flex-col p-5 rounded-xl bg-surface-light border border-border-light shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-text-secondary text-sm font-medium">Đang giao</p>
                <span className="bg-blue-100 text-blue-700 p-1 rounded">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                </span>
              </div>
              <p className="text-text-main text-2xl font-bold">{shippingCount}</p>
            </div>
            <div className="flex flex-col p-5 rounded-xl bg-surface-light border border-border-light shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-text-secondary text-sm font-medium">Hoàn tất</p>
                <span className="bg-green-100 text-green-700 p-1 rounded">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                </span>
              </div>
              <p className="text-text-main text-2xl font-bold">{completedCount}</p>
            </div>
            <div className="flex flex-col p-5 rounded-xl bg-surface-light border border-border-light shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-text-secondary text-sm font-medium">Doanh thu hôm nay</p>
                <span className="bg-primary/20 text-primary p-1 rounded">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                </span>
              </div>
              <p className="text-text-main text-2xl font-bold">{todayRevenue.toLocaleString('vi-VN')}đ</p>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex w-full max-w-md items-center h-10 rounded-lg bg-surface-light border border-border-light focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <div className="pl-3 pr-2 text-text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            className="w-full bg-transparent border-none text-sm text-text-main placeholder-text-secondary focus:ring-0"
            placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-border-light">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 border-b-[3px] pb-3 px-1 transition-colors ${
                  activeTab === tab.key
                    ? 'border-b-primary text-text-main'
                    : 'border-b-transparent text-text-secondary hover:text-text-main'
                }`}
              >
                <p className={`text-sm whitespace-nowrap ${activeTab === tab.key ? 'font-bold' : 'font-medium'}`}>
                  {tab.label}
                  {tab.count !== undefined && ` (${tab.count})`}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => {
            const { display, moreCount } = getDisplayProducts(order);
            return (
              <div
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="flex flex-col bg-surface-light rounded-xl border border-border-light shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-200 cursor-pointer group"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-border-light flex justify-between items-start">
                  <div className="flex gap-3">
                    <div
                      className={`size-10 rounded-full ${order.customer.initialsBg} flex items-center justify-center ${order.customer.initialsColor} font-bold text-sm`}
                    >
                      {order.customer.initials}
                    </div>
                    <div>
                      <h3 className="text-text-main font-bold text-base">{order.customer.name}</h3>
                      <p className="text-xs text-text-secondary font-medium">#{order.id}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${orderStatusConfig[order.status].class}`}>
                    {orderStatusConfig[order.status].label}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span>{order.timeAgo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-main">
                    <span className="material-symbols-outlined text-[18px]">call</span>
                    <span>{order.customer.phone}</span>
                  </div>
                  <div className="mt-2 p-3 bg-background-light rounded-lg">
                    <p className="text-xs font-medium text-text-secondary mb-2 uppercase">Danh sách sản phẩm</p>
                    <ul className="text-sm text-text-main space-y-1">
                      {display.map((product, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{product.quantity}x {product.name}</span>
                        </li>
                      ))}
                      {moreCount > 0 && (
                        <li className="flex justify-between text-text-secondary text-xs pt-1">
                          <em>+ {moreCount} sản phẩm khác</em>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 border-t border-border-light mt-auto">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-sm text-text-secondary">Tổng tiền</span>
                    <span className="text-xl font-bold text-primary">{order.total.toLocaleString('vi-VN')}đ</span>
                  </div>
                  {order.status === 'pending' && (
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button className="flex-1 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors">
                        Từ chối
                      </button>
                      <button className="flex-1 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-sm shadow-green-200 hover:bg-primary-dark transition-colors">
                        Duyệt đơn
                      </button>
                    </div>
                  )}
                  {order.status === 'shipping' && (
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button className="flex-1 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-sm shadow-green-200 hover:bg-primary-dark transition-colors">
                        Hoàn tất
                      </button>
                    </div>
                  )}
                  {order.status === 'completed' && (
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button className="flex-1 py-2 rounded-lg border border-primary/30 bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                        In hóa đơn
                      </button>
                    </div>
                  )}
                  {order.status === 'cancelled' && (
                    <div className="text-center">
                      <span className="text-xs text-text-secondary">Click để xem chi tiết</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-text-secondary">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-30">inbox</span>
            <p className="text-lg font-medium">Không tìm thấy đơn hàng</p>
            <p className="text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}
