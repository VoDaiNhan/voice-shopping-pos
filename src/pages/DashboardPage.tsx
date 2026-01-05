import { useNavigate } from 'react-router-dom';
import {
  statsCards,
  recentOrders,
  bestSellingProducts,
  lowStockProducts,
  recentActivities,
} from '../data/mockData';


function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    completed: 'bg-green-100 text-green-800',
    shipping: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  const labels: Record<string, string> = {
    completed: 'Hoàn thành',
    shipping: 'Đang giao',
    pending: 'Chờ xử lý',
    cancelled: 'Đã hủy',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function getTrendStyle(type: string) {
  switch (type) {
    case 'up':
      return { icon: 'trending_up', color: 'text-green-600' };
    case 'down':
      return { icon: 'trending_down', color: 'text-red-500' };
    case 'warning':
      return { icon: 'warning', color: 'text-orange-500' };
    default:
      return { icon: 'remove', color: 'text-gray-500' };
  }
}

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 pb-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-text-main tracking-tight">Xin chào, Admin! 👋</h3>
            <p className="text-text-secondary mt-1">Dưới đây là tình hình kinh doanh hôm nay của bạn.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => navigate('/pos')}
              className="flex-1 md:flex-none h-11 px-5 bg-primary hover:bg-primary-dark text-primary-content font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm shadow-green-500/20 whitespace-nowrap"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Tạo đơn hàng mới</span>
            </button>
            <button className="flex-1 md:flex-none h-11 px-5 bg-surface-light border border-border-light hover:bg-background-light text-text-main font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors whitespace-nowrap">
              <span className="material-symbols-outlined">qr_code_scanner</span>
              <span>Quét mã vạch</span>
            </button>
            <button className="flex-1 md:flex-none h-11 px-5 bg-surface-light border border-border-light hover:bg-background-light text-text-main font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors whitespace-nowrap">
              <span className="material-symbols-outlined">tune</span>
              <span>Tùy chỉnh</span>
            </button>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => {
            const trendStyle = getTrendStyle(stat.trendType);
            return (
              <div
                key={index}
                className="bg-surface-light p-5 rounded-xl border border-border-light shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group"
              >
                <div className={`absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.iconColor}`}>
                  <span className="material-symbols-outlined text-6xl">{stat.icon}</span>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
                  <p className="text-2xl font-bold text-text-main mt-1">{stat.value}</p>
                </div>
                <div className={`relative z-10 flex items-center gap-1 text-sm font-medium ${trendStyle.color}`}>
                  <span className="material-symbols-outlined text-base">{trendStyle.icon}</span>
                  <span>{stat.trend}</span>
                </div>
              </div>
            );
          })}
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Table */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Weekly Revenue Chart */}
            <div className="bg-surface-light rounded-xl border border-border-light shadow-sm p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-text-main">Doanh thu tuần này</h3>
                  <p className="text-sm text-text-secondary">
                    Tổng thu: <span className="font-semibold text-text-main">35.400.000 ₫</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-background-light rounded-lg text-text-secondary transition-colors" title="Xuất dữ liệu">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                  <select className="bg-background-light border-none text-sm rounded-lg py-2 pl-3 pr-8 focus:ring-1 focus:ring-primary text-text-secondary">
                    <option>7 ngày qua</option>
                    <option>Tháng này</option>
                    <option>Tháng trước</option>
                  </select>
                </div>
              </div>
              <div className="flex-1 min-h-[250px] w-full relative pt-4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 700 280" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#19e65e" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#19e65e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  <line stroke="#e5e7eb" strokeDasharray="4 4" x1="0" x2="700" y1="0" y2="0" />
                  <line stroke="#e5e7eb" strokeDasharray="4 4" x1="0" x2="700" y1="50" y2="50" />
                  <line stroke="#e5e7eb" strokeDasharray="4 4" x1="0" x2="700" y1="100" y2="100" />
                  <line stroke="#e5e7eb" strokeDasharray="4 4" x1="0" x2="700" y1="150" y2="150" />
                  <line stroke="#e5e7eb" x1="0" x2="700" y1="200" y2="200" />
                  {/* Area fill - adjusted x positions to match label centers */}
                  <path
                    d="M0,160 C25,155 50,130 100,130 C150,130 175,150 200,140 C225,130 275,70 300,70 C325,70 375,100 400,90 C425,80 475,40 500,50 C525,60 575,110 600,105 C625,100 675,30 700,40 V200 H0 Z"
                    fill="url(#chartGradient)"
                  />
                  {/* Line */}
                  <path
                    d="M0,160 C25,155 50,130 100,130 C150,130 175,150 200,140 C225,130 275,70 300,70 C325,70 375,100 400,90 C425,80 475,40 500,50 C525,60 575,110 600,105 C625,100 675,30 700,40"
                    fill="none"
                    stroke="#19e65e"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  {/* Data points - positioned at T2(0), T3(100), T4(200), T5(300), T6(400), T7(500), CN(600-700) */}
                  <circle cx="100" cy="130" fill="#ffffff" r="5" stroke="#19e65e" strokeWidth="2" />
                  <circle cx="300" cy="70" fill="#ffffff" r="5" stroke="#19e65e" strokeWidth="2" />
                  <circle cx="500" cy="50" fill="#ffffff" r="5" stroke="#19e65e" strokeWidth="2" />
                  <circle cx="700" cy="40" fill="#ffffff" r="5" stroke="#19e65e" strokeWidth="2" />
                  {/* Day labels - centered below */}
                  <text x="0" y="230" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">T2</text>
                  <text x="116" y="230" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">T3</text>
                  <text x="233" y="230" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">T4</text>
                  <text x="350" y="230" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">T5</text>
                  <text x="466" y="230" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">T6</text>
                  <text x="583" y="230" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">T7</text>
                  <text x="700" y="230" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">CN</text>
                </svg>
              </div>
            </div>

            {/* 6-Month Performance Chart */}
            <div className="bg-surface-light rounded-xl border border-border-light shadow-sm p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-text-main">Hiệu suất kinh doanh (6 tháng)</h3>
                  <p className="text-sm text-text-secondary">So sánh doanh thu theo tháng</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full">
                    <span className="material-symbols-outlined text-green-600 text-sm">trending_up</span>
                    <span className="text-xs font-bold text-green-700">+24.5%</span>
                  </div>
                  <button className="p-1.5 hover:bg-background-light rounded-lg text-text-secondary transition-colors" title="Xuất dữ liệu">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                  <button className="p-1.5 hover:bg-background-light rounded-lg text-text-secondary transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full relative pt-2">
                <svg className="w-full h-full min-h-[200px] overflow-visible" viewBox="0 0 720 230" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  <line stroke="#e5e7eb" strokeWidth="1" x1="30" x2="690" y1="160" y2="160" />
                  <line stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth="1" x1="30" x2="690" y1="120" y2="120" />
                  <line stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth="1" x1="30" x2="690" y1="80" y2="80" />
                  <line stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth="1" x1="30" x2="690" y1="40" y2="40" />
                  <line stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth="1" x1="30" x2="690" y1="0" y2="0" />
                  {/* Bars - centered at 80, 190, 300, 410, 520, 630 */}
                  <rect className="fill-primary/60 hover:fill-primary transition-colors cursor-pointer" height="80" rx="4" width="60" x="50" y="80" />
                  <rect className="fill-primary/60 hover:fill-primary transition-colors cursor-pointer" height="96" rx="4" width="60" x="160" y="64" />
                  <rect className="fill-primary/60 hover:fill-primary transition-colors cursor-pointer" height="72" rx="4" width="60" x="270" y="88" />
                  <rect className="fill-primary/60 hover:fill-primary transition-colors cursor-pointer" height="128" rx="4" width="60" x="380" y="32" />
                  <rect className="fill-primary/60 hover:fill-primary transition-colors cursor-pointer" height="112" rx="4" width="60" x="490" y="48" />
                  <rect className="fill-primary hover:fill-primary-dark transition-colors cursor-pointer" height="144" rx="4" width="60" x="600" y="16" />
                  {/* Month labels - centered under each bar */}
                  <text x="80" y="190" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">Tháng 5</text>
                  <text x="190" y="190" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">Tháng 6</text>
                  <text x="300" y="190" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">Tháng 7</text>
                  <text x="410" y="190" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">Tháng 8</text>
                  <text x="520" y="190" textAnchor="middle" className="fill-text-secondary text-xs font-semibold">Tháng 9</text>
                  <text x="630" y="190" textAnchor="middle" className="fill-primary text-xs font-bold">Tháng 10</text>
                </svg>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-surface-light rounded-xl border border-border-light shadow-sm flex flex-col overflow-hidden">
              <div className="p-6 border-b border-border-light flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-main">Đơn hàng mới nhất</h3>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-main transition-colors" title="Xuất dữ liệu">
                    <span className="material-symbols-outlined text-lg">download</span>
                    <span className="hidden sm:inline">Xuất CSV</span>
                  </button>
                  <button onClick={() => navigate('/orders')} className="text-sm text-primary font-semibold hover:underline">
                    Xem tất cả
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-background-light">
                    <tr>
                      <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Mã đơn</th>
                      <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Khách hàng</th>
                      <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Trạng thái</th>
                      <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-background-light transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-text-main">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary">{order.customer}</td>
                        <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                        <td className="px-6 py-4 text-sm font-bold text-text-main text-right">{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Side Panels */}
          <div className="flex flex-col gap-6">
            {/* Best Selling Products */}
            <div className="bg-surface-light rounded-xl border border-border-light shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border-light flex items-center justify-between">
                <h3 className="font-bold text-text-main">Sản phẩm bán chạy</h3>
                <div className="flex items-center gap-3">
                  <button className="text-text-secondary hover:text-text-main transition-colors" title="Xuất dữ liệu">
                    <span className="material-symbols-outlined text-xl">download</span>
                  </button>
                  <button onClick={() => navigate('/products')} className="text-xs text-primary font-semibold hover:underline">
                    Xem tất cả
                  </button>
                </div>
              </div>
              <div className="p-0">
                <div className="flex flex-col">
                  {bestSellingProducts.map((product, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 hover:bg-background-light transition-colors ${
                        index !== bestSellingProducts.length - 1 ? 'border-b border-border-light/50' : ''
                      }`}
                    >
                      <div
                        className="size-12 rounded-lg bg-background-light bg-cover bg-center flex-none"
                        style={{ backgroundImage: `url("${product.image}")` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-main truncate">{product.name}</p>
                        <p className="text-xs text-text-secondary">{product.stock} tồn kho</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-text-main">{product.revenue}</p>
                        <p className="text-xs text-text-secondary">{product.sold} đã bán</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Low Stock Products */}
            <div className="bg-surface-light rounded-xl border border-border-light shadow-sm overflow-hidden flex-1">
              <div className="p-4 border-b border-border-light flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500">warning</span>
                  <h3 className="font-bold text-text-main">Sản phẩm tồn kho thấp</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-text-secondary hover:text-text-main transition-colors" title="Xuất dữ liệu">
                    <span className="material-symbols-outlined text-xl">download</span>
                  </button>
                  <button className="text-xs text-primary font-semibold hover:underline">Xem tất cả</button>
                </div>
              </div>
              <div className="p-0">
                <div className="flex flex-col">
                  {lowStockProducts.map((product, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 hover:bg-background-light transition-colors ${
                        index !== lowStockProducts.length - 1 ? 'border-b border-border-light/50' : ''
                      }`}
                    >
                      <div className={`size-10 rounded-lg ${product.iconBg} ${product.iconColor} flex items-center justify-center flex-none`}>
                        <span className="material-symbols-outlined">{product.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium text-text-main truncate">{product.name}</p>
                          <span className={`text-xs font-bold ${product.stock <= 5 ? 'text-red-500' : 'text-orange-500'}`}>
                            Còn {product.stock}
                          </span>
                        </div>
                        <div className="w-full bg-background-light rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${product.stock <= 5 ? 'bg-red-500' : 'bg-orange-500'}`}
                            style={{ width: `${(product.stock / product.maxStock) * 100}%` }}
                          />
                        </div>
                      </div>
                      <button className="ml-2 text-xs bg-surface-light border border-border-light hover:bg-background-light text-text-secondary px-2 py-1 rounded shadow-sm">
                        Nhập
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-surface-light rounded-xl border border-border-light shadow-sm p-4">
              <h3 className="font-bold text-text-main mb-3">Hoạt động gần đây</h3>
              <div className="flex flex-col gap-4 pl-2 border-l-2 border-border-light">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="pl-3 relative">
                    <div
                      className={`absolute -left-[9px] top-1 size-3 rounded-full border-2 border-surface-light ${
                        activity.isNew ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    />
                    <p className="text-sm text-text-main font-medium">{activity.message}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
