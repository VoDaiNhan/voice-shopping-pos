import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  salesStats,
  weeklyChartData,
  promotionStats,
  topPromotions,
  expiringProducts,
  activityLog,
  salesOrdersForTable,
} from '../data/mockData';

function getOrderStatusBadge(status: string) {
  const config: Record<string, { label: string; class: string; dot: string }> = {
    completed: { label: 'Hoàn thành', class: 'bg-green-50 text-green-700 ring-green-600/20', dot: 'bg-green-600' },
    processing: { label: 'Đang xử lý', class: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20', dot: 'bg-yellow-600 animate-pulse' },
    shipping: { label: 'Đang giao', class: 'bg-blue-50 text-blue-700 ring-blue-600/20', dot: 'bg-blue-600' },
    cancelled: { label: 'Đã hủy', class: 'bg-red-50 text-red-700 ring-red-600/20', dot: 'bg-red-600' },
  };
  const { label, class: cls, dot } = config[status] || config.completed;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`}></span>
      {label}
    </span>
  );
}

export function SalesReportPage() {
  const navigate = useNavigate();
  const [chartPeriod, setChartPeriod] = useState<'week' | 'month'>('week');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = salesOrdersForTable.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery)
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="mx-auto max-w-[1200px] flex flex-col gap-6 pb-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-text-main">Lịch Sử & Báo Cáo Bán Hàng</h2>
            <p className="text-sm text-text-secondary mt-1">Thống kê doanh thu và quản lý đơn hàng</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 items-center gap-2 rounded-lg border border-border-light bg-surface-light px-3 text-sm font-bold text-text-main shadow-sm hover:border-green-200 hover:bg-green-50 hover:text-green-700 transition group">
              <span className="material-symbols-outlined text-[20px] text-text-secondary group-hover:text-green-700">table_view</span>
              <span className="whitespace-nowrap">Xuất Excel</span>
            </button>
            <button className="flex h-10 items-center gap-2 rounded-lg border border-border-light bg-surface-light px-3 text-sm font-bold text-text-main shadow-sm hover:border-red-200 hover:bg-red-50 hover:text-red-700 transition group">
              <span className="material-symbols-outlined text-[20px] text-text-secondary group-hover:text-red-700">picture_as_pdf</span>
              <span className="whitespace-nowrap">Xuất PDF</span>
            </button>
            <button
              onClick={() => navigate('/pos')}
              className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm hover:bg-primary-dark transition"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="whitespace-nowrap">Tạo Đơn Mới</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-xl border border-border-light bg-surface-light p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-text-secondary">Tổng Doanh Thu</p>
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-text-main">{salesStats.totalRevenue.toLocaleString('vi-VN')} ₫</p>
              <div className="mt-1 flex items-center gap-1 text-sm font-medium text-primary">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>{salesStats.revenueGrowth} so với tuần trước</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-xl border border-border-light bg-surface-light p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-text-secondary">Số Lượng Đơn</p>
              <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-text-main">{salesStats.totalOrders}</p>
              <div className="mt-1 flex items-center gap-1 text-sm font-medium text-primary">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>{salesStats.orderGrowth} so với tuần trước</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-xl border border-border-light bg-surface-light p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-text-secondary">Tỷ Lệ Online / Tại Quầy</p>
              <div className="flex size-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <span className="material-symbols-outlined text-[20px]">pie_chart</span>
              </div>
            </div>
            <div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold tracking-tight text-text-main">{salesStats.onlinePercent}%</p>
                <span className="mb-1 text-sm text-text-secondary">/</span>
                <p className="text-xl font-semibold tracking-tight text-text-secondary">{salesStats.offlinePercent}%</p>
              </div>
              <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-border-light">
                <div className="h-full bg-blue-500" style={{ width: `${salesStats.onlinePercent}%` }}></div>
                <div className="h-full bg-primary" style={{ width: `${salesStats.offlinePercent}%` }}></div>
              </div>
              <div className="mt-2 flex gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-500"></span>
                  <span className="text-text-secondary">Online</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary"></span>
                  <span className="text-text-secondary">Tại quầy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chart and Promotion */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Revenue Chart */}
          <div className="rounded-xl border border-border-light bg-surface-light p-6 shadow-sm">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-text-main">Biểu đồ doanh thu</h3>
                <p className="text-sm text-text-secondary">Thống kê doanh thu theo ngày</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-background-light p-1">
                <button
                  onClick={() => setChartPeriod('week')}
                  className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
                    chartPeriod === 'week' ? 'bg-white shadow-sm ring-1 ring-black/5 text-text-main' : 'text-text-secondary hover:text-text-main'
                  }`}
                >
                  Tuần này
                </button>
                <button
                  onClick={() => setChartPeriod('month')}
                  className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
                    chartPeriod === 'month' ? 'bg-white shadow-sm ring-1 ring-black/5 text-text-main' : 'text-text-secondary hover:text-text-main'
                  }`}
                >
                  Tháng này
                </button>
              </div>
            </div>
            <div className="relative h-[200px] w-full">
              <div className="absolute bottom-6 left-0 top-2 flex flex-col justify-between text-xs font-medium text-text-secondary">
                <span>5tr</span>
                <span>2.5tr</span>
                <span>0</span>
              </div>
              <div className="flex h-full items-end justify-around gap-2 pl-8 pb-6">
                {weeklyChartData.map((item, index) => (
                  <div key={item.day} className="flex w-full flex-col items-center gap-2">
                    <div
                      className={`w-full max-w-[40px] rounded-t-sm transition-all hover:bg-primary ${
                        index === 4 ? 'bg-primary' : 'bg-primary/20'
                      }`}
                      style={{ height: `${item.value}%` }}
                    ></div>
                    <span className={`text-xs font-semibold ${index === 4 ? 'text-text-main font-bold' : 'text-text-secondary'}`}>
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Promotion Performance */}
          <div className="rounded-xl border border-yellow-200 bg-surface-light p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                  <span className="material-symbols-outlined">local_offer</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-main">Hiệu suất khuyến mãi</h3>
                  <p className="text-sm text-text-secondary">Tổng quan hiệu quả các chương trình giảm giá</p>
                </div>
              </div>
              <button className="text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-1 transition">
                Chi tiết
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg bg-background-light p-3 border border-border-light">
                <p className="text-xs text-text-secondary mb-1">Doanh thu từ KM</p>
                <p className="text-lg font-bold text-text-main">{promotionStats.revenue.toLocaleString('vi-VN')} ₫</p>
                <span className="text-xs font-medium text-primary">{promotionStats.revenueGrowth}</span>
              </div>
              <div className="rounded-lg bg-background-light p-3 border border-border-light">
                <p className="text-xs text-text-secondary mb-1">Lượt dùng mã</p>
                <p className="text-lg font-bold text-text-main">{promotionStats.usageCount}</p>
                <span className="text-xs font-medium text-primary">{promotionStats.usageGrowth}</span>
              </div>
              <div className="rounded-lg bg-background-light p-3 border border-border-light">
                <p className="text-xs text-text-secondary mb-1">Giảm giá TB</p>
                <p className="text-lg font-bold text-text-main">{promotionStats.avgDiscount}%</p>
                <span className="text-xs font-medium text-text-secondary">{promotionStats.discountChange}</span>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Top khuyến mãi phổ biến</h4>
              <div className="space-y-3">
                {topPromotions.map((promo) => (
                  <div key={promo.code}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded bg-yellow-50 text-yellow-600 text-xs font-bold">
                          {promo.discount}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-main">{promo.name}</p>
                          <p className="text-xs text-text-secondary">Mã: {promo.code}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-text-main">{promo.usages} lượt</p>
                        <p className="text-xs text-text-secondary">{promo.revenue} doanh thu</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className={`${promo.color} h-1.5 rounded-full`} style={{ width: `${promo.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Expiring Products and Activity Log */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Expiring Products */}
          <div className="xl:col-span-2 rounded-xl border border-red-200 bg-surface-light p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[100px] text-red-500">inventory_2</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <span className="material-symbols-outlined">event_busy</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-main">Sản phẩm sắp hết hạn</h3>
                  <p className="text-sm text-text-secondary">Các mặt hàng cần xử lý gấp để tránh thất thoát</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/inventory')}
                className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition"
              >
                <span>Kiểm kho chi tiết</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
            <div className="overflow-x-auto relative z-10 rounded-lg border border-red-100">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-red-50 text-red-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Tên sản phẩm</th>
                    <th className="px-4 py-3 font-semibold">Tồn kho</th>
                    <th className="px-4 py-3 font-semibold">Hạn sử dụng</th>
                    <th className="px-4 py-3 font-semibold">Tình trạng</th>
                    <th className="px-4 py-3 font-semibold text-right">Hành động đề xuất</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-100 bg-white">
                  {expiringProducts.map((product) => (
                    <tr key={product.id} className="group hover:bg-red-50/50 transition">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                            <span className="material-symbols-outlined text-[20px]">{product.icon}</span>
                          </div>
                          <div>
                            <p className="font-medium text-text-main">{product.name}</p>
                            <p className="text-xs text-text-secondary">Mã: {product.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-medium text-text-main">{product.stock}</td>
                      <td className={`px-4 py-4 font-bold ${product.statusType === 'danger' ? 'text-red-600' : 'text-orange-600'}`}>
                        {product.expiryDate}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                            product.statusType === 'danger'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {product.statusType === 'danger' ? 'warning' : 'schedule'}
                          </span>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm transition ${
                            product.statusType === 'danger'
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'border border-red-200 bg-white text-red-600 hover:bg-red-50'
                          }`}
                        >
                          {product.statusType === 'danger' && <span className="material-symbols-outlined text-[16px]">percent</span>}
                          {product.statusType === 'danger' ? 'Giảm giá 50%' : 'Tạo khuyến mãi'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Log */}
          <div className="rounded-xl border border-border-light bg-surface-light p-6 shadow-sm flex flex-col h-full">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  <span className="material-symbols-outlined">manage_history</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-main">Lịch sử hoạt động</h3>
                  <p className="text-sm text-text-secondary">Nhật ký thao tác hệ thống</p>
                </div>
              </div>
              <button className="p-1 text-text-secondary hover:text-primary transition">
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
            <div className="flex-1 space-y-6 relative">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border-light -z-10"></div>
              {activityLog.map((activity) => (
                <div key={activity.id} className="relative flex gap-4">
                  <div className={`size-8 rounded-full border-2 border-surface-light ${activity.iconBg} flex items-center justify-center ${activity.iconColor} shrink-0 z-10`}>
                    <span className="material-symbols-outlined text-[16px]">{activity.icon}</span>
                  </div>
                  <div className="flex flex-col pt-1 flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-bold text-text-main truncate">
                        {activity.user} <span className="font-normal text-text-secondary">{activity.action}</span>
                      </p>
                      <span className="text-xs text-text-secondary whitespace-nowrap">{activity.time}</span>
                    </div>
                    <p className="text-sm text-text-main mt-0.5 truncate">{activity.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-border-light py-2 text-sm font-medium text-text-secondary hover:bg-background-light transition w-full">
              <span>Xem tất cả nhật ký</span>
            </button>
          </div>
        </section>

        {/* Orders History Table */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="w-full lg:max-w-md">
              <div className="flex w-full items-stretch rounded-lg shadow-sm">
                <div className="flex items-center justify-center rounded-l-lg border border-r-0 border-border-light bg-surface-light px-3 text-text-secondary">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="w-full flex-1 border border-border-light bg-surface-light py-2.5 text-sm text-text-main placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-0 rounded-r-lg"
                  placeholder="Tìm theo mã đơn, tên hoặc SĐT khách hàng"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="flex shrink-0 items-center gap-2 rounded-lg border border-border-light bg-surface-light px-3 py-2 text-sm font-medium text-text-main shadow-sm hover:bg-background-light transition">
                <span>Thời gian: Tuần này</span>
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              <button className="flex shrink-0 items-center gap-2 rounded-lg border border-border-light bg-surface-light px-3 py-2 text-sm font-medium text-text-main shadow-sm hover:bg-background-light transition">
                <span>Loại: Tất cả</span>
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              <button className="flex shrink-0 items-center gap-2 rounded-lg border border-border-light bg-surface-light px-3 py-2 text-sm font-medium text-text-main shadow-sm hover:bg-background-light transition">
                <span>Trạng thái: Tất cả</span>
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
              </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border-light bg-surface-light shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] table-auto text-left text-sm">
                <thead className="bg-background-light text-text-secondary">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Mã Đơn</th>
                    <th className="px-6 py-4 font-semibold">Thời Gian</th>
                    <th className="px-6 py-4 font-semibold">Khách Hàng</th>
                    <th className="px-6 py-4 font-semibold">Loại</th>
                    <th className="px-6 py-4 font-semibold">Tổng Tiền</th>
                    <th className="px-6 py-4 font-semibold">Trạng Thái</th>
                    <th className="px-6 py-4 font-semibold text-right">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light text-text-main">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="group hover:bg-background-light transition">
                      <td className="px-6 py-4 font-medium text-primary">{order.id}</td>
                      <td className="px-6 py-4 text-text-secondary">{order.time}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-xs text-text-secondary">{order.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            order.type === 'Online'
                              ? 'bg-blue-50 text-blue-700 ring-blue-700/10'
                              : 'bg-gray-50 text-gray-600 ring-gray-500/10'
                          }`}
                        >
                          {order.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold">{order.total.toLocaleString('vi-VN')} ₫</td>
                      <td className="px-6 py-4">{getOrderStatusBadge(order.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="rounded p-1 text-text-secondary hover:bg-gray-100 hover:text-text-main transition">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-border-light flex items-center justify-between">
              <div className="text-sm text-text-secondary">
                Hiển thị <span className="font-medium text-text-main">1</span> đến{' '}
                <span className="font-medium text-text-main">{filteredOrders.length}</span> trong tổng số{' '}
                <span className="font-medium text-text-main">{salesOrdersForTable.length}</span> kết quả
              </div>
              <div className="flex gap-2">
                <button disabled className="px-3 py-1 rounded-lg border border-border-light bg-surface-light text-text-secondary text-sm hover:bg-background-light disabled:opacity-50">
                  Trước
                </button>
                <button className="px-3 py-1 rounded-lg border border-border-light bg-surface-light text-text-main text-sm hover:bg-background-light">
                  Tiếp
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
