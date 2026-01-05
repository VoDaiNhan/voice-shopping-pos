import { create } from 'zustand';
import type { Product, Category } from '@/types';

// Sample products data (from UI mockups)
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Bánh mì Sandwich',
    price: 15000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO_qTvLcxESllI_A72hLqaQHmx1HFW86lnqYZWthbshAIqZGfnaqTTnx1VTPj-iadFo-cJLekhkpMDtFz2TZIGjG5Y4Clk5l_YlaNX4tfTlVuisGaX7YrM6XcRXcAlC-iQxdO5vrBartbtTB5-ye9FLMPk9fpAVKN8stmq7j212GafK5S7MpIf-tVQ7eYkTu_iUEwTwTyTrlw4ArI4NGahl6zObcWv9g3e87pAaMoaeDl-IHcoymSd9jZIuQUDkGuD0ZwoSO9pFFGh',
    category: 'Bánh kẹo',
    stock: 54,
    sku: 'BM-001'
  },
  {
    id: '2',
    name: 'Sữa tươi Vinamilk 1L',
    price: 32000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-Wyh8_Iobjhh2-B5IoZm0Bjan78VqW3kLgRM4sjzP9G_JezlXkanJAJFoc0Rv0W6k-P6FmUUI7XeHaOHy9CVbgQR9xaoR1hHVhY_uJDoj2ubFGwjPtUwVhqzeinO8jUldpfqMuug6HxE4HooTVHeqGx8PuLTbqZxLoEG26XqdnDCiPiclKETINjH_ku9J-tTYJvRRHW4Cdoz2sOfq0zOC59fdroQzNfU6L3s4SO-dv3gUhpnUi1lfr53Nf7Su0rTpgrRJ-dSe9C6C',
    category: 'Đồ uống',
    stock: 28,
    sku: 'SU-001'
  },
  {
    id: '3',
    name: 'Mì Hảo Hảo Tôm Chua Cay',
    price: 4500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR1a_wnrDBpzve9mSrOSAFtgLa50FIsUOhAmYkJ-QU5r7JJfVYx2Pw7R_hPwScYP5QhUxnsUD2ihgwTmTPO7tlTUFJYR3ID4UI9Myk0s8NosZe0cDnz4XcbFYG5G1tok4gl4J3W6vqYuExyuKGdEtTyUZXbz2z3uiIFhLibKj-a40lgHuqYvyThwZN-bCmfalIleJgot9pr3FmNdAxu0u5o4nBya0V7uu-5FDC3im7uwvJ9_HlpB0O79DHca2OUoTl-_TryEJB7dQQ',
    category: 'Thực phẩm khô',
    stock: 120,
    sku: 'HH-001'
  },
  {
    id: '4',
    name: 'Coca Cola 330ml',
    price: 10000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYG21ArWc7v6OW_dXzT3lQneD1AHguKuYtFBrJvWXnY0jkpreNOVXJaN9SM0jj_WDS3WC_2ef1hfIBRFppd1Tvj52bMAUEQBnKC0cpTY8GiAa-xbD_C1Ks09KJgDBLvNYrg4qCePf_sI4Ny0HtYjVBn79xBK-cCOkg819EUxs5Fc_0EvOM1sWuAfmxI8wZKhbXUdVrdvaQSvQ3T1IGePyW-Hi-OqrPzrVZQTRLyrTG7YV0qh_VIttCE5lQfeOmo82iVCS1y3tlX42g',
    category: 'Đồ uống',
    stock: 45,
    sku: 'CC-330'
  },
  {
    id: '5',
    name: 'Gạo ST25 (Túi 5kg)',
    price: 180000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ZMJ4PXrktrQuDtfhuGL7J_1z9MtL4syIPV2s1jRswX51KVNzY-kxgtDZaGDtodlf1Q5w8K8_R0ADrDFa40a0TiSsGMphfZgPFXazOZRfaYzPDgdumPkh5P_n-If5XO5sVvvpXeN9hcu1aK2E-bAkomJGZ1dGWlONyR-KURrcg6foE8b3yGNRUYPmYMNRuifYYQqwY8lOk1Yh8tdILR2J0nHkEqLxlca8BxBi6bnnWtydic0xwTb_0sv7-jKyapvkGdz702WINR0z',
    category: 'Thực phẩm khô',
    stock: 15,
    sku: 'GA-25'
  },
  {
    id: '6',
    name: 'Trứng gà Ba Huân (Hộp 10)',
    price: 35000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBmQFJMPp6OYKneQkNNgEaM5i0D0aG80XDm62Y8fDqKG2GxN_m-lgfxzHtZxITapvm6oZ7fwaS2qrcEV-CwR4c2N6UgGlHX79Od9e_4mTTuz5Ak7zySmZ3EcA-X3P30rHkaGtbj3gPunV4osVXVNkS1Wz0P1zgLrxHS_CIBFtRBXPT99SCkCQfRfUxZPQM6xt17LfQsQmURkuTYBCOib1o5QNEOPbKnZceRnIFSMMx61GD6SnnacFYRQuO4ss-SiqRD7I6L3Kwn6LZ',
    category: 'Rau củ',
    stock: 30,
    sku: 'TR-001'
  },
  {
    id: '7',
    name: 'Dầu ăn Tường An 1L',
    price: 55000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAya5kv082WTJ6WqOSJOGkmwysj33eNV7nukly90cHNWpnm6f_jdr8PFPMs4IJGOOGY6sqTvRhd3i7nMNT2jzldn2sGVnyf513Qp9Nj6rZtFrALo2N8iyEJPry75ChqBZ3qpiRLrvl9nc0iP9CkIo92uHqmFFi8Kbpyjm_S1QvjLeRneIn2zVTAJCzqFLYz3KdB6iPgSJbm--5fOPe0DEI5HlnNZPYtsGXTbAdeOlyMmiAiIi5wrm3cFkrf4D7wdFhVizcNMRnNibZE',
    category: 'Gia dụng',
    stock: 24,
    sku: 'DA-101'
  },
  {
    id: '8',
    name: 'Nước tương Chin-su',
    price: 18000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwtuOU06JVqOlVNZgJEQgOn6k8agmaKflZLiKZ7pY415Q_A6dsWdkKqupC1fq441vP-wdb9cYcCsTtuK-7pdB_C92LWqFJArfz6APgqE3sR7ZNbz3pdamA84lxzN6ang8pGbuxQvMYoK4Klg1LJvU3l0qrT7IQDzU8GTJXIfxycyEBPIOQovd_JkBelqbPPlsBTNIZ8DFXpmIBKLNTbYiyKJvUCa2w6QkH5A6I1ofWEmuHFdxtDoPjNp7nFEhoiSvOAAzHD7_blYjt',
    category: 'Gia dụng',
    stock: 48,
    sku: 'NT-001'
  },
];

