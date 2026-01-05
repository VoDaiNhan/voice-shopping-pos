import { useEffect } from 'react';
import { useProductStore } from '../stores/productStore';
import { ProductGrid } from '../components/products/ProductGrid';
import { CategoryFilter } from '../components/products/CategoryFilter';
import { CartPanel } from '../components/cart/CartPanel';
import { VoiceCommandBar } from '../components/voice/VoiceCommandBar';
import { VoiceModal } from '../components/voice/VoiceModal';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';

export function POSPage() {
  const searchQuery = useProductStore(state => state.searchQuery);
  const setSearchQuery = useProductStore(state => state.setSearchQuery);
  const selectedCategory = useProductStore(state => state.selectedCategory);
  const setSelectedCategory = useProductStore(state => state.setSelectedCategory);
  const { isListening, startListening, stopListening } = useVoiceRecognition();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space to toggle voice
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        if (isListening) {
          stopListening();
        } else {
          startListening();
        }
      }
      // ESC to go back
      if (e.code === 'Escape' && selectedCategory !== 'all') {
        setSelectedCategory('all');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListening, selectedCategory, startListening, stopListening, setSelectedCategory]);

  return (
    <div className="h-full flex overflow-hidden bg-background-light text-text-main">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL: Product Selection */}
        <main className="flex-1 flex flex-col min-w-0 bg-background-light relative">
          {/* Header Toolbar */}
          <div className="px-5 pt-4 pb-3 border-b border-border-light bg-white">
            <div className="flex items-center justify-between gap-4">
              {/* Title */}
              <h1 className="text-xl font-bold text-text-main shrink-0">Bán hàng</h1>
              
              {/* Quick Actions */}
              <div className="flex items-center gap-2 flex-1">
                {/* Search */}
                <label className="flex flex-1 max-w-md relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-text-secondary text-xl">search</span>
                  </div>
                  <input 
                    className="w-full h-10 rounded-lg bg-background-light border border-border-light pl-10 pr-4 text-sm text-text-main placeholder:text-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                    placeholder="Tìm kiếm hàng hóa... (F3)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </label>
                
                {/* Add Product Button */}
                <button className="flex items-center gap-2 h-10 px-4 rounded-lg border border-border-light bg-white hover:bg-gray-50 text-text-main text-sm font-medium transition-colors">
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                  <span className="hidden lg:inline">Thêm hàng hóa</span>
                  <span className="text-xs text-text-secondary">(F5)</span>
                </button>
                
                {/* View History Button */}
                <button className="flex items-center gap-2 h-10 px-4 rounded-lg border border-border-light bg-white hover:bg-gray-50 text-text-main text-sm font-medium transition-colors">
                  <span className="material-symbols-outlined text-lg">history</span>
                  <span className="hidden lg:inline">Xem lịch sử</span>
                  <span className="text-xs text-text-secondary">(F12)</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Category Filter Row */}
          <div className="px-5 py-3 bg-white border-b border-border-light">
            <CategoryFilter />
          </div>
          
          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto p-5 pb-24">
            <ProductGrid />
          </div>
        </main>
        
        {/* RIGHT PANEL: Order Management */}
        <CartPanel />
      </div>
      
      {/* Voice Command Bar (Bottom) */}
      <VoiceCommandBar />
      
      {/* Voice Modal */}
      <VoiceModal />
    </div>
  );
}
