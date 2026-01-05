import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { POSPage } from './pages/POSPage';
import { ProductsPage } from './pages/ProductsPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { SettingsPage } from './pages/SettingsPage';
import { InventoryImportPage } from './pages/InventoryImportPage';
import { InventoryStockPage } from './pages/InventoryStockPage';
import { SalesReportPage } from './pages/SalesReportPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'pos',
        element: <POSPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'orders',
        element: <OrderHistoryPage />,
      },
      {
        path: 'orders/:orderId',
        element: <OrderDetailPage />,
      },
      {
        path: 'inventory-import',
        element: <InventoryImportPage />,
      },
      {
        path: 'inventory',
        element: <InventoryStockPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'sales-report',
        element: <SalesReportPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
