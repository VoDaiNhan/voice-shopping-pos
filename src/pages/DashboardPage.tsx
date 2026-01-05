import { useCartStore } from '../stores/cartStore';
import { useProductStore } from '../stores/productStore';

// Sample order history data
const recentOrders = [
  { id: '#001', time: '10:30', total: 125000, items: 3 },
  { id: '#002', time: '11:15', total: 89000, items: 2 },
  { id: '#003', time: '12:00', total: 234000, items: 5 },
  { id: '#004', time: '13:45', total: 67000, items: 1 },
  { id: '#005', time: '14:20', total: 156000, items: 4 },
];

export function DashboardPage() {
  const products = useProductStore(state => state.products);
  const cartItems = useCartStore(state => state.items);

  const totalRevenue = 1250000;
  const totalOrders = 28;
  const averageOrder = Math.round(totalRevenue / totalOrders);

  const stats = [
    { 
      label: 'Doanh thu hôm nay', 
      value: `${totalRevenue.toLocaleString('vi-VN')}đ`, 
      icon: 'payments', 
      color: 'from-green-500 to-emerald-600',
      change: '+12%'
    },
    { 
      label: 'Đơn hàng', 
      value: totalOrders.toString(), 
      icon: 'receipt_long', 
      color: 'from-blue-500 to-indigo-600',
      change: '+5'
    },
    { 
      label: 'Trung bình/đơn', 
      value: `${averageOrder.toLocaleString('vi-VN')}đ`, 
      icon: 'analytics', 
      color: 'from-purple-500 to-pink-600',
      change: '+8%'
    },
    { 
      label: 'Sản phẩm', 
      value: products.length.toString(), 
      icon: 'inventory_2', 
      color: 'from-orange-500 to-red-600',
      change: '0'
    },
  ];

  const topProducts = [
    { name: 'Bánh mì Sandwich', sold: 45, revenue: 675000 },
    { name: 'Coca Cola 330ml', sold: 38, revenue: 380000 },
    { name: 'Sữa tươi Vinamilk 1L', sold: 25, revenue: 800000 },
    { name: 'Mì Hảo Hảo', sold: 22, revenue: 99000 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Tổng quan</h1>
          <p className="text-text-secondary">Chào buổi sáng! Đây là thống kê hôm nay.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-border-light shadow-sm">
          <span className="material-symbols-outlined text-text-secondary">calendar_today</span>
          <span className="text-sm font-medium text-text-main">
            {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-border-light hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`size-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-text-main">{stat.value}</p>
            <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-border-light">
          <div className="p-5 border-b border-border-light flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-main">Đơn hàng gần đây</h2>
            <button className="text-sm text-primary hover:underline">Xem tất cả</button>
          </div>
          <div className="divide-y divide-border-light">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-xl">receipt</span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-main">Đơn hàng {order.id}</p>
                    <p className="text-sm text-text-secondary">{order.items} sản phẩm • {order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{order.total.toLocaleString('vi-VN')}đ</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Hoàn thành</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-border-light">
          <div className="p-5 border-b border-border-light">
            <h2 className="text-lg font-semibold text-text-main">Bán chạy hôm nay</h2>
          </div>
          <div className="p-4 space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`size-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-600' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-50 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-main truncate">{product.name}</p>
                  <p className="text-xs text-text-secondary">{product.sold} đã bán</p>
                </div>
                <p className="text-sm font-semibold text-primary">{product.revenue.toLocaleString('vi-VN')}đ</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Cart Status */}
      {cartItems.length > 0 && (
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              </div>
              <div>
                <p className="font-semibold">Giỏ hàng đang xử lý</p>
                <p className="text-sm text-white/80">{cartItems.length} sản phẩm trong giỏ</p>
              </div>
            </div>
            <button 
              onClick={() => window.location.href = '/pos'}
              className="px-5 py-2.5 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Tiếp tục bán hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
