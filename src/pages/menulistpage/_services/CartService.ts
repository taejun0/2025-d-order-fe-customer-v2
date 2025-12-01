// src/pages/MenuListPage/_services/CartService.ts
type CartType = 'menu' | 'set_menu' | 'seat_fee';

const CART_ID_KEY = 'cartId';

function getCartId(): number | null {
  const v = localStorage.getItem(CART_ID_KEY);

  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
}

function setCartId(id: number | null) {
  if (id == null) localStorage.removeItem(CART_ID_KEY);
  else localStorage.setItem(CART_ID_KEY, String(id));
}

// ========== 목 데이터 ==========
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// 목 데이터: 장바구니 아이템 저장 (메모리 기반)
let mockCartItems: Array<{
  table_num: number;
  type: CartType;
  id?: number;
  quantity: number;
}> = [];

export const CartService = {
  add: async ({
    table_num,
    type,
    id,
    quantity,
  }: {
    table_num: number;
    type: CartType;
    id?: number;
    quantity: number;
  }) => {
    await delay(300);
    const cartId = getCartId() || 1;

    // 목 데이터에 아이템 추가
    mockCartItems.push({ table_num, type, id, quantity });

    // cartId가 없으면 생성
    if (!getCartId()) {
      setCartId(cartId);
    }

    return {
      status: 'success',
      message: '장바구니에 추가되었습니다.',
      code: '00',
      data: {
        cart_id: cartId,
      },
    };
  },

  exists: async (_cartId: number): Promise<boolean> => {
    await delay(200);
    // 목 데이터에서 해당 cartId의 아이템이 있는지 확인
    return mockCartItems.length > 0;
  },

  getLocalCartId: () => getCartId(),
  clearLocalCartId: () => setCartId(null),
};

// ========== 기존 API 코드 (주석 처리) ==========
// export const CartService = {
//   add: async ({
//     table_num,
//     type,
//     id,
//     quantity,
//   }: {
//     table_num: number;
//     type: CartType;
//     id?: number;
//     quantity: number;
//   }) => {
//     const boothId = localStorage.getItem("boothId");
//     const cartId = getCartId();

//     const body: any = {
//       table_num,
//       type,
//       quantity,
//     };
//     if (id !== undefined) body.id = id;
//     if (cartId != null) body.cart_id = cartId;

//     const res = await instance.post("/api/v2/cart/", body, {
//       headers: { "Booth-ID": boothId },
//     });

//     const returnedCartId: number | undefined = res?.data?.data?.cart_id;
//     if (typeof returnedCartId === "number") {
//       setCartId(returnedCartId);
//     }

//     return res.data;
//   },

//   exists: async (cartId: number): Promise<boolean> => {
//     const boothId = localStorage.getItem("boothId");
//     const res = await instance.get(`/api/v2/cart/exists/?cartId=${cartId}`, {
//       headers: { "Booth-ID": boothId },
//     });
//     // console.log(res);
//     return res.data?.data?.has_cart_items ?? false;
//   },

//   getLocalCartId: () => getCartId(),
//   clearLocalCartId: () => setCartId(null),
// };
