import { useState } from 'react';
import { useProductStore } from '../stores/productStore';

export function ProductsPage() {
  const products = useProductStore(state => state.products);
  const categories = useProductStore(state => state.categories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Quản lý Sản phẩm</h1>
          <p className="text-text-secondary">Quản lý danh sách sản phẩm của cửa hàng</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-green-600 text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <span className="material-symbols-outlined text-xl">add</span>
          Thêm sản phẩm
        </button>
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
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-background-light border border-border-light text-text-main placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-11 px-4 rounded-xl bg-background-light border border-border-light text-text-main outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {/* Action Buttons */}
          <button className="h-11 px-4 rounded-xl border border-border-light text-text-main hover:bg-background-light transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">upload</span>
            Nhập Excel
          </button>
          <button className="h-11 px-4 rounded-xl border border-border-light text-text-main hover:bg-background-light transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">download</span>
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-border-light overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-background-light border-b border-border-light">
              <th className="px-5 py-4 text-left text-sm font-semibold text-text-main">Sản phẩm</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-text-main">Mã SKU</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-text-main">Danh mục</th>
              <th className="px-5 py-4 text-right text-sm font-semibold text-text-main">Giá bán</th>
              <th className="px-5 py-4 text-right text-sm font-semibold text-text-main">Tồn kho</th>
              <th className="px-5 py-4 text-center text-sm font-semibold text-text-main">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="size-12 rounded-lg object-cover"
                    />
                    <span className="font-medium text-text-main">{product.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-text-secondary font-mono text-sm">{product.sku}</td>
                <td className="px-5 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {product.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-right font-semibold text-primary">
                  {product.price.toLocaleString('vi-VN')}đ
                </td>
                <td className="px-5 py-4 text-right">
                  <span className={`font-medium ${product.stock < 20 ? 'text-red-500' : 'text-text-main'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">delete</span>
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
          Hiển thị {filteredProducts.length} / {products.length} sản phẩm
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
