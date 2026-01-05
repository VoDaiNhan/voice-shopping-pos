import { useState } from 'react';
import { products, supplierNames, generateReceiptCode, type Product } from '../data/mockData';

interface ImportItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  batchNumber: string;
  expiryDate: string;
}

export function InventoryImportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(supplierNames[0]);
  const [importItems, setImportItems] = useState<ImportItem[]>([]);
  const [note, setNote] = useState('');
  const [receiptCode] = useState(generateReceiptCode);

  const today = new Date().toISOString().split('T')[0];

  const addItemToImport = (product: Product) => {
    const existing = importItems.find((item) => item.id === product.id);
    if (existing) {
      setImportItems(
        importItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setImportItems([
        ...importItems,
        {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          quantity: 1,
          batchNumber: '',
          expiryDate: '',
        },
      ]);
    }
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setImportItems(importItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const updateItemBatch = (id: string, batchNumber: string) => {
    setImportItems(importItems.map((item) => (item.id === id ? { ...item, batchNumber } : item)));
  };

  const updateItemExpiry = (id: string, expiryDate: string) => {
    setImportItems(importItems.map((item) => (item.id === id ? { ...item, expiryDate } : item)));
  };

  const removeItem = (id: string) => {
    setImportItems(importItems.filter((item) => item.id !== id));
  };

  const totalQuantity = importItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = importItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    alert(`Đã tạo phiếu nhập kho ${receiptCode} với ${totalQuantity} sản phẩm, tổng tiền: ${totalAmount.toLocaleString('vi-VN')}₫`);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Panel - Product Selection */}
      <div className="flex-1 flex flex-col min-w-0 p-4 md:p-6 overflow-hidden">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-main">Tạo Phiếu Nhập Kho</h2>
          <p className="text-text-secondary text-sm mt-1">Quản lý nhập hàng và cập nhật tồn kho</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative group flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary group-focus-within:text-primary transition-colors">
                search
              </span>
            </div>
            <input
              className="block w-full h-14 pl-11 pr-14 bg-surface-light border-0 ring-1 ring-border-light rounded-xl text-base shadow-sm placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="Tìm kiếm hoặc quét mã vạch (F2)..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-xs font-mono text-text-secondary bg-background-light px-2 py-1 rounded">F2</span>
            </div>
          </div>
          <button className="h-14 px-5 bg-surface-light border border-border-light hover:border-primary hover:bg-green-50 text-text-main hover:text-primary rounded-xl shadow-sm transition-all flex items-center justify-center gap-3 group shrink-0 relative overflow-hidden">
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl group-hover:scale-105 transition-transform">barcode_scanner</span>
              <div className="absolute inset-0 w-full h-[2px] bg-red-500/80 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="block font-semibold text-sm leading-none mb-1">Quét mã vạch</span>
              <span className="block text-[10px] text-text-secondary group-hover:text-primary/80 font-medium leading-none">
                Kết nối máy quét
              </span>
            </div>
          </button>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-main">Sản phẩm gợi ý</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">Xem tất cả</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addItemToImport(product)}
                className="group flex flex-col text-left bg-surface-light p-4 rounded-xl border border-transparent hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="flex gap-4">
                  <div
                    className="h-16 w-16 rounded-lg bg-background-light shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-main truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">Mã: {product.sku}</p>
                    <p className="text-xs text-text-secondary mt-1">
                      Tồn: <span className="font-medium text-text-main">{product.stock} {product.unit}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border-light flex justify-between items-center">
                  <span className="text-sm font-semibold text-text-main">{product.price.toLocaleString('vi-VN')} ₫</span>
                  <span className="material-symbols-outlined text-gray-300 group-hover:text-primary text-xl">add_circle</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Import Form */}
      <div className="w-[400px] lg:w-[450px] shrink-0 bg-surface-light border-l border-border-light flex flex-col shadow-xl z-10">
        {/* Form Header */}
        <div className="p-6 border-b border-border-light space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-text-secondary mb-1">Nhà cung cấp</label>
              <div className="relative">
                <select
                  className="w-full h-10 pl-3 pr-8 bg-background-light border border-border-light rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary appearance-none"
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                >
                  {supplierNames.map((supplier) => (
                    <option key={supplier}>{supplier}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2.5 text-text-secondary text-lg pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
            <div className="w-1/3">
              <label className="block text-xs font-medium text-text-secondary mb-1">Mã phiếu</label>
              <input
                className="w-full h-10 px-3 bg-background-light border border-border-light rounded-lg text-sm text-text-secondary focus:outline-none"
                readOnly
                type="text"
                value={receiptCode}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-text-secondary mb-1">Người nhập</label>
              <input
                className="w-full h-10 px-3 bg-background-light border border-border-light rounded-lg text-sm text-text-secondary focus:outline-none"
                readOnly
                type="text"
                value="Nguyễn Văn A"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-xs font-medium text-text-secondary mb-1">Ngày nhập</label>
              <input
                className="w-full h-10 px-3 bg-background-light border border-border-light rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary"
                type="date"
                defaultValue={today}
              />
            </div>
          </div>
        </div>

        {/* Import Items Table */}
        <div className="flex-1 overflow-y-auto">
          {importItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-secondary p-8">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-30">inventory_2</span>
              <p className="text-center">Chưa có sản phẩm nào được chọn</p>
              <p className="text-sm text-center mt-1">Chọn sản phẩm từ danh sách bên trái</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-background-light sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4 text-xs font-semibold text-text-secondary w-[30%]">Tên hàng</th>
                  <th className="py-3 px-2 text-xs font-semibold text-text-secondary w-[25%]">Lô / HSD</th>
                  <th className="py-3 px-2 text-xs font-semibold text-text-secondary text-center w-[15%]">SL</th>
                  <th className="py-3 px-4 text-xs font-semibold text-text-secondary text-right w-[20%]">Thành tiền</th>
                  <th className="py-3 px-2 text-xs font-semibold text-text-secondary w-[10%]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {importItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-background-light transition-colors">
                    <td className="py-3 px-4 align-top">
                      <p className="text-sm font-medium text-text-main line-clamp-2">{item.name}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{item.price.toLocaleString('vi-VN')} ₫</p>
                    </td>
                    <td className="py-3 px-2 align-top">
                      <input
                        className="w-full h-7 px-2 mb-2 bg-surface-light border border-border-light rounded-md text-xs focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-text-secondary"
                        placeholder="Số lô"
                        type="text"
                        value={item.batchNumber}
                        onChange={(e) => updateItemBatch(item.id, e.target.value)}
                      />
                      <input
                        className="w-full h-7 px-2 bg-surface-light border border-border-light rounded-md text-xs focus:ring-1 focus:ring-primary focus:border-primary text-text-secondary"
                        title="Ngày hết hạn"
                        type="date"
                        value={item.expiryDate}
                        onChange={(e) => updateItemExpiry(item.id, e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-2 align-top">
                      <input
                        className="w-full h-8 px-1 text-center border border-border-light rounded-md text-sm focus:ring-1 focus:ring-primary focus:border-primary"
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-3 px-4 align-top text-right">
                      <p className="text-sm font-medium text-text-main">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}
                      </p>
                    </td>
                    <td className="py-3 px-2 align-top text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-text-secondary hover:text-red-500 transition-colors p-1 rounded-md"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-background-light border-t border-border-light">
          <div className="mb-4">
            <textarea
              className="w-full p-3 bg-surface-light border border-border-light rounded-lg text-sm resize-none focus:ring-1 focus:ring-primary focus:border-primary h-20 placeholder:text-text-secondary"
              placeholder="Ghi chú đơn nhập..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Tổng số lượng</span>
              <span className="font-semibold text-text-main">{totalQuantity}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-text-secondary font-medium">Tổng tiền hàng</span>
              <span className="text-2xl font-bold text-primary">{totalAmount.toLocaleString('vi-VN')} ₫</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-3 px-4 rounded-lg border border-border-light font-semibold text-text-secondary hover:bg-background-light transition-colors">
              Lưu tạm
            </button>
            <button
              onClick={handleSubmit}
              disabled={importItems.length === 0}
              className="flex-1 py-3 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold shadow-md shadow-green-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">check</span>
              Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
