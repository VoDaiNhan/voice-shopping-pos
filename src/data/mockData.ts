// ====================
// TYPE DEFINITIONS
// ====================

export interface StatsCard {
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  trend: string;
  trendType: 'up' | 'down' | 'warning';
}

export interface Order {
  id: string;
  customer: string;
  status: 'completed' | 'shipping' | 'pending' | 'cancelled';
  total: string;
}

export interface BestSellingProduct {
  name: string;
  stock: number;
  revenue: string;
  sold: number;
  image: string;
}

export interface LowStockProduct {
  name: string;
  stock: number;
  maxStock: number;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface Activity {
  message: string;
  time: string;
  isNew: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  unit: string;
  price: number;
  image: string;
  category?: string;
  expiryDate?: string;
  status?: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expiring';
}

export interface Supplier {
  id: string;
  name: string;
}

// ====================
// DASHBOARD DATA
// ====================

export const statsCards: StatsCard[] = [
  {
    label: 'Doanh thu hôm nay',
    value: '5.200.000 ₫',
    icon: 'payments',
    iconColor: 'text-primary',
    trend: '+12% so với hôm qua',
    trendType: 'up',
  },
  {
    label: 'Đơn Online mới',
    value: '8',
    icon: 'shopping_cart',
    iconColor: 'text-blue-500',
    trend: '+2 đơn',
    trendType: 'up',
  },
  {
    label: 'Đơn chờ duyệt',
    value: '3',
    icon: 'pending_actions',
    iconColor: 'text-orange-500',
    trend: 'Cần xử lý ngay',
    trendType: 'warning',
  },
  {
    label: 'Sản phẩm sắp hết',
    value: '12',
    icon: 'inventory_2',
    iconColor: 'text-red-500',
    trend: '-5% tồn kho',
    trendType: 'down',
  },
];

export const recentOrders: Order[] = [
  { id: '#DH-7029', customer: 'Nguyễn Thị Lan', status: 'completed', total: '850.000 ₫' },
  { id: '#DH-7028', customer: 'Trần Văn Tú', status: 'shipping', total: '1.200.000 ₫' },
  { id: '#DH-7027', customer: 'Phạm Minh Hoàng', status: 'pending', total: '450.000 ₫' },
  { id: '#DH-7026', customer: 'Vũ Thị Mai', status: 'cancelled', total: '180.000 ₫' },
];

export const bestSellingProducts: BestSellingProduct[] = [
  {
    name: 'Mì Hảo Hảo Tôm Chua Cay',
    stock: 120,
    revenue: '4.950.000 ₫',
    sold: 45,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOim491UoIAdsvpAZEgvoxCMV4LVS9xKCpF9y_Cy50L64pHjGjm53ZPFWX3ZKT_QB4dgAl13oLKpy1A4eiRs3eNnkv9mB3DtUpDFFF3iAOGLT9y3eeO5JNkeXnEeihZxAZH0fokM-1Jg-myViOiZCgHGagUo5Lk6rqENCtOmGTq4v3lWaTYJQR7EvWSIO2-haB_CpbFi8OibV9w2GgBqTHPGTrQbdrbbAkFtIKBF_1X0c7Q2rDTh0A3XxpYZ1NDPKKg9VrQHyTLqON',
  },
  {
    name: 'Dầu ăn Neptune 1L',
    stock: 34,
    revenue: '1.540.000 ₫',
    sold: 28,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFsLWYO3lw-aTJP8QtucFcL3X_CHgsyfZ8e_-zrB4xcSl1nGwiHCsub0m1moAJmhb1bGtVx5RVQfEj60OpncUPiITA0W1KuaXJuWjq2HkJJlQ3f_F30GQkgOEydq9iYOKj28ax43EQloLthpmnOVF_zTUkin0onynAEHOtbowQLEfchVpZSDikRnrckiOIlVJEtmMTzz-uiEmMDYfjSQSJlh6iJe13wWVDa1lewvgLYciEQeM1Wz4lIIrxTIEmlleG1rTayXkTOwOM',
  },
  {
    name: 'Sữa tươi Vinamilk 1L',
    stock: 56,
    revenue: '735.000 ₫',
    sold: 21,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkljN602tZhfpq3YSZodJjrka_DBtlwDl3nFw0pIn6gx-ZMwCYPL09zz6G9nTGWWgAs6OesJXAT6G-s0yQ-L96I_RqygHBmS9ultmIJNcHgEj3WG6TstAFkqyRQ_2TTDhQjSicslq2ReZXL5uph8iWwfvP29KOHK6NPOh5LjP_SvHQ_jFO1Yz6ATfSEONYAnfhv3-a-GCDYZdGWNnrAa6g6Lh6iJhpJiMC3odjqrqw3KxNB-uy6k5te39eaY7VdG13O_p5qzlAenpQ',
  },
];

export const lowStockProducts: LowStockProduct[] = [
  { name: 'Nước mắm Nam Ngư', stock: 5, maxStock: 20, icon: 'water_drop', iconBg: 'bg-red-50', iconColor: 'text-red-500' },
  { name: 'Gạo ST25 (5kg)', stock: 8, maxStock: 20, icon: 'grain', iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { name: 'Tương ớt Chinsu', stock: 4, maxStock: 20, icon: 'local_fire_department', iconBg: 'bg-red-50', iconColor: 'text-red-500' },
];

export const recentActivities: Activity[] = [
  { message: 'Đơn #1023 vừa được thanh toán', time: '2 phút trước', isNew: true },
  { message: 'Nguyễn Văn A đã tạo đơn mới', time: '15 phút trước', isNew: false },
];

// ====================
// PRODUCTS DATA
// ====================

export const products: Product[] = [
  {
    id: '1',
    name: 'Sữa tươi TH True Milk 1L',
    sku: 'SP00123',
    stock: 120,
    unit: 'hộp',
    price: 28000,
    category: 'Sữa & Chế phẩm',
    expiryDate: '15/12/2024',
    status: 'in_stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXeaUTjahBFeuhNPPH9BxHyuAt1O4Ohsylti9BvWpcYUCZCH1y-ec5YL3sChXtzz3EsxTOg8Gg8GBhiJN-y8xvAgvMK6lqxVVIa4U4-H9AvB0uajsLDORt9x-CVQI_-TI5FqYP1e6bApB7IYSskqNRVB3WUfCtED3I3lh1AYeHydaU6CQlAZisi-lZkRcPi6j2d5RLJ-jQ27LM9ZWEzaI2cDjngdpptCIjAVrhVi0PFZpDX_0LSLmZDCGshcPy-IceVyRUOWinwKja',
  },
  {
    id: '2',
    name: 'Mì Hảo Hảo Tôm Chua Cay',
    sku: 'SP00456',
    stock: 250,
    unit: 'gói',
    price: 4500,
    category: 'Đồ khô & Ăn liền',
    expiryDate: '20/08/2024',
    status: 'in_stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4UJh0MkeSXY14pZ3nndfmQoiaj1EBy2KT3AP0_CijD9FVBdq1nEwvCcCUiHSR1eYsRplYxbs0cvqvU19ZWBkkkNFjvUBSPB-GsP4djJV3VUaNYqEpq8ofJi7bgq1u6e9gE6JzTZ3lVHMlPxMKkEOPsTT5pGDu6pMJ-PU0q8qL_U8qxGZ7Jg3Qqe8TOck8i1hkUec9sXW7JGqowFA_jdyuPhnUhXDG1PtuX1gYCa_nPSY2bF5Jh0oE4vclDZwM-XH97EalweUQS6SU',
  },
  {
    id: '3',
    name: 'Coca Cola Lon 330ml',
    sku: 'SP00789',
    stock: 48,
    unit: 'lon',
    price: 9500,
    category: 'Đồ uống',
    expiryDate: '01/01/2025',
    status: 'in_stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfVXDKpR5TO_7RinHtJIBkiGRmQ5ICVxBRhel44x9eHDVrvU5n0lrD8_0L37Br2uNpTkcNTbPgXyY84yvatGmXFvwawQ3asAE_w-bgcAxhSjxhVjlayNZS2Cmwqenh6gWX1cGVZ8EHOnrvJsv6kRoa3TwDyuwFaYSzofCO3iP_0rpfa7wIpZhGS2yzgFygwMc_cfYwO1KKnJ8u8R2R_E_tt-3a12kdsRB37q21a-luRyuJEVbo2U4EM_yBjadLHahC4LTvE00GCYog',
  },
  {
    id: '4',
    name: 'Dầu ăn Tường An 1L',
    sku: 'SP00888',
    stock: 24,
    unit: 'chai',
    price: 45000,
    category: 'Gia vị & Dầu ăn',
    expiryDate: '10/06/2025',
    status: 'in_stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzhgD1OC5MBCZW72q-bMrQ_gGL-FKEPMPB5NCSHVGP_J_68OJHW4oAZ3C2PV9TK-z78yhHAo9JCMZzM6RblaeBvJiDYL1139LaojuVcVMTNiuJegtRwD_3IQp8IGZiVIPPbqj1cwV8Tn4kmZozsTQewmISGZBHN_6fbwkm2ZliTDXs2XtTONGDYmHke0j8-8KPxtftEHs7x-JuDFE3r5i5oLS5i59jAgjSaeJhe0QIGOrxXxXjmucJZJgOeUMWqbALDL4Tu2lUkmGq',
  },
  {
    id: '5',
    name: 'Snack Oishi Bắp Ngọt',
    sku: 'SP00333',
    stock: 50,
    unit: 'gói',
    price: 5000,
    category: 'Bánh & Đồ ngọt',
    expiryDate: '15/05/2024',
    status: 'in_stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKCO5J_xENzPsPSPdeI7SCs5bIFPK9Ht_iDEVYSh2izbPoRqZKOjUPyDeIy4WovGrTZRKqX5Rp8PWqwE4N8TMPTI5x0Ul9d63VpDzAJZm_Nfv5koY48B1_vfAtBLyktkkOlahtVAQQpINJ8rk98jZn8BYzPP4t7OH_iXPzRsjj3DjmfW8HFjp86O395wzE0Vy72NelhARuOEsk_tmpuRWzwmFCedswfoTQp0qaDalZhB8SrTUZsMNpYy3v6-dQE2QHZs5n3ZRfeluA',
  },
  {
    id: '6',
    name: 'Bia Tiger Crystal',
    sku: 'SP00999',
    stock: 10,
    unit: 'thùng',
    price: 360000,
    category: 'Đồ uống',
    expiryDate: '20/03/2025',
    status: 'low_stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9aJ2j-7ekYBlcxQ4_KmPz2SW_h5Ws_rIpFYqZKp-UEZHjLdxD-rkCLpltLEsJm-TXSW9Ka4CsFjymoxBcEUlbryZ-qtzPIiwDfqc-6pVVhNrZeyw1Em6bZz6nA5j6vEzPKUhGRMP6VcCKAPVz0jnTRWq9KHr5UyyJubyLHX3TEleXFsQ2zvPHo4i0VJ54paTF-rUacBcexPlbSglT4y_IP3YlLR2bsryJsX-Sxrc8dK-dEbwuylUCkxE0oNYifCfwLfWPlWH4lRtF',
  },
];

// ====================
// INVENTORY DATA
// ====================

export const inventoryData: Product[] = [
  {
    id: '1',
    name: 'Sữa tươi Vinamilk 1L',
    sku: 'VNM-1001',
    category: 'Sữa & Chế phẩm',
    stock: 45,
    unit: 'Hộp',
    price: 32000,
    expiryDate: '15/12/2024',
    status: 'in_stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAwVEL-1pIe2y02TfMXQ3vc70DsPyVoXRZWL9HDe6BG01CUM-4XgfMvd-rldgYvuiVLKHR945c6EdU-o7E0UWb9z86EbG-WL3lYg18W6gjFIuP13u-dzEaQ4JvG9aGiZi6cf2btGrFJYET_xBbpoY99QaLH4slP_q77kEzoBWhQ2Wds812WOfBcutMJlVFQc-IgstJnzerQTESoLT6yxCE1SnjSSXTNlP0WSeaYYh7_LdA989fxf2mF9_E0tdtFoXHcapacj6vHUCB',
  },
  {
    id: '2',
    name: 'Xúc xích Đức Việt 500g',
    sku: 'DV-500G',
    category: 'Thực phẩm chế biến',
    stock: 12,
    unit: 'Gói',
    price: 65000,
    expiryDate: '25/10/2023',
    status: 'expiring',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAblljA8zpKXkqN0hORfv2jSPPdrgVX0tNB9HDlB2JBduou2exzQJsKcFX6cr5ZyH28u1AU61uRlw0gmhnpNGX9rN26zohp3Rt6YRB8ug9oj72b9c-OeCXakKcgKhjkq9RziJXRYKx4QgITyYNNXL2zR2H4NovSLg7-8MZBJsckOptwhKm6dCGCKLntCVok5ylxZiONzJ4ZqRPoG75rm4NFkdD6Kyy3aumNiEScjg9srBWL4EU_BJLV8kDGUf7qJpPvvJPN7D4H3Fd',
  },
  {
    id: '3',
    name: 'Dầu ăn Simply 2L',
    sku: 'SIM-2L',
    category: 'Gia vị & Dầu ăn',
    stock: 0,
    unit: 'Chai',
    price: 85000,
    expiryDate: '10/06/2025',
    status: 'out_of_stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe9boD_SlI22Bfb4MZdkZbkwqs8C3S5PhokbU7Bp9MNMpph-IHLGrMCggkooX7kwbsBg8w7tgDSHqDREHSi9ijUcUObws7qDKOEyFk929oI47cK25kFByWsJpC7cyTJjJ6p0IGzPD-UBIqbhbJ4oCqqtAXAHbv2TxYXH7aQLaBOwQUvoEmThWJDCR0LXK3Wvr5v08qnNY6TsszDMJx8NNvtFY4dpwkTY4CBRz2u3vzEpFBiKjPtxUB0M77xAmwABGH_9fq04Ne8KbX',
  },
  {
    id: '4',
    name: 'Mì Hảo Hảo Tôm Chua Cay',
    sku: 'HH-TCC',
    category: 'Đồ khô & Ăn liền',
    stock: 250,
    unit: 'Gói',
    price: 4500,
    expiryDate: '20/08/2024',
    status: 'in_stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfAxt2rz-r4f0ieQGqxozlIVv9D694nLaZpE2aCPW_AG1r9O2nwBbJ-3B-CxMZz4lzuRQgGuEOFXQ4kJIO6vltQiwKg5LOZF-e--UTr2UuI5uA-VAzxNbUDi_156HqB8GvmODgWIpd40qcLpFZHuDgG-CYEXvc8T5VxiDWc2tskez086Bt1XjnDbHnN9-DvRJcGzedSNiw49_UiMl-BGwlesgQYMj-ogjkHwwwKDsQGvIDy41E6FoNW4adwioCkrmO2mRM8K4RFzic',
  },
  {
    id: '5',
    name: 'Coca-Cola 330ml',
    sku: 'COC-330',
    category: 'Đồ uống',
    stock: 5,
    unit: 'Lon',
    price: 10000,
    expiryDate: '01/01/2025',
    status: 'low_stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbwkrkkX861WFTewYbPq8Yk0yzJHN1PJ-Xmfmgi8kj1s_59V5zPFCd5ugQRtrrl6_Rx8rBgqifnX6gLJUhbvjpLNdfPzL_pUcx2BUwYkdAhfWSYiHGb4IkVOY7JnBKLhiZI-XYNDxCK_ksn7khfFR1YBIrQwMdGjniJIvE_jp4TwcrthnsQ3uMlHiWcmyejFO2QN79ZSgbPhDcY9moHrtlAO5qmMhXr3DjLp29jBi33uxLCUkA9WZvUZw7xgVMbhQYT5kBCZjF273Q',
  },
  {
    id: '6',
    name: 'Bánh mì Sandwich',
    sku: 'BM-SW01',
    category: 'Bánh & Đồ ngọt',
    stock: 30,
    unit: 'Gói',
    price: 15000,
    expiryDate: '28/10/2023',
    status: 'expiring',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXeaUTjahBFeuhNPPH9BxHyuAt1O4Ohsylti9BvWpcYUCZCH1y-ec5YL3sChXtzz3EsxTOg8Gg8GBhiJN-y8xvAgvMK6lqxVVIa4U4-H9AvB0uajsLDORt9x-CVQI_-TI5FqYP1e6bApB7IYSskqNRVB3WUfCtED3I3lh1AYeHydaU6CQlAZisi-lZkRcPi6j2d5RLJ-jQ27LM9ZWEzaI2cDjngdpptCIjAVrhVi0PFZpDX_0LSLmZDCGshcPy-IceVyRUOWinwKja',
  },
];

// ====================
// SUPPLIERS DATA
// ====================

export const suppliers: Supplier[] = [
  { id: '1', name: 'Công ty TH True Milk' },
  { id: '2', name: 'Coca Cola Việt Nam' },
  { id: '3', name: 'Nhà Phân Phối Tường An' },
  { id: '4', name: 'Acecook Việt Nam' },
  { id: '5', name: 'Heineken Việt Nam' },
];

export const supplierNames = suppliers.map((s) => s.name);

// ====================
// CATEGORIES DATA
// ====================

export const categories = [
  'Tất cả',
  'Sữa & Chế phẩm',
  'Thực phẩm chế biến',
  'Gia vị & Dầu ăn',
  'Đồ khô & Ăn liền',
  'Đồ uống',
  'Bánh & Đồ ngọt',
];

// ====================
// HELPER FUNCTIONS
// ====================

export function getOrderStatusLabel(status: Order['status']): string {
  const labels: Record<Order['status'], string> = {
    completed: 'Hoàn thành',
    shipping: 'Đang giao',
    pending: 'Chờ duyệt',
    cancelled: 'Đã hủy',
  };
  return labels[status];
}

export function getOrderStatusStyle(status: Order['status']): string {
  const styles: Record<Order['status'], string> = {
    completed: 'bg-green-100 text-green-800',
    shipping: 'bg-blue-100 text-blue-800',
    pending: 'bg-orange-100 text-orange-800',
    cancelled: 'bg-gray-100 text-gray-600',
  };
  return styles[status];
}

export function getProductStatusLabel(status: Product['status']): string {
  const labels: Record<NonNullable<Product['status']>, string> = {
    in_stock: 'Còn hàng',
    low_stock: 'Sắp hết',
    out_of_stock: 'Hết hàng',
    expiring: 'Sắp hết hạn',
  };
  return status ? labels[status] : '';
}

export function getProductStatusStyle(status: Product['status']): string {
  const styles: Record<NonNullable<Product['status']>, string> = {
    in_stock: 'bg-green-100 text-green-800',
    low_stock: 'bg-yellow-100 text-yellow-800',
    out_of_stock: 'bg-gray-100 text-gray-600',
    expiring: 'bg-orange-100 text-orange-800',
  };
  return status ? styles[status] : '';
}

export function getStockColor(stock: number): string {
  if (stock === 0) return 'text-red-600';
  if (stock <= 10) return 'text-orange-600';
  return 'text-text-main';
}

export function generateReceiptCode(): string {
  return `PN${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`;
}

// ====================
// EXTENDED ORDER TYPES & DATA (for OrderHistoryPage & OrderDetailPage)
// ====================

export type OrderStatus = 'pending' | 'shipping' | 'completed' | 'cancelled';

export interface OrderProduct {
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  address: string;
  type: string;
  initials: string;
  initialsBg: string;
  initialsColor: string;
}

export interface OrderItem {
  id: string;
  status: OrderStatus;
  createdAt: string;
  timeAgo: string;
  customer: OrderCustomer;
  products: OrderProduct[];
  note: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
}

// Predefined colors for customer initials
const customerColors = [
  { bg: 'bg-[#e7f3eb]', color: 'text-[#4e9767]' },
  { bg: 'bg-[#ffe0e0]', color: 'text-[#d64545]' },
  { bg: 'bg-[#e0f2fe]', color: 'text-[#0369a1]' },
  { bg: 'bg-[#fae8ff]', color: 'text-[#86198f]' },
  { bg: 'bg-[#fff7ed]', color: 'text-[#ea580c]' },
  { bg: 'bg-[#f3e8ff]', color: 'text-[#7e22ce]' },
  { bg: 'bg-[#dcfce7]', color: 'text-[#16a34a]' },
  { bg: 'bg-[#fef2f2]', color: 'text-[#dc2626]' },
];

export function getInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return parts[0][0] + parts[parts.length - 1][0];
  }
  return name.substring(0, 2).toUpperCase();
}