const categories: Category[] = [
  { id: 'all', name: 'Tất cả' },
  { id: 'rau-cu', name: 'Rau củ' },
  { id: 'do-uong', name: 'Đồ uống' },
  { id: 'banh-keo', name: 'Bánh kẹo' },
  { id: 'gia-dung', name: 'Gia dụng' },
  { id: 'thuc-pham-kho', name: 'Thực phẩm khô' },
];

interface ProductState {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  getFilteredProducts: () => Product[];
  findProductByName: (name: string) => Product | undefined;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: sampleProducts,
  categories,
  selectedCategory: 'all',
  searchQuery: '',
  
  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category });
  },
  
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },
  
  getFilteredProducts: () => {
    const { products, selectedCategory, searchQuery } = get();
    
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase());
      
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  },
  
  findProductByName: (name: string) => {
    const { products } = get();
    const searchName = name.toLowerCase().trim();
    
    // Try exact match first
    let found = products.find(p => p.name.toLowerCase() === searchName);
    
    // Try partial match
    if (!found) {
      found = products.find(p => 
        p.name.toLowerCase().includes(searchName) ||
        searchName.includes(p.name.toLowerCase().split(' ')[0])
      );
    }
    
    // Try matching keywords
    if (!found) {
      const keywords = searchName.split(' ');
      found = products.find(p => 
        keywords.some(keyword => 
          p.name.toLowerCase().includes(keyword) && keyword.length > 2
        )
      );
    }
    
    return found;
  },
}));
