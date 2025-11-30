import { createBrowserRouter } from 'react-router-dom';
import { useGoogleAnalytics } from '@hooks/useGoogleAnalytics'; // GA 훅 import
// components
import DefaultLayout from '@components/layout/DefaultLayout';

import { ROUTE_CONSTANTS } from '@constants/RouteConstants';

// pages
import LoginPage from '@pages/login/LoginPage';
import OrderListPage from '@pages/orderList/OrderListPage';
import MenulistPage from '@pages/menulistpage/MenuListPage';
import ShoppingCartPage from '@pages/shoppingCart/ShoppingCartpage';
import StaffCodePage from '@pages/staffCode/StaffCodePage';
import OrderCompletePage from '@pages/staffCode/OrderCompletePage';

// GA 추적을 위한 래퍼 컴포넌트
const LayoutWithAnalytics = ({ children }: { children: React.ReactNode }) => {
  useGoogleAnalytics(); // GA 자동 추적
  return <>{children}</>;
};

const router = createBrowserRouter(
  [
    {
      path: ROUTE_CONSTANTS.LOGIN,
      element: (
        <LayoutWithAnalytics>
          <DefaultLayout />
        </LayoutWithAnalytics>
      ),
      children: [
        { path: ROUTE_CONSTANTS.LOGIN, element: <LoginPage /> },
        { path: ROUTE_CONSTANTS.ORDERLIST, element: <OrderListPage /> },
        { path: ROUTE_CONSTANTS.SHOPPINGCART, element: <ShoppingCartPage /> },
        { path: ROUTE_CONSTANTS.MENULIST, element: <MenulistPage /> },
        { path: ROUTE_CONSTANTS.STAFFCODE, element: <StaffCodePage /> },
        { path: ROUTE_CONSTANTS.ORDERCOMPLETE, element: <OrderCompletePage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.PROD ? '/2025-d-order-fe-customer-v2' : '/',
  }
);

export default router;
