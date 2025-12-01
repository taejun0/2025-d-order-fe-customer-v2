import { instance } from "@services/instance";

export interface BoothAdItem {
  boothName: string;
  boothImage: string;
  hostName: string;
  boothAllTable: number;
  boothUsageTable: number;
  location: string;
  dates: string[];
}

export interface BoothAdResponse {
  statusCode: number;
  message: string;
  data: {
    boothDetails: BoothAdItem[];
  };
}

export type BoothInfo = BoothAdItem[];

// ========== 목 데이터 ==========
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const baseUrl = import.meta.env.BASE_URL;

// 목 데이터: 부스 광고 정보
const mockBoothAds: BoothAdItem[] = [
  {
    boothName: "맛있는 피자 부스",
    boothImage: `${baseUrl}images/Pizza.svg`,
    hostName: "홍길동",
    boothAllTable: 10,
    boothUsageTable: 7,
    location: "1층 중앙",
    dates: ["2025-01-15", "2025-01-16", "2025-01-17"],
  },
  {
    boothName: "시원한 음료 부스",
    boothImage: `${baseUrl}images/Pizza.svg`,
    hostName: "김철수",
    boothAllTable: 8,
    boothUsageTable: 5,
    location: "2층 서쪽",
    dates: ["2025-01-15", "2025-01-16"],
  },
  {
    boothName: "달콤한 디저트 부스",
    boothImage: `${baseUrl}images/Pizza.svg`,
    hostName: "이영희",
    boothAllTable: 6,
    boothUsageTable: 3,
    location: "1층 동쪽",
    dates: ["2025-01-15", "2025-01-16", "2025-01-17", "2025-01-18"],
  },
  {
    boothName: "맛있는 파스타 부스",
    boothImage: `${baseUrl}images/Pizza.svg`,
    hostName: "박민수",
    boothAllTable: 12,
    boothUsageTable: 9,
    location: "2층 중앙",
    dates: ["2025-01-15", "2025-01-16", "2025-01-17", "2025-01-18", "2025-01-19"],
  },
  {
    boothName: "신선한 샐러드 부스",
    boothImage: `${baseUrl}images/Pizza.svg`,
    hostName: "최지영",
    boothAllTable: 5,
    boothUsageTable: 2,
    location: "1층 서쪽",
    dates: ["2025-01-15", "2025-01-16"],
  },
  {
    boothName: "따뜻한 국물 부스",
    boothImage: `${baseUrl}images/Pizza.svg`,
    hostName: "정대현",
    boothAllTable: 15,
    boothUsageTable: 12,
    location: "1층 북쪽",
    dates: ["2025-01-15", "2025-01-16", "2025-01-17"],
  },
  {
    boothName: "고소한 치킨 부스",
    boothImage: `${baseUrl}images/Pizza.svg`,
    hostName: "윤서연",
    boothAllTable: 9,
    boothUsageTable: 6,
    location: "2층 동쪽",
    dates: ["2025-01-15", "2025-01-16", "2025-01-17", "2025-01-18"],
  },
  {
    boothName: "신선한 회 부스",
    boothImage: `${baseUrl}images/Pizza.svg`,
    hostName: "강태우",
    boothAllTable: 7,
    boothUsageTable: 4,
    location: "1층 남쪽",
    dates: ["2025-01-15", "2025-01-16"],
  },
];

export const fetchBoothAds = async (): Promise<BoothInfo> => {
  await delay(500);
  return mockBoothAds;
};

// ========== 기존 API 코드 (주석 처리) ==========
// export const fetchBoothAds = async (): Promise<BoothInfo> => {
//   const res = await instance.get<BoothAdResponse>(
//     "/api/v2/public/d-order/booths/ad/"
//   );
//   return res.data?.data?.boothDetails ?? [];
// };
