// _services/BoothService.ts
// import { instance } from '@services/instance';

// type BoothNameResp = {
//   status: string;
//   message: string;
//   code: number;
//   data?: { booth_id: number; booth_name: string };
// };

// ========== 목 데이터 ==========
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const mockBoothNames: Record<number, string> = {
  1: "맛있는 피자 부스",
  2: "시원한 음료 부스",
  3: "달콤한 디저트 부스",
  4: "맛있는 파스타 부스",
  5: "신선한 샐러드 부스",
  6: "따뜻한 국물 부스",
  7: "고소한 치킨 부스",
  8: "신선한 회 부스",
  9: "달콤한 케이크 부스",
  10: "향긋한 커피 부스",
};

export const BoothID = {
  async getName(boothId: number): Promise<string> {
    await delay(300);
    return mockBoothNames[boothId] || "테스트 부스";
  },
};

// ========== 기존 API 코드 (주석 처리) ==========
// export const BoothID = {
//   async getName(boothId: number): Promise<string> {
//     const res = await instance.get<BoothNameResp>(
//       '/api/v2/booth/tables/name/',
//       { params: { booth_id: boothId } }
//     );
//     return res.data?.data?.booth_name ?? '';
//   },
// };