// Sample product images for orders (reusing from existing data)
const productImages = {
  'Gạo ST25': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8YZq_9j3Z9SmxdVC_ZfIbStzvmjwSyEudHI0bmQoWsyqdp04g3yU0H64jKK1sIdnYw10qHF6zuFMB8111zefyXASesRX2C3rN84rP4d4WUY8SldvobLDExijUjlSim0nCYw-4in373LB-wyLfBaofXRVtUA_kvzrN2XRiN15hz16bXthd82dXwXk_fZ2DT4kSIGcpG0tHjS8PWCTUwTS6b_F_VHCSvCji_hgHlhNsMFwX9f-zqDe3J9BQGMRUZrpj4UTd-AMN_HLf',
  'Nước mắm': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqLFdZaMu9D0HUtnhx1cFHyRTDXlPKd6TD51rbrB5o2tU3m85GKtF6sPs6oyMpqf8_7md9GEjTlp3bKQQpaH5TJa3QrkRZO2EcHN2QPU7ZTQkXHQZQoQQx0x3YWnEChk7yiy5NmgbVPPpdvD5NdkViRiiz04GxxPuBNQdTI88XoIVoAbwdi6WYJ1-XWACLE_bljRUBHhxLVb5BvfyEG5ejJxQZN2vXsRk9fuv8mV3bOk6xY8UAsHM9a3AO1l-0HPpA6dO0mwwXSj6h',
  'Dầu ăn': 'https://lh3.googleusercontent.com/aida-public/AB6AXuD52OU9pBoquHp_5JH1d_GBSUrUTfvBpqMYe0XNY3weFDYQur4tG5hxGwvPGaYZQLFcoRuc_yG8f1mz1b9-otJPYBvxYxy9eYrPR_mCRMcFfpLWcEYq5nWfna3GPsvWbTaA5U1XFFVRadWDpJ4pNyqZnC-LWx8a3sn5ZJgB5SUNDEHYLVH_Jzwa2H5dNxzuvxAUDiYYBMhQvm4zojF5kwqSqdGGMzpheUgXo-rNPaZH3Pok1_tXXScQ1_uST_eYhalDKVtBFQTdUQEM',
  'Mì Hảo Hảo': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfAxt2rz-r4f0ieQGqxozlIVv9D694nLaZpE2aCPW_AG1r9O2nwBbJ-3B-CxMZz4lzuRQgGuEOFXQ4kJIO6vltQiwKg5LOZF-e--UTr2UuI5uA-VAzxNbUDi_156HqB8GvmODgWIpd40qcLpFZHuDgG-CYEXvc8T5VxiDWc2tskez086Bt1XjnDbHnN9-DvRJcGzedSNiw49_UiMl-BGwlesgQYMj-ogjkHwwwKDsQGvIDy41E6FoNW4adwioCkrmO2mRM8K4RFzic',
  'Coca Cola': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbwkrkkX861WFTewYbPq8Yk0yzJHN1PJ-Xmfmgi8kj1s_59V5zPFCd5ugQRtrrl6_Rx8rBgqifnX6gLJUhbvjpLNdfPzL_pUcx2BUwYkdAhfWSYiHGb4IkVOY7JnBKLhiZI-XYNDxCK_ksn7khfFR1YBIrQwMdGjniJIvE_jp4TwcrthnsQ3uMlHiWcmyejFO2QN79ZSgbPhDcY9moHrtlAO5qmMhXr3DjLp29jBi33uxLCUkA9WZvUZw7xgVMbhQYT5kBCZjF273Q',
  'Sữa Vinamilk': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAwVEL-1pIe2y02TfMXQ3vc70DsPyVoXRZWL9HDe6BG01CUM-4XgfMvd-rldgYvuiVLKHR945c6EdU-o7E0UWb9z86EbG-WL3lYg18W6gjFIuP13u-dzEaQ4JvG9aGiZi6cf2btGrFJYET_xBbpoY99QaLH4slP_q77kEzoBWhQ2Wds812WOfBcutMJlVFQc-IgstJnzerQTESoLT6yxCE1SnjSSXTNlP0WSeaYYh7_LdA989fxf2mF9_E0tdtFoXHcapacj6vHUCB',
  'default': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXeaUTjahBFeuhNPPH9BxHyuAt1O4Ohsylti9BvWpcYUCZCH1y-ec5YL3sChXtzz3EsxTOg8Gg8GBhiJN-y8xvAgvMK6lqxVVIa4U4-H9AvB0uajsLDORt9x-CVQI_-TI5FqYP1e6bApB7IYSskqNRVB3WUfCtED3I3lh1AYeHydaU6CQlAZisi-lZkRcPi6j2d5RLJ-jQ27LM9ZWEzaI2cDjngdpptCIjAVrhVi0PFZpDX_0LSLmZDCGshcPy-IceVyRUOWinwKja',
};

