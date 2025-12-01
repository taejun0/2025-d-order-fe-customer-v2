// 부스 이름 API 응답 타입
export interface BoothNameResponseV2 {
  status: number;
  message: string;
  code: number;
  data: {
    booth_id: number;
    booth_name: string;
  };
}

// 테이블 입장 API 응답 타입
export interface TableEnterResponse {
  status: string;
  message: string;
  code: number;
  data: {
    table_num: number;
    booth_id: number;
    booth_name: string;
    table_status: string;
  };
}

// ========== 목 데이터 ==========
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// 목 데이터: 부스 이름
const mockBoothNames: Record<number, string> = {
  1: '맛있는 피자 부스',
  2: '시원한 음료 부스',
  3: '달콤한 디저트 부스',
  4: '맛있는 파스타 부스',
  5: '신선한 샐러드 부스',
  6: '따뜻한 국물 부스',
  7: '고소한 치킨 부스',
  8: '신선한 회 부스',
  9: '달콤한 케이크 부스',
  10: '향긋한 커피 부스',
};

// 부스 이름 가져오기 (목 데이터)
export const fetchBoothName = async (boothId: string): Promise<string> => {
  await delay(300);
  const numericBoothId = parseInt(boothId, 10);
  if (isNaN(numericBoothId) || numericBoothId <= 0) {
    return '부스 이름';
  }
  return mockBoothNames[numericBoothId] || '테스트 부스';
};

// ========== 기존 API 코드 (주석 처리) ==========
// // 부스 이름 가져오기
// export const fetchBoothName = async (boothId: string): Promise<string> => {
//   try {
//     const numericBoothId = parseInt(boothId, 10);

//     if (isNaN(numericBoothId) || numericBoothId <= 0) {
//       return "부스 이름";
//     }

//     const response = await axios.get<BoothNameResponseV2>(
//       `${
//         import.meta.env.VITE_BASE_URL
//       }api/v2/booth/tables/name/?booth_id=${numericBoothId}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     );

//     if (response.status === 200 && response.data.data) {
//       return response.data.data.booth_name || "QR코드를 다시 찍어주세요.";
//     }

//     return "QR코드를 다시 찍어주세요.";
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       console.error("부스 이름 조회 실패:", error.response.data);
//     }
//     return "QR코드를 다시 찍어주세요.";
//   }
// };

// 테이블 입장 처리 (목 데이터) - 무조건 통과
export const enterTable = async (
  boothId: string,
  tableNum: string
): Promise<TableEnterResponse> => {
  await delay(500);
  const numericBoothId = parseInt(boothId, 10) || 1;
  const numericTableNum = parseInt(tableNum, 10) || 1;

  // 목 데이터 반환 - 무조건 성공
  return {
    status: 'success',
    message: '테이블 입장 성공',
    code: 200,
    data: {
      table_num: numericTableNum,
      booth_id: numericBoothId,
      booth_name: mockBoothNames[numericBoothId] || '테스트 부스',
      table_status: 'activate',
    },
  };
};

// ========== 기존 API 코드 (주석 처리) ==========
// // 테이블 입장 처리
// export const enterTable = async (
//   boothId: string,
//   tableNum: string
// ): Promise<TableEnterResponse> => {
//   const numericBoothId = parseInt(boothId, 10);
//   const numericTableNum = parseInt(tableNum, 10);

//   // 유효성 검사
//   if (isNaN(numericBoothId) || numericBoothId <= 0) {
//     throw new Error("유효하지 않은 부스 ID입니다.");
//   }
//   if (isNaN(numericTableNum) || numericTableNum <= 0) {
//     throw new Error("유효하지 않은 테이블 번호입니다.");
//   }

//   const response = await axios.post<TableEnterResponse>(
//     `${import.meta.env.VITE_BASE_URL}api/v2/tables/enter/`,
//     {
//       booth_id: numericBoothId,
//       table_num: numericTableNum,
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     }
//   );

//   return response.data;
// };
