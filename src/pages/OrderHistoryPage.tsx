import { useState } from 'react';

// Sample order data
const sampleOrders = [
  { 
    id: 'DH001', 
    date: '2024-12-31 10:30', 
    customer: 'Khách lẻ',
    items: 3,
    total: 125000, 
    status: 'completed',
    paymentMethod: 'Tiền mặt'
  },
  { 
    id: 'DH002', 
    date: '2024-12-31 11:15', 
    customer: 'Nguyễn Văn A',
    items: 2,
    total: 89000, 
    status: 'completed',
    paymentMethod: 'Chuyển khoản'
  },
  { 
    id: 'DH003', 
    date: '2024-12-31 12:00', 
    customer: 'Khách lẻ',
    items: 5,
    total: 234000, 
    status: 'completed',
    paymentMethod: 'Tiền mặt'
  },
  { 
    id: 'DH004', 
    date: '2024-12-31 13:45', 
    customer: 'Trần Thị B',
    items: 1,
    total: 67000, 
    status: 'cancelled',
    paymentMethod: 'Tiền mặt'
  },
  { 
    id: 'DH005', 
    date: '2024-12-31 14:20', 
    customer: 'Khách lẻ',
    items: 4,
    total: 156000, 
    status: 'completed',
    paymentMethod: 'Chuyển khoản'
  },
  { 
    id: 'DH006', 
    date: '2024-12-30 09:00', 
    customer: 'Lê Văn C',
    items: 2,
    total: 95000, 
    status: 'completed',
    paymentMethod: 'Tiền mặt'
  },
  { 
    id: 'DH007', 
    date: '2024-12-30 15:30', 
    customer: 'Khách lẻ',
    items: 6,
    total: 312000, 
    status: 'completed',
    paymentMethod: 'Tiền mặt'
  },
];

export function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  const filteredOrders = sampleOrders.filter(order => {
    const matchesSearch = !searchQuery || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Hoàn thành</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Đã hủy</span>;
      case 'pending':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Chờ xử lý</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Lịch sử Đơn hàng</h1>
          <p className="text-text-secondary">Xem và quản lý các đơn hàng đã hoàn thành</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-border-light text-text-main rounded-xl hover:bg-background-light transition-colors">
          <span className="material-symbols-outlined text-xl">download</span>
          Xuất báo cáo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-border-light">
          <p className="text-sm text-text-secondary">Tổng đơn hôm nay</p>
          <p className="text-2xl font-bold text-text-main mt-1">28</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border-light">
          <p className="text-sm text-text-secondary">Doanh thu</p>
          <p className="text-2xl font-bold text-primary mt-1">1,250,000đ</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border-light">
          <p className="text-sm text-text-secondary">Hoàn thành</p>
          <p className="text-2xl font-bold text-green-600 mt-1">26</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border-light">
          <p className="text-sm text-text-secondary">Đã hủy</p>
          <p className="text-2xl font-bold text-red-500 mt-1">2</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-border-light">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[250px] relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mã đơn, khách hàng..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-background-light border border-border-light text-text-main placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          
          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="h-11 px-4 rounded-xl bg-background-light border border-border-light text-text-main outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="today">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="all">Tất cả</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 px-4 rounded-xl bg-background-light border border-border-light text-text-main outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-light overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-background-light border-b border-border-light">
              <th className="px-5 py-4 text-left text-sm font-semibold text-text-main">Mã đơn</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-text-main">Thời gian</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-text-main">Khách hàng</th>
              <th className="px-5 py-4 text-center text-sm font-semibold text-text-main">Số SP</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-text-main">Thanh toán</th>
              <th className="px-5 py-4 text-right text-sm font-semibold text-text-main">Tổng tiền</th>
              <th className="px-5 py-4 text-center text-sm font-semibold text-text-main">Trạng thái</th>
              <th className="px-5 py-4 text-center text-sm font-semibold text-text-main">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-semibold text-primary">{order.id}</td>
                <td className="px-5 py-4 text-text-secondary text-sm">{order.date}</td>
                <td className="px-5 py-4 text-text-main">{order.customer}</td>
                <td className="px-5 py-4 text-center text-text-main">{order.items}</td>
                <td className="px-5 py-4 text-text-secondary text-sm">{order.paymentMethod}</td>
                <td className="px-5 py-4 text-right font-semibold text-text-main">
                  {order.total.toLocaleString('vi-VN')}đ
                </td>
                <td className="px-5 py-4 text-center">{getStatusBadge(order.status)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-text-secondary transition-colors" title="Xem chi tiết">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-text-secondary transition-colors" title="In hóa đơn">
                      <span className="material-symbols-outlined text-xl">print</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Hiển thị {filteredOrders.length} đơn hàng
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-lg border border-border-light text-text-secondary hover:bg-background-light transition-colors disabled:opacity-50" disabled>
            Trước
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary text-white">1</button>
          <button className="px-4 py-2 rounded-lg border border-border-light text-text-secondary hover:bg-background-light transition-colors disabled:opacity-50" disabled>
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
