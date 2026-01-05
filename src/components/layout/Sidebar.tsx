import { NavLink, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Tổng quan', icon: 'dashboard' },
  { path: '/pos', label: 'Bán hàng', icon: 'point_of_sale' },
  { path: '/sales-report', label: 'Báo cáo', icon: 'bar_chart' },
  { path: '/inventory', label: 'Tồn kho', icon: 'inventory' },
  { path: '/inventory-import', label: 'Nhập kho', icon: 'package_2' },
  { path: '/products', label: 'Sản phẩm', icon: 'inventory_2' },
  { path: '/orders', label: 'Đơn hàng', icon: 'receipt_long' },
  { path: '/settings', label: 'Cài đặt', icon: 'settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-surface-light border-r border-border-light flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-border-light">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-11 bg-gradient-to-br from-primary to-green-600 rounded-xl text-white shadow-lg">
            <span className="material-symbols-outlined text-2xl">storefront</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-main">POS Bán Hàng</h1>
            <p className="text-xs text-text-secondary">Quản lý cửa hàng</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          // Use exact path matching to avoid /inventory matching /inventory-import
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'text-text-secondary hover:bg-background-light hover:text-text-main'
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${
                isActive ? '' : 'group-hover:scale-110 transition-transform'
              }`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border-light">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-background-light">
          <div className="size-10 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-white font-bold">
            NV
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-main truncate">Nhân viên A</p>
            <p className="text-xs text-text-secondary">Ca sáng</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-white text-text-secondary hover:text-red-500 transition-colors">
            <span className="material-symbols-outlined text-xl">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