export const ordersData: OrderItem[] = [
  {
    id: 'ORD-2839',
    status: 'pending',
    createdAt: '10:30 - 24/10/2023',
    timeAgo: '15 phút trước (10:30 AM)',
    customer: {
      name: 'Nguyễn Văn A',
      phone: '0901 234 567',
      address: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      type: 'Khách hàng thân thiết',
      initials: 'NA',
      initialsBg: customerColors[0].bg,
      initialsColor: customerColors[0].color,
    },
    products: [
      { name: 'Gạo ST25 (5kg)', sku: 'ST25-5KG', price: 150000, quantity: 1, image: productImages['Gạo ST25'] },
      { name: 'Nước mắm Nam Ngư', sku: 'NUOCMAM-500', price: 35000, quantity: 2, image: productImages['Nước mắm'] },
      { name: 'Dầu ăn Neptune 1L', sku: 'NEP-OIL-1L', price: 45000, quantity: 2, image: productImages['Dầu ăn'] },
    ],
    note: 'Giao hàng sau 5h chiều giúp mình nhé. Đến nơi gọi số 0909... đừng bấm chuông vì nhà có em bé.',
    subtotal: 310000,
    shippingFee: 25000,
    discount: 0,
    total: 335000,
    paymentMethod: 'Thanh toán khi nhận hàng (COD)',
  },
  {
    id: 'ORD-2840',
    status: 'pending',
    createdAt: '10:13 - 24/10/2023',
    timeAgo: '32 phút trước (10:13 AM)',
    customer: {
      name: 'Trần Thị B',
      phone: '0912 987 654',
      address: '456 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
      type: 'Khách hàng mới',
      initials: 'TB',
      initialsBg: customerColors[1].bg,
      initialsColor: customerColors[1].color,
    },
    products: [
      { name: 'Vỉ trứng gà (10 quả)', sku: 'TRUNG-10', price: 35000, quantity: 1, image: productImages['default'] },
      { name: 'Sữa tươi Vinamilk 1L', sku: 'SUA-VNM-1L', price: 32000, quantity: 2, image: productImages['Sữa Vinamilk'] },
    ],
    note: '',
    subtotal: 99000,
    shippingFee: 21000,
    discount: 0,
    total: 120000,
    paymentMethod: 'Thanh toán khi nhận hàng (COD)',
  },
  {
    id: 'ORD-2841',
    status: 'pending',
    createdAt: '09:45 - 24/10/2023',
    timeAgo: '1 giờ trước (09:45 AM)',
    customer: {
      name: 'Lê Văn C',
      phone: '0988 111 222',
      address: '789 Võ Văn Tần, Quận 3, TP. Hồ Chí Minh',
      type: 'Khách hàng VIP',
      initials: 'LC',
      initialsBg: customerColors[2].bg,
      initialsColor: customerColors[2].color,
    },
    products: [
      { name: 'Thùng bia Tiger', sku: 'TIGER-24', price: 360000, quantity: 2, image: productImages['default'] },
      { name: 'Snack khoai tây Lay\'s', sku: 'LAYS-150G', price: 25000, quantity: 5, image: productImages['default'] },
    ],
    note: 'Gọi trước khi giao 30 phút.',
    subtotal: 845000,
    shippingFee: 0,
    discount: 0,
    total: 845000,
    paymentMethod: 'Chuyển khoản ngân hàng',
  },
  {
    id: 'ORD-2842',
    status: 'pending',
    createdAt: '09:40 - 24/10/2023',
    timeAgo: '1 giờ trước (09:40 AM)',
    customer: {
      name: 'Phạm Minh D',
      phone: '0977 555 666',
      address: '12 Trần Hưng Đạo, Quận 5, TP. Hồ Chí Minh',
      type: 'Khách hàng mới',
      initials: 'PD',
      initialsBg: customerColors[3].bg,
      initialsColor: customerColors[3].color,
    },
    products: [
      { name: 'Dầu ăn Tường An 1L', sku: 'TA-1L', price: 45000, quantity: 1, image: productImages['Dầu ăn'] },
      { name: 'Gói bột ngọt Vedan', sku: 'VEDAN-500G', price: 25000, quantity: 1, image: productImages['default'] },
    ],
    note: '',
    subtotal: 70000,
    shippingFee: 15000,
    discount: 0,
    total: 85000,
    paymentMethod: 'Thanh toán khi nhận hàng (COD)',
  },
  {
    id: 'ORD-2843',
    status: 'shipping',
    createdAt: '08:50 - 24/10/2023',
    timeAgo: '2 giờ trước (08:50 AM)',
    customer: {
      name: 'Đỗ Thị E',
      phone: '0944 333 111',
      address: '34 Lý Thường Kiệt, Quận 10, TP. Hồ Chí Minh',
      type: 'Khách hàng thân thiết',
      initials: 'ĐE',
      initialsBg: customerColors[4].bg,
      initialsColor: customerColors[4].color,
    },
    products: [
      { name: 'Combo rau củ quả tổng hợp', sku: 'RAU-COMBO', price: 55000, quantity: 1, image: productImages['default'] },
      { name: 'Cà chua (1kg)', sku: 'CACHUA-1KG', price: 40000, quantity: 1, image: productImages['default'] },
    ],
    note: '',
    subtotal: 95000,
    shippingFee: 0,
    discount: 0,
    total: 95000,
    paymentMethod: 'Thanh toán khi nhận hàng (COD)',
  },
  {
    id: 'ORD-2844',
    status: 'shipping',
    createdAt: '08:30 - 24/10/2023',
    timeAgo: '2 giờ trước (08:30 AM)',
    customer: {
      name: 'Hoàng Văn F',
      phone: '0933 666 999',
      address: '56 CMT8, Quận 3, TP. Hồ Chí Minh',
      type: 'Khách hàng mới',
      initials: 'HF',
      initialsBg: customerColors[5].bg,
      initialsColor: customerColors[5].color,
    },
    products: [
      { name: 'Nước ngọt Coca Cola 1.5L', sku: 'COKE-1.5L', price: 18000, quantity: 3, image: productImages['Coca Cola'] },
      { name: 'Nước cam ép Twister', sku: 'TWISTER-500', price: 15000, quantity: 2, image: productImages['default'] },
    ],
    note: '',
    subtotal: 84000,
    shippingFee: 20000,
    discount: 0,
    total: 104000,
    paymentMethod: 'Thanh toán khi nhận hàng (COD)',
  },
  {
    id: 'ORD-2835',
    status: 'completed',
    createdAt: '07:30 - 24/10/2023',
    timeAgo: '3 giờ trước (07:30 AM)',
    customer: {
      name: 'Nguyễn Thị G',
      phone: '0909 777 888',
      address: '78 Nguyễn Đình Chiểu, Quận 1, TP. Hồ Chí Minh',
      type: 'Khách hàng VIP',
      initials: 'NG',
      initialsBg: customerColors[6].bg,
      initialsColor: customerColors[6].color,
    },
    products: [
      { name: 'Sữa đặc Ông Thọ', sku: 'ONGTHO-380G', price: 22000, quantity: 5, image: productImages['default'] },
      { name: 'Mì Hảo Hảo (Thùng)', sku: 'HH-THUNG', price: 105000, quantity: 1, image: productImages['Mì Hảo Hảo'] },
    ],
    note: '',
    subtotal: 215000,
    shippingFee: 0,
    discount: 0,
    total: 215000,
    paymentMethod: 'Chuyển khoản ngân hàng',
  },
  {
    id: 'ORD-2830',
    status: 'cancelled',
    createdAt: '16:20 - 23/10/2023',
    timeAgo: 'Hôm qua (16:20 PM)',
    customer: {
      name: 'Trần Văn H',
      phone: '0912 000 111',
      address: '90 Hai Bà Trưng, Quận 1, TP. Hồ Chí Minh',
      type: 'Khách hàng mới',
      initials: 'TH',
      initialsBg: customerColors[7].bg,
      initialsColor: customerColors[7].color,
    },
    products: [
      { name: 'Thịt ba chỉ (1kg)', sku: 'THIT-BACHI', price: 180000, quantity: 2, image: productImages['default'] },
      { name: 'Rau muống (bó)', sku: 'RAU-MUONG', price: 8000, quantity: 3, image: productImages['default'] },
    ],
    note: 'Khách yêu cầu hủy vì thay đổi kế hoạch.',
    subtotal: 384000,
    shippingFee: 25000,
    discount: 0,
    total: 409000,
    paymentMethod: 'Thanh toán khi nhận hàng (COD)',
  },
];

