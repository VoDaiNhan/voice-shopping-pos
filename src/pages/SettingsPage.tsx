import { useState } from 'react';

interface SettingSection {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const sections: SettingSection[] = [
  { id: 'store', title: 'Thông tin cửa hàng', icon: 'store', description: 'Tên, địa chỉ, logo' },
  { id: 'printer', title: 'Máy in', icon: 'print', description: 'Cấu hình máy in hóa đơn' },
  { id: 'payment', title: 'Thanh toán', icon: 'payment', description: 'Phương thức thanh toán' },
  { id: 'staff', title: 'Nhân viên', icon: 'group', description: 'Quản lý tài khoản' },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('store');
  const [storeInfo, setStoreInfo] = useState({
    name: 'POS Bán Hàng',
    address: 'Quận 1, TP. Hồ Chí Minh',
    phone: '0123 456 789',
    email: 'contact@posbanhang.vn',
  });

  const renderContent = () => {
    switch (activeSection) {
      case 'store':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-main mb-4">Thông tin cửa hàng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Tên cửa hàng</label>
                  <input
                    type="text"
                    value={storeInfo.name}
                    onChange={(e) => setStoreInfo({...storeInfo, name: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl bg-background-light border border-border-light text-text-main focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Số điện thoại</label>
                  <input
                    type="text"
                    value={storeInfo.phone}
                    onChange={(e) => setStoreInfo({...storeInfo, phone: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl bg-background-light border border-border-light text-text-main focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-main mb-2">Địa chỉ</label>
                  <input
                    type="text"
                    value={storeInfo.address}
                    onChange={(e) => setStoreInfo({...storeInfo, address: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl bg-background-light border border-border-light text-text-main focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-main mb-2">Email</label>
                  <input
                    type="email"
                    value={storeInfo.email}
                    onChange={(e) => setStoreInfo({...storeInfo, email: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl bg-background-light border border-border-light text-text-main focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-main mb-4">Logo cửa hàng</h3>
              <div className="flex items-center gap-4">
                <div className="size-24 rounded-xl bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-4xl">storefront</span>
                </div>
                <div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                    Tải logo lên
                  </button>
                  <p className="text-sm text-text-secondary mt-2">PNG, JPG tối đa 2MB</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'printer':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text-main">Cấu hình máy in</h3>
            
            <div className="bg-background-light rounded-xl p-4 border border-border-light">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">print</span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-main">Máy in POS-80</p>
                    <p className="text-sm text-text-secondary">Cổng USB - Đã kết nối</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-green-500"></span>
                  <span className="text-sm font-medium text-green-600">Hoạt động</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-border-light">
                <div>
                  <p className="font-medium text-text-main">Tự động in hóa đơn</p>
                  <p className="text-sm text-text-secondary">In hóa đơn sau mỗi giao dịch</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-border-light">
                <div>
                  <p className="font-medium text-text-main">In 2 liên</p>
                  <p className="text-sm text-text-secondary">In thêm liên lưu trữ</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <button className="px-4 py-2 bg-background-light border border-border-light rounded-lg text-text-main hover:bg-border-light transition-colors">
              In thử
            </button>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text-main">Phương thức thanh toán</h3>
            
            <div className="space-y-3">
              {[
                { name: 'Tiền mặt', icon: 'payments', enabled: true },
                { name: 'Chuyển khoản', icon: 'account_balance', enabled: true },
                { name: 'Thẻ tín dụng', icon: 'credit_card', enabled: false },
                { name: 'Ví điện tử', icon: 'wallet', enabled: false },
              ].map((method, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-border-light">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{method.icon}</span>
                    </div>
                    <span className="font-medium text-text-main">{method.name}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={method.enabled} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'staff':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-main">Quản lý nhân viên</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-xl">add</span>
                Thêm nhân viên
              </button>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Nguyễn Văn A', role: 'Quản lý', status: 'active' },
                { name: 'Trần Thị B', role: 'Thu ngân', status: 'active' },
                { name: 'Lê Văn C', role: 'Thu ngân', status: 'inactive' },
              ].map((staff, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-border-light">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-white font-bold text-sm">
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-text-main">{staff.name}</p>
                      <p className="text-sm text-text-secondary">{staff.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      staff.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {staff.status === 'active' ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                    </span>
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-text-secondary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-main">Cài đặt</h1>
        <p className="text-text-secondary">Quản lý cấu hình hệ thống</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-border-light p-2 sticky top-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary text-white'
                    : 'text-text-main hover:bg-background-light'
                }`}
              >
                <span className="material-symbols-outlined">{section.icon}</span>
                <div>
                  <p className="font-medium">{section.title}</p>
                  <p className={`text-xs ${activeSection === section.id ? 'text-white/70' : 'text-text-secondary'}`}>
                    {section.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-border-light p-6">
          {renderContent()}
          
          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-border-light flex justify-end gap-3">
            <button className="px-5 py-2.5 border border-border-light text-text-main rounded-xl hover:bg-background-light transition-colors">
              Hủy bỏ
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-r from-primary to-green-600 text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl transition-all">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
