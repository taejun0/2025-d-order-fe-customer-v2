export interface accountInfoType {
  account_holder: string;
  bank_name: string;
  account_number: string;
}

export interface Menu {
  id: number;
  is_soldout: boolean;
  menu_amount: number;
  menu_image?: string | null;
  menu_name: string;
  menu_price: number;
  min_menu_amount: number;
  discounted_price: number;
  original_price: number;
  quantity: number;
}

export interface ShoppingItemDataType {
  booth_id: number;
  id: number;
  menus?: Menu[];
  set_menus?: Menu[];
  table_num: number;
}

export interface ShoppingItemResponseType {
  data: {
    cart: ShoppingItemDataType;
    subtotal: number;
    table_fee: number;
    total_price: number;
  };
}
