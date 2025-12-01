// src/pages/MenuListPage/_services/CallService.ts
import { instance } from '@services/instance';

// ========== 목 데이터 ==========
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const CallService = {
  callStaff: async ({
    tableNumber,
  }: {
    tableNumber: number;
    message: string;
  }) => {
    await delay(300);
    return {
      status: "success",
      message: "직원 호출이 완료되었습니다.",
      code: 200,
      data: {
        table_num: tableNumber,
      },
    };
  },
};

// ========== 기존 API 코드 (주석 처리) ==========
// export const CallService = {
//   callStaff: async ({
//     tableNumber,
//   }: {
//     tableNumber: number;
//     message: string;
//   }) => {
//     const boothId = localStorage.getItem('boothId');

//     const res = await instance.post(
//       '/api/v2/tables/call_staff/',
//       {
//         table_num: tableNumber,
//       },
//       {
//         headers: { 'Booth-ID': boothId },
//       }
//     );

//     return res.data;
//   },
// };
