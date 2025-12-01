// src/pages/MenuListPage/_services/MenuListService.ts

export type ApiSeat = {
  seat_type: 'table' | 'person' | 'none' | string;
  seat_tax_table?: number;
  seat_tax_person?: number;
  is_seatfee_soldout?: boolean;
};

export type ApiMenu = {
  menu_id: number;
  booth_id: number;
  menu_name: string;
  menu_description: string;
  menu_category: '메뉴' | '음료' | 'seat_fee' | string;
  menu_price: number;
  menu_amount: number;
  menu_image: string | null;
  is_soldout: boolean;
};

export type ApiSetMenu = {
  booth_id: number;
  is_soldout: boolean;
  origin_price: number;
  min_menu_amount: number;
  set_name: string;
  set_description: string;
  set_image: string | null;
  set_menu_id: number;
  set_price: number;
  menu_items: { menu_id: number; quantity: number }[];
};

export type BoothAllMenusResponse = {
  status: number;
  message: string;
  data: {
    booth_id: number;
    table: ApiSeat;
    menus: ApiMenu[];
    setmenus: ApiSetMenu[];
  };
};

// ========== 목 데이터 ==========
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const baseUrl = import.meta.env.BASE_URL;

// 목 데이터: 메뉴 목록
const mockMenus: ApiMenu[] = [
  // 피자 메뉴
  {
    menu_id: 1,
    booth_id: 1,
    menu_name: '불고기 피자',
    menu_description: '달콤한 불고기와 피자의 만남',
    menu_category: '메뉴',
    menu_price: 25000,
    menu_amount: 50,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: false,
  },
  {
    menu_id: 2,
    booth_id: 1,
    menu_name: '페퍼로니 피자',
    menu_description: '매콤한 페퍼로니 피자',
    menu_category: '메뉴',
    menu_price: 22000,
    menu_amount: 30,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: false,
  },
  {
    menu_id: 3,
    booth_id: 1,
    menu_name: '마르게리타 피자',
    menu_description: '클래식한 마르게리타 피자',
    menu_category: '메뉴',
    menu_price: 20000,
    menu_amount: 20,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: false,
  },
  {
    menu_id: 6,
    booth_id: 1,
    menu_name: '하와이안 피자',
    menu_description: '파인애플과 햄의 조화',
    menu_category: '메뉴',
    menu_price: 23000,
    menu_amount: 25,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: false,
  },
  {
    menu_id: 7,
    booth_id: 1,
    menu_name: '치즈 피자',
    menu_description: '치즈가 가득한 피자',
    menu_category: '메뉴',
    menu_price: 19000,
    menu_amount: 15,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: false,
  },
  {
    menu_id: 8,
    booth_id: 1,
    menu_name: '고구마 피자',
    menu_description: '달콤한 고구마 피자',
    menu_category: '메뉴',
    menu_price: 24000,
    menu_amount: 0,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: true,
  },
  // 음료
  {
    menu_id: 4,
    booth_id: 1,
    menu_name: '콜라',
    menu_description: '시원한 콜라',
    menu_category: '음료',
    menu_price: 2000,
    menu_amount: 100,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: false,
  },
  {
    menu_id: 5,
    booth_id: 1,
    menu_name: '사이다',
    menu_description: '시원한 사이다',
    menu_category: '음료',
    menu_price: 2000,
    menu_amount: 5,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: false,
  },
  {
    menu_id: 9,
    booth_id: 1,
    menu_name: '오렌지 주스',
    menu_description: '신선한 오렌지 주스',
    menu_category: '음료',
    menu_price: 3000,
    menu_amount: 40,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: false,
  },
  {
    menu_id: 10,
    booth_id: 1,
    menu_name: '아이스티',
    menu_description: '시원한 아이스티',
    menu_category: '음료',
    menu_price: 2500,
    menu_amount: 60,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: false,
  },
  {
    menu_id: 11,
    booth_id: 1,
    menu_name: '생수',
    menu_description: '깨끗한 생수',
    menu_category: '음료',
    menu_price: 1500,
    menu_amount: 80,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: false,
  },
  {
    menu_id: 12,
    booth_id: 1,
    menu_name: '제로 콜라',
    menu_description: '칼로리 걱정 없는 콜라',
    menu_category: '음료',
    menu_price: 2200,
    menu_amount: 35,
    menu_image: `${baseUrl}images/Pizza.svg`,
    is_soldout: false,
  },
];

const mockSetMenus: ApiSetMenu[] = [
  {
    set_menu_id: 1,
    booth_id: 1,
    set_name: '피자 세트 A',
    set_description: '피자 + 콜라',
    set_image: `${baseUrl}images/Pizza.svg`,
    set_price: 26000,
    origin_price: 27000,
    is_soldout: false,
    min_menu_amount: 10,
    menu_items: [
      { menu_id: 1, quantity: 1 },
      { menu_id: 4, quantity: 1 },
    ],
  },
  {
    set_menu_id: 2,
    booth_id: 1,
    set_name: '피자 세트 B',
    set_description: '피자 2종 + 음료 2잔',
    set_image: `${baseUrl}images/Pizza.svg`,
    set_price: 45000,
    origin_price: 50000,
    is_soldout: false,
    min_menu_amount: 5,
    menu_items: [
      { menu_id: 2, quantity: 1 },
      { menu_id: 3, quantity: 1 },
      { menu_id: 4, quantity: 2 },
    ],
  },
  {
    set_menu_id: 3,
    booth_id: 1,
    set_name: '패밀리 세트',
    set_description: '피자 3종 + 음료 4잔',
    set_image: `${baseUrl}images/Pizza.svg`,
    set_price: 75000,
    origin_price: 85000,
    is_soldout: false,
    min_menu_amount: 3,
    menu_items: [
      { menu_id: 1, quantity: 1 },
      { menu_id: 2, quantity: 1 },
      { menu_id: 6, quantity: 1 },
      { menu_id: 4, quantity: 2 },
      { menu_id: 5, quantity: 2 },
    ],
  },
  {
    set_menu_id: 4,
    booth_id: 1,
    set_name: '커플 세트',
    set_description: '피자 1종 + 음료 2잔',
    set_image: `${baseUrl}images/Pizza.svg`,
    set_price: 28000,
    origin_price: 30000,
    is_soldout: false,
    min_menu_amount: 8,
    menu_items: [
      { menu_id: 3, quantity: 1 },
      { menu_id: 4, quantity: 1 },
      { menu_id: 9, quantity: 1 },
    ],
  },
];

const mockTable: ApiSeat = {
  seat_type: 'table',
  seat_tax_table: 5000,
  seat_tax_person: 0,
  is_seatfee_soldout: false,
};

export const MenuListService = {
  fetchAllMenus: async (boothId: number) => {
    await delay(500);
    return {
      booth_id: boothId,
      table: mockTable,
      menus: mockMenus,
      setmenus: mockSetMenus,
    };
  },
};

// ========== 기존 API 코드 (주석 처리) ==========
// export const MenuListService = {
//   fetchAllMenus: async (boothId: number) => {
//     const tableNum = localStorage.getItem("tableNum") || "";

//     const res = await instance.get<BoothAllMenusResponse>(
//       `/api/v2/booth/${boothId}/all-menus/?table_num=${tableNum}`
//     );
//     //console.log(res);
//     return res.data.data; // { booth_id, table, menus, setmenus }
//   },
// };