// Helper function to get order by ID
export function getOrderById(orderId: string): OrderItem | undefined {
  return ordersData.find(order => order.id === orderId || order.id === `#${orderId}` || `#${order.id}` === orderId);
}

// Order status config for styling
export const orderStatusConfig: Record<OrderStatus, { label: string; class: string; dot: string }> = {
  pending: { label: 'Chờ xác nhận', class: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
  shipping: { label: 'Đang giao', class: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  completed: { label: 'Hoàn thành', class: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  cancelled: { label: 'Đã hủy', class: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
};

// ====================
// SALES REPORT DATA
// ====================

export interface SalesStats {
  totalRevenue: number;
  revenueGrowth: string;
  totalOrders: number;
  orderGrowth: string;
  onlinePercent: number;
  offlinePercent: number;
}

export interface PromotionStats {
  revenue: number;
  revenueGrowth: string;
  usageCount: number;
  usageGrowth: string;
  avgDiscount: number;
  discountChange: string;
}

export interface TopPromotion {
  code: string;
  name: string;
  discount: string;
  usages: number;
  revenue: string;
  color: string;
  progress: number;
}

export interface ExpiringProduct {
  id: number;
  name: string;
  code: string;
  stock: string;
  expiryDate: string;
  status: string;
  statusType: 'danger' | 'warning';
  icon: string;
}

export interface ActivityLogItem {
  id: number;
  user: string;
  action: string;
  detail: string;
  time: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export const salesStats: SalesStats = {
  totalRevenue: 15450000,
  revenueGrowth: '+5.2%',
  totalOrders: 124,
  orderGrowth: '+12%',
  onlinePercent: 45,
  offlinePercent: 55,
};

export const weeklyChartData = [
  { day: 'T2', value: 45 },
  { day: 'T3', value: 60 },
  { day: 'T4', value: 35 },
  { day: 'T5', value: 75 },
  { day: 'T6', value: 90 },
  { day: 'T7', value: 80 },
  { day: 'CN', value: 50 },
];

export const promotionStats: PromotionStats = {
  revenue: 3250000,
  revenueGrowth: '+8.5%',
  usageCount: 45,
  usageGrowth: '+12 lượt',
  avgDiscount: 15,
  discountChange: '-2%',
};

export const topPromotions: TopPromotion[] = [
  { code: 'WEEKEND20', name: 'Giảm giá cuối tuần', discount: '20%', usages: 22, revenue: '1.2tr', color: 'bg-yellow-400', progress: 65 },
  { code: 'FREESHIP', name: 'Giảm phí ship', discount: '10k', usages: 15, revenue: '850k', color: 'bg-blue-400', progress: 45 },
];

// Use inventoryData for expiring products filtering
export const expiringProducts: ExpiringProduct[] = [
  { id: 1, name: 'Sữa Chua Vinamilk Có Đường (Lốc 4)', code: 'VNM-SC-01', stock: '45 lốc', expiryDate: '25/10/2023', status: 'Hết hạn hôm nay', statusType: 'danger', icon: 'icecream' },
  { id: 2, name: 'Bánh Mì Sandwich Kinh Đô', code: 'KD-SW-22', stock: '12 gói', expiryDate: '28/10/2023', status: 'Còn 3 ngày', statusType: 'warning', icon: 'bakery_dining' },
];

export const activityLog: ActivityLogItem[] = [
  { id: 1, user: 'Nguyễn Văn A', action: 'đã tạo đơn', detail: 'Đơn hàng #DH-2023005', time: '5 phút trước', icon: 'person', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 2, user: 'Trần Thị B', action: 'sửa giá bán', detail: 'Coca Cola: 10k -> 12k', time: '30 phút trước', icon: 'edit_note', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { id: 3, user: 'Kho', action: 'nhập hàng mới', detail: 'Phiếu nhập #PN-112 (150sp)', time: '2 giờ trước', icon: 'inventory', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: 4, user: 'Admin', action: 'xóa sản phẩm', detail: 'Kẹo Sing-gum (Ngừng kinh doanh)', time: '1 ngày trước', icon: 'delete', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
];

// Sales orders for history table (derived from ordersData for consistency)
export const salesOrdersForTable = ordersData.map(order => ({
  id: `#DH-${order.id.split('-')[1]}`,
  time: order.createdAt,
  customer: order.customer.name,
  phone: order.customer.phone,
  type: Math.random() > 0.5 ? 'Online' : 'Tại quầy',
  total: order.total,
  status: order.status,
}));

