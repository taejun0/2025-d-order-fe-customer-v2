// src/pages/orderList/apis/getOrderList.ts
// import axios from 'axios';

export interface RawOrderItem {
  type: 'menu' | 'setmenu';
  // menu
  menu_id?: number;
  menu_name?: string;
  menu_price?: number;
  menu_image?: string | null;
  menu_category?: string;

  // setmenu
  set_id?: number;
  set_name?: string;
  set_price?: number;
  set_image?: string | null;

  // 공통
  fixed_price?: number;
  quantity: number;
  status: 'pending' | 'cooked' | 'served';
}

export interface OrderListResponse {
  status: 'success' | 'error';
  code: number;
  data?: {
    order_amount: number;
    orders: RawOrderItem[];
  };
  message?: string;
}

export function toAbsoluteUrl(path?: string | null): string | null {
  if (!path) return null;

  const trimmed = String(path).trim();
  if (!trimmed || trimmed.toLowerCase() === 'null') return null; // 🔒 "null" 문자열 방어

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const base = (import.meta.env.VITE_BASE_URL ?? '').replace(/\/+$/, '');
  const rel = trimmed.replace(/^\/+/, '');
  return base ? `${base}/${rel}` : `/${rel}`;
}

/** ✅ 정규화된 아이템 타입 */
export type NormalizedOrderItem = {
  id: number;
  kind: 'menu' | 'setmenu';
  name: string;
  price: number; // ✅ fixed_price 우선
  image: string | null; // 절대 URL or null
  quantity: number;
};

/** ✅ 메뉴/세트를 공통 구조로 정규화: fixed_price → (menu|set)_price */
export function normalizeOrder(item: RawOrderItem): NormalizedOrderItem {
  const kind: 'menu' | 'setmenu' = item.type === 'setmenu' ? 'setmenu' : 'menu';

  const id = kind === 'menu' ? item.menu_id ?? 0 : item.set_id ?? 0;

  const name = kind === 'menu' ? item.menu_name ?? '' : item.set_name ?? '';

  const rawImg = kind === 'menu' ? item.menu_image : item.set_image;

  const image = toAbsoluteUrl(rawImg);

  // ✅ 가격: fixed_price 최우선 → (menu|set)_price 폴백
  const price =
    typeof item.fixed_price === 'number'
      ? item.fixed_price
      : kind === 'menu'
      ? typeof item.menu_price === 'number'
        ? item.menu_price
        : 0
      : typeof item.set_price === 'number'
      ? item.set_price
      : 0;

  const quantity = typeof item.quantity === 'number' ? item.quantity : 0;

  return { id, kind, name, price, image, quantity };
}

// const api = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL ?? '',
//   withCredentials: true,
//   headers: { 'Content-Type': 'application/json' },
// });

// ========== 목 데이터 ==========
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// const baseUrl = import.meta.env.BASE_URL;

// 목 데이터: 주문 목록
const mockOrderList: OrderListResponse = {
  status: 'success',
  code: 200,
  data: {
    order_amount: 106000,
    orders: [
      {
        type: 'menu',
        menu_id: 1,
        menu_name: '불고기 피자',
        menu_price: 25000,
        menu_image: null,
        menu_category: '메뉴',
        quantity: 2,
        fixed_price: 25000,
        status: 'cooked',
      },
      {
        type: 'menu',
        menu_id: 3,
        menu_name: '마르게리타 피자',
        menu_price: 20000,
        menu_image: null,
        menu_category: '메뉴',
        quantity: 1,
        fixed_price: 20000,
        status: 'pending',
      },
      {
        type: 'menu',
        menu_id: 4,
        menu_name: '콜라',
        menu_price: 2000,
        menu_image: null,
        menu_category: '음료',
        quantity: 3,
        fixed_price: 2000,
        status: 'cooked',
      },
      {
        type: 'menu',
        menu_id: 9,
        menu_name: '오렌지 주스',
        menu_price: 3000,
        menu_image: null,
        menu_category: '음료',
        quantity: 2,
        fixed_price: 3000,
        status: 'served',
      },
      {
        type: 'setmenu',
        set_id: 1,
        set_name: '피자 세트 A',
        set_price: 26000,
        set_image: null,
        quantity: 1,
        fixed_price: 26000,
        status: 'served',
      },
      {
        type: 'menu',
        menu_id: 2,
        menu_name: '페퍼로니 피자',
        menu_price: 22000,
        menu_image: null,
        menu_category: '메뉴',
        quantity: 1,
        fixed_price: 22000,
        status: 'pending',
      },
      {
        type: 'menu',
        menu_id: 5,
        menu_name: '사이다',
        menu_price: 2000,
        menu_image: null,
        menu_category: '음료',
        quantity: 1,
        fixed_price: 2000,
        status: 'cooked',
      },
    ],
  },
};

export async function getOrderList(_tableNum: number, _boothId: number) {
  await delay(500);
  return mockOrderList;
}

// ========== 기존 API 코드 (주석 처리) ==========
// export async function getOrderList(tableNum: number, boothId: number) {
//   const res = await api.get<OrderListResponse>(`/api/v2/tables/${tableNum}/orders/`, {
//     headers: { "booth-id": String(boothId) },
//   });
//   return res.data;
// }
