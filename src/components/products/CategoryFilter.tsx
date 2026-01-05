import { useProductStore } from '../../stores/productStore';

export function CategoryFilter() {
  const categories = useProductStore(state => state.categories);
  const selectedCategory = useProductStore(state => state.selectedCategory);
  const setSelectedCategory = useProductStore(state => state.setSelectedCategory);
  const getFilteredProducts = useProductStore(state => state.getFilteredProducts);
  
  const filteredProducts = getFilteredProducts();
  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left side: Back button + Category tabs */}
      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">
        {/* Back Button - only show when not on 'all' */}
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="flex items-center gap-1 h-9 px-3 rounded-lg border border-border-light bg-white hover:bg-gray-50 text-text-main text-sm font-medium transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Quay lại</span>
            <span className="text-xs text-text-secondary ml-1">(ESC)</span>
          </button>
        )}
        
        {/* Category Chips */}
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 
                transition-all duration-200 text-sm font-medium
                ${isActive 
                  ? 'bg-text-main text-white shadow-sm' 
                  : 'bg-white border border-border-light hover:border-primary text-text-main'
                }
              `}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      
      {/* Right side: Product count + Sort + View toggle */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Product count badge */}
        <div className="flex items-center gap-1.5 text-sm text-text-secondary">
          <span className="material-symbols-outlined text-lg">inventory_2</span>
          <span>{currentCategory?.name || 'Tất cả'}</span>
          <span className="text-text-main font-semibold">({filteredProducts.length})</span>
        </div>
        
        {/* Divider */}
        <div className="w-px h-5 bg-border-light mx-1" />
        
        {/* Grid/List toggle */}
        <button className="flex items-center justify-center size-9 rounded-lg border border-border-light bg-white hover:bg-gray-50 text-text-main transition-colors">
          <span className="material-symbols-outlined text-lg">grid_view</span>
        </button>
        
        {/* Sort button */}
        <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border-light bg-white hover:bg-gray-50 text-text-main text-sm font-medium transition-colors">
          <span className="material-symbols-outlined text-lg">swap_vert</span>
          <span>Sắp xếp</span>
        </button>
      </div>
    </div>
  );
}
