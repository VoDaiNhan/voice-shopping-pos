import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  inventoryData,
  categories,
  getProductStatusLabel,
  getProductStatusStyle,
  getStockColor,
} from '../data/mockData';

export function InventoryStockPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [filterExpiring, setFilterExpiring] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Calculate stats
  const totalProducts = inventoryData.length;
  const totalValue = inventoryData.reduce((sum, item) => sum + item.price * item.stock, 0);
  const expiringCount = inventoryData.filter((item) => item.status === 'expiring').length;
  const outOfStockCount = inventoryData.filter((item) => item.status === 'out_of_stock').length;

  // Filter products
  const filteredProducts = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    const matchesExpiring = !filterExpiring || item.status === 'expiring';
    return matchesSearch && matchesCategory && matchesExpiring;
  });

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredProducts.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredProducts.map((item) => item.id));
    }
  };

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 pt-2">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-10">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-text-main text-3xl font-black tracking-tight">Quản lý Tồn kho</h2>
            <p className="text-text-secondary text-sm font-normal">
              Theo dõi số lượng, hạn sử dụng và giá trị hàng hóa
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-surface-light border border-border-light text-text-main text-sm font-semibold hover:bg-background-light transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">file_upload</span>
              <span>Xuất Excel</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-surface-light border border-border-light text-text-main text-sm font-semibold hover:bg-background-light hover:text-primary transition-colors shadow-sm group">
              <span className="material-symbols-outlined text-[20px] text-text-secondary group-hover:text-primary transition-colors">
                fact_check
              </span>
              <span>Kiểm kê kho</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-surface-light border border-border-light text-text-main text-sm font-semibold hover:bg-background-light hover:text-orange-600 transition-colors shadow-sm group">
              <span className="material-symbols-outlined text-[20px] text-text-secondary group-hover:text-orange-600 transition-colors">
                tune
              </span>
              <span>Điều chỉnh kho</span>
            </button>
            <button
              onClick={() => navigate('/inventory-import')}
              className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-md shadow-green-200 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Nhập hàng mới</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-surface-light border border-border-light shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-text-main">inventory_2</span>
            </div>
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wide">Tổng sản phẩm</p>
            <div className="flex items-end gap-2">
              <p className="text-text-main text-3xl font-bold leading-none">{totalProducts.toLocaleString('vi-VN')}</p>
              <span className="text-primary text-sm font-semibold mb-1 bg-primary/10 px-1.5 py-0.5 rounded">+15 mới</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-surface-light border border-border-light shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-text-main">attach_money</span>
            </div>
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wide">Tổng giá trị kho</p>
            <p className="text-text-main text-3xl font-bold leading-none">{totalValue.toLocaleString('vi-VN')}đ</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-surface-light border border-red-200 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-red-500">warning</span>
            </div>
            <p className="text-red-600 text-sm font-medium uppercase tracking-wide">Cảnh báo cần xử lý</p>
            <div className="flex flex-col gap-0.5">
              <p className="text-text-main text-3xl font-bold leading-none">{expiringCount + outOfStockCount} sản phẩm</p>
              <p className="text-red-500 text-sm font-medium mt-1">
                {expiringCount} sắp hết hạn • {outOfStockCount} hết hàng
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-surface-light p-4 rounded-xl border border-border-light shadow-sm">
          <div className="relative w-full lg:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary group-focus-within:text-primary transition-colors">
                search
              </span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-background-light text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="Tìm tên sản phẩm, mã SKU, barcode..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            <div className="relative">
              <select
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light bg-surface-light hover:bg-background-light text-text-main text-sm transition-colors whitespace-nowrap appearance-none pr-8"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    Danh mục: {cat}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[18px] text-text-secondary pointer-events-none">
                expand_more
              </span>
            </div>
            <button
              onClick={() => setFilterExpiring(!filterExpiring)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors whitespace-nowrap ${
                filterExpiring
                  ? 'border-primary/30 bg-primary/10 text-primary'
                  : 'border-border-light bg-surface-light text-text-main hover:bg-background-light'
              }`}
            >
              <span>Sắp hết hạn</span>
              {filterExpiring && <span className="material-symbols-outlined text-[18px]">close</span>}
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-surface-light rounded-xl border border-border-light shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background-light border-b border-border-light">
                <tr>
                  <th className="px-6 py-4 font-semibold text-text-secondary w-12">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                      checked={selectedItems.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 font-semibold text-text-secondary min-w-[300px]">Sản phẩm</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary">Danh mục</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary text-right">Tồn kho</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary text-right">Giá bán</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary">Hạn sử dụng</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary text-center">Trạng thái</th>
                  <th className="px-6 py-4 font-semibold text-text-secondary w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {filteredProducts.map((item) => (
                  <tr
                    key={item.id}
                    className={`group hover:bg-background-light transition-colors ${
                      item.status === 'expiring' ? 'bg-orange-50/50' : ''
                    } ${item.status === 'out_of_stock' ? 'opacity-75' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-12 w-12 rounded-lg bg-background-light bg-center bg-cover border border-border-light shrink-0 ${
                            item.status === 'out_of_stock' ? 'grayscale' : ''
                          }`}
                          style={{ backgroundImage: `url("${item.image}")` }}
                        />
                        <div className="flex flex-col">
                          <span className="text-text-main font-medium">{item.name}</span>
                          <span className="text-text-secondary text-xs">SKU: {item.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{item.category}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className={`font-medium ${getStockColor(item.stock)}`}>{item.stock}</span>
                        <span className="text-text-secondary text-xs">{item.unit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-text-main font-medium">
                      {item.price.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="px-6 py-4">
                      {item.status === 'expiring' ? (
                        <div>
                          <div className="flex items-center gap-1 text-orange-600 font-medium">
                            <span className="material-symbols-outlined text-[16px]">warning</span>
                            <span>{item.expiryDate}</span>
                          </div>
                          <span className="text-xs text-orange-500">Hết hạn trong 3 ngày</span>
                        </div>
                      ) : (
                        <span className="text-text-secondary">{item.expiryDate}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProductStatusStyle(item.status)}`}>
                        {getProductStatusLabel(item.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-text-secondary hover:text-primary transition-colors p-1 rounded-md hover:bg-primary/10">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-border-light flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Hiển thị <span className="font-medium text-text-main">1</span> đến{' '}
              <span className="font-medium text-text-main">{filteredProducts.length}</span> trong tổng số{' '}
              <span className="font-medium text-text-main">{totalProducts}</span> kết quả
            </div>
            <div className="flex gap-2">
              <button
                disabled
                className="px-3 py-1 rounded-lg border border-border-light bg-surface-light text-text-secondary text-sm hover:bg-background-light disabled:opacity-50"
              >
                Trước
              </button>
              <button className="px-3 py-1 rounded-lg border border-border-light bg-surface-light text-text-main text-sm hover:bg-background-light">
                Tiếp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
