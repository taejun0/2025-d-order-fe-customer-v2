# 🎉 D-Order Customer v2

> 동국대학교 축제 주점 운영을 위한 고객용 주문 서비스입니다! 🍺

---

## ✨ 프로젝트 소개

디오더는 동국대 축제 주점에서 사용하는 **고객용 주문 서비스**입니다. 테이블 번호를 입력하여 메뉴를 주문하고, 장바구니에서 결제까지 진행할 수 있습니다.

## 배포 환경 (백엔드 없이 목데이터로 구성된 환경입니다!)

https://taejun0.github.io/2025-d-order-fe-customer-v2/

---

## 🛠️ 기술 스택

| 분류                | 기술                  |
| ------------------- | --------------------- |
| **프레임워크**      | React 19 + TypeScript |
| **빌드 도구**       | Vite 6                |
| **플러그인**        | vite-plugin-svgr      |
| **스타일링**        | Styled Components     |
| **상태 관리**       | Zustand + React Query |
| **라우팅**          | React Router DOM 7    |
| **HTTP 클라이언트** | Axios                 |

---

## 🚀 시작하기

### 설치 및 실행

```bash
npm install
npm run dev
```

`http://localhost:5173`에서 바로 확인할 수 있습니다.

---

## 🎯 주요 구현 내용

### 1️⃣ 데이터 손실 문제 해결을 위한 서버 기반 장바구니 아키텍처 전환

**문제점:**

- 기존에는 `Zustand`를 사용한 클라이언트 전역 상태 관리로 장바구니를 관리
- 페이지 새로고침, 여러 탭 사용, 테이블 변경 시 장바구니 데이터 손실 발생

**해결 방안:**

- **서버 기반 아키텍처로 전환**: 서버를 "Source of Truth"로 설정하고, 클라이언트는 캐싱과 표시만 담당
- **`cart_id` 관리**: `localStorage`에 `cart_id`를 저장하고 이후 요청에 함께 전송하여 세션/탭 간 동일한 장바구니 유지
- **React Query 도입**: API 데이터 캐싱 및 무효화 전략 구현
  - 장바구니 수정 시 자동 캐시 무효화
  - 메뉴, 장바구니, 주문 확인 페이지 간 서버-클라이언트 데이터 동기화

**구현 위치:**

- `src/pages/menulistpage/_services/CartService.ts` - 장바구니 API 서비스 레이어
- `src/pages/shoppingCart/_hooks/useShoppingCartPage.ts` - React Query를 통한 데이터 페칭 및 캐싱

---

### 2️⃣ 테이블 번호 기반 인증 시스템

**목적:**
축제 현장에서 고객이 테이블 번호만으로 간편하게 주문을 시작할 수 있도록 설계

**주요 구현 내용:**

#### 테이블 입장 API 호출

- 테이블 번호 입력 시 서버에 테이블 유효성 검증 요청
- 성공 시 `tableNum`을 `localStorage`에 저장하여 세션 유지

**구현 위치:**

- `src/pages/login/hooks/useLogin.ts`

```typescript
const handleStartOrder = async (tableValue: string) => {
  const response = await enterTable(boothId, tableValue);
  if (response.status === 'success') {
    localStorage.setItem('tableNum', tableValue);
    navigate(ROUTE_CONSTANTS.MENULIST);
  }
};
```

#### 부스 ID 관리

- URL 파라미터 또는 `localStorage`에서 부스 ID 가져오기
- 모든 API 요청에 `Booth-ID` 헤더 자동 포함

**구현 위치:**

- `src/pages/menulistpage/_services/BoothID.ts`
- `src/services/instance.ts`

---

### 3️⃣ 실시간 장바구니 동기화

**목적:**
여러 탭에서 동시에 주문할 수 있도록 서버 기반 장바구니 상태 동기화

**주요 구현 내용:**

#### Optimistic Update 패턴

- 수량 변경, 삭제 시 즉시 UI 업데이트
- 백그라운드에서 API 호출하여 서버와 동기화
- 실패 시 롤백 처리

**구현 위치:**

- `src/pages/shoppingCart/_hooks/useShoppingCartPage.ts`

```typescript
const increaseQuantity = async (id: number) => {
  // 1. 즉시 UI 업데이트
  setShoppingItemResponse((prev) => {
    // ... optimistic update
  });

  // 2. 서버 동기화
  await patchShoppingItem(id, newQuantity, type);
};
```

#### 장바구니 존재 여부 확인

- 페이지 진입 시 `cart_id`로 장바구니 존재 여부 확인
- 장바구니 아이콘 표시 상태 관리

**구현 위치:**

- `src/pages/menulistpage/_hooks/useMenuListPage.ts`

```typescript
useEffect(() => {
  const cartId = localStorage.getItem('cartId');
  if (cartId) {
    const hasItems = await CartService.exists(cartId);
    setCartCount(hasItems);
  }
}, []);
```

---

### 4️⃣ UI/UX 개선 및 기능 추가 (by taejun0)

**주요 개선 사항:**

#### SVG를 React 컴포넌트로 변환

- **`vite-plugin-svgr` 도입**: SVG 파일을 React 컴포넌트로 직접 사용 가능
- 이미지 태그 대신 컴포넌트로 사용하여 스타일링 및 접근성 개선
- 로고, 아이콘 등 SVG 리소스의 효율적인 관리

**구현 위치:**

- `vite.config.ts` - SVGR 플러그인 설정
- `src/pages/login/_components/LoginLogo.tsx` - SVG 컴포넌트 사용 예시
- `src/pages/staffCode/OrderCompletePage.styled.ts` - Styled Component로 SVG 사용

#### 세트 메뉴 카테고리 및 할인 표시

- 세트 메뉴 전용 카테고리 추가
- 할인율 자동 계산 및 표시
- 원가와 할인가 비교 표시

**구현 위치:**

- `src/pages/menulistpage/_components/Menu/MenuItem.tsx` - 할인 표시 로직
- `src/pages/menulistpage/_components/MenuListPageHeader/MenuListPageHeader.tsx` - 세트 카테고리 추가

#### 직원 호출 기능

- 메뉴 목록 페이지에서 직원 호출 버튼 추가
- 모달을 통한 직원 호출 확인 및 처리

**구현 위치:**

- `src/pages/menulistpage/_components/Header/MenuListHeader.tsx` - 호출 버튼 UI
- `src/pages/menulistpage/_components/modals/callmodal/CallModal.tsx` - 호출 모달
- `src/pages/menulistpage/_services/CallService.ts` - 호출 API 서비스

#### 장바구니 배지 표시

- 장바구니에 아이템이 있을 때 배지 표시
- 실시간 장바구니 상태 반영

**구현 위치:**

- `src/pages/menulistpage/_components/Header/MenuListHeader.tsx` - 배지 표시 로직

#### 가격 정렬 기능

- 메뉴를 가격 높은 순서로 정렬하는 유틸리티 함수 추가

**구현 위치:**

- `src/pages/menulistpage/_utils/sortByPrice.ts` - 정렬 유틸리티

#### 스타일링 개선

- 텍스트 길이에 따른 말줄임표(`...`) 처리
- 메뉴 아이템 제목의 줄바꿈 허용
- 테이블 이용료 결제 상태에 따른 텍스트 변경

#### 빌드 설정 개선

- GitHub Pages 배포를 위한 `base` 경로 설정
- 프로덕션/개발 환경별 경로 자동 설정

**구현 위치:**

- `vite.config.ts` - base 경로 설정
- `src/routes/router.tsx` - basename 설정
- `src/styles/global.ts` - 폰트 경로 동적 설정

#### 타입 정의 개선

- `ShoppingItemType` 타입을 별도 파일로 분리
- 쿠폰 및 계좌 정보 타입 정의 개선

**구현 위치:**

- `src/types/ShoppingItem.ts` - 타입 정의 분리
- `src/pages/shoppingCart/types/types.ts` - 장바구니 관련 타입 정의

---

## 📁 프로젝트 구조

```
src/
├── pages/
│   ├── login/              # 테이블 번호 입력 및 인증
│   │   ├── hooks/
│   │   │   └── useLogin.ts  # 테이블 입장 로직
│   │   └── _api/
│   │       └── LoginAPI.ts
│   ├── menulistpage/       # 메뉴 목록 및 장바구니 추가
│   │   ├── _hooks/
│   │   │   └── useMenuListPage.ts  # 메뉴 목록 관리
│   │   ├── _services/
│   │   │   ├── MenuListService.ts
│   │   │   ├── CartService.ts      # 장바구니 API
│   │   │   └── BoothID.ts
│   │   └── _components/    # 메뉴 아이템, 모달 등
│   ├── shoppingCart/       # 장바구니 및 결제
│   │   ├── _hooks/
│   │   │   └── useShoppingCartPage.ts  # 장바구니 상태 관리
│   │   └── _modal/         # 결제 확인, 쿠폰 모달 등
│   ├── orderList/          # 주문 내역 조회
│   │   ├── hooks/
│   │   │   └── useOrderList.ts
│   │   └── apis/
│   │       └── getOrderList.ts
│   ├── staffCode/          # 스태프 코드 입력 및 주문 완료
│   │   ├── hooks/
│   │   │   ├── useStaffCodeVerification.ts
│   │   │   └── useCodeInput.ts
│   │   └── _api/
│   │       └── StaffCodeAPI.ts
│   ├── advertisement/       # 광고 페이지
│   └── devpage/            # 개발자 소개 페이지
├── services/
│   └── instance.ts         # Axios 인스턴스 및 Booth-ID 헤더 관리
├── stores/
│   └── shoppingCartStore.ts # Zustand 장바구니 스토어 (레거시)
└── hooks/                  # 공통 커스텀 훅
    ├── useGoogleAnalytics.ts
    └── useCalcVh.ts
```

---

## 📱 주요 페이지

### 🏠 테이블 번호 입력 (`/`)

테이블 번호 입력 및 부스 인증

**기능:**

- 📝 테이블 번호 입력
- 🔍 테이블 유효성 검증
- 🏪 부스 ID 확인 및 저장
- ⚠️ 에러 메시지 표시

**인증:**

- 테이블 번호 입력 후 서버에서 유효성 검증
- 성공 시 `tableNum`을 `localStorage`에 저장
- `/menu-list`로 자동 리다이렉트

**사용 커스텀 훅:**

- `useLogin`: 테이블 입장 로직 및 에러 처리

**화면 미리보기:**

![테이블 번호 입력](https://github.com/user-attachments/assets/707f80d4-778d-46d8-86b9-94f2eab9bdf3)

---

### 🍕 메뉴 목록 (`/menu-list`)

메뉴 조회 및 장바구니 추가

**기능:**

- 📋 메뉴 목록 조회 (테이블 이용료, 세트, 메뉴, 음료)
- 🔍 카테고리별 필터링 및 스크롤 이동
- 💰 가격 높은 순서 정렬
- 🎁 세트 메뉴 할인율 표시
- ➕ 장바구니 추가 (수량 선택)
- 🛒 장바구니 배지 표시 (아이템 존재 시)
- 📞 직원 호출 기능
- 📱 반응형 디자인

**인증:**

- `localStorage`의 `tableNum`과 `boothId` 확인
- 없으면 `/`로 자동 리다이렉트

**사용 커스텀 훅:**

- `useMenuListPage`: 메뉴 목록 로딩, 카테고리 관리, 장바구니 추가

**화면 미리보기:**

![메뉴 목록](./docs/gifs/menu-list.gif)

---

### 🛒 장바구니 (`/shopping-list`)

장바구니 확인 및 결제 진행

**기능:**

- 📋 장바구니 아이템 조회
- ➕➖ 수량 변경 (Optimistic Update)
- 🗑️ 아이템 삭제
- 🎫 쿠폰 적용
- 💰 총 금액 계산 (할인 적용)
- 💳 계좌 정보 확인
- 📞 스태프 호출

**인증:**

- `localStorage`의 `tableNum`, `boothId`, `cartId` 확인
- 모든 API 요청에 `Booth-ID` 헤더 포함

**사용 커스텀 훅:**

- `useShoppingCartPage`: 장바구니 상태 관리, 수량 변경, 쿠폰 적용, 결제 진행

**화면 미리보기:**

![장바구니](https://github.com/user-attachments/assets/f6b9a3b3-fc24-4930-b531-cd9c273e2b95)

---

### 📋 주문 내역 (`/order-list`)

과거 주문 내역 조회

**기능:**

- 📜 테이블별 주문 내역 조회
- 📅 주문 시간 표시
- 💰 주문 금액 확인
- 📦 주문 상태 확인

**인증:**

- `localStorage`의 `tableNum`과 `boothId` 확인

**사용 커스텀 훅:**

- `useOrderList`: 주문 내역 조회 및 상태 관리

**화면 미리보기:**

![주문 내역](https://github.com/user-attachments/assets/350e5e97-014c-48a9-a828-96d0e9a3bc08)

---

### 🔐 스태프 코드 입력 및 주문 완료 (`/staff-code`)

직원 코드 입력 및 주문 완료

**기능:**

- 🔢 4자리 직원 코드 입력
- ✅ 코드 검증 및 주문 생성
- ⚠️ 에러 처리 및 재입력
- 🎉 주문 완료 페이지로 이동

**인증:**

- 쿠폰 코드와 결제 금액을 쿼리 파라미터로 전달
- 주문 생성 시 `cart_id`와 함께 전송

**사용 커스텀 훅:**

- `useStaffCodeVerification`: 코드 검증 및 주문 생성 로직
- `useCodeInput`: 코드 입력 UI 관리

**화면 미리보기:**

![스태프 코드](./docs/gifs/staff-code.gif)

---

### 📢 광고 페이지 (`/ad`)

부스 광고 및 연락처 정보

**기능:**

- 🏪 부스 정보 표시
- 📞 연락처 정보
- 📱 SNS 링크

**화면 미리보기:**

![광고 페이지](./docs/gifs/advertisement.gif)

---

### 👨‍💻 개발자 페이지 (`/devpage`)

프로젝트 개발자 소개

**기능:**

- 👥 개발자 역할별 필터링
- 📝 개발자 정보 카드
- 🎨 애니메이션 효과

**화면 미리보기:**

![개발자 페이지](./docs/gifs/devpage.gif)

---

## 🎣 사용한 커스텀 훅

### 로그인 관련

- **`useLogin`**: 테이블 번호 입력 및 입장 로직
  - 위치: `src/pages/login/hooks/useLogin.ts`
  - 기능: 테이블 번호 검증, 에러 처리, 리다이렉트

### 메뉴 목록 관련

- **`useMenuListPage`**: 메뉴 목록 관리 및 장바구니 추가
  - 위치: `src/pages/menulistpage/_hooks/useMenuListPage.ts`
  - 기능: 메뉴 목록 로딩, 카테고리 관리, 스크롤 이동, 장바구니 추가

### 장바구니 관련

- **`useShoppingCartPage`**: 장바구니 상태 관리 및 결제 진행
  - 위치: `src/pages/shoppingCart/_hooks/useShoppingCartPage.ts`
  - 기능: 장바구니 조회, 수량 변경, 삭제, 쿠폰 적용, 결제 진행

### 주문 내역 관련

- **`useOrderList`**: 주문 내역 조회
  - 위치: `src/pages/orderList/hooks/useOrderList.ts`
  - 기능: 주문 내역 조회, 로딩 상태, 에러 처리

### 스태프 코드 관련

- **`useStaffCodeVerification`**: 직원 코드 검증 및 주문 생성

  - 위치: `src/pages/staffCode/hooks/useStaffCodeVerification.ts`
  - 기능: 코드 검증, 주문 생성, 에러 처리

- **`useCodeInput`**: 코드 입력 UI 관리
  - 위치: `src/pages/staffCode/hooks/useCodeInput.ts`
  - 기능: 코드 입력 상태, 포커스 관리

### 기타

- **`useGoogleAnalytics`**: 구글 애널리틱스 연동

  - 위치: `src/hooks/useGoogleAnalytics.ts`

- **`useCalcVh`**: 뷰포트 높이 계산
  - 위치: `src/hooks/useCalcVh.ts`

---

## 🔐 인증 시스템

### 테이블 번호 기반 인증 플로우

1. **테이블 번호 입력**: 사용자가 테이블 번호 입력
2. **서버 검증**: 서버에서 테이블 유효성 검증
3. **세션 유지**: 성공 시 `tableNum`을 `localStorage`에 저장
4. **부스 ID 관리**: URL 파라미터 또는 `localStorage`에서 부스 ID 가져오기
5. **API 요청**: 모든 API 요청에 `Booth-ID` 헤더 자동 포함

### 보안 기능

- 테이블 번호 유효성 검증
- 부스 ID 확인
- `cart_id` 기반 장바구니 세션 관리

### 인증이 필요한 페이지

모든 주요 페이지는 `localStorage`의 `tableNum`과 `boothId`를 확인합니다:

- `/menu-list` - 메뉴 목록
- `/shopping-list` - 장바구니
- `/order-list` - 주문 내역
- `/staff-code` - 스태프 코드 입력

인증되지 않은 사용자는 자동으로 `/` (로그인 페이지)로 리다이렉트됩니다.

---

## 📦 빌드

```bash
# 개발 모드
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---

## 📝 환경 변수

`.env` 파일 설정:

```bash
# 백엔드 API URL
VITE_BASE_URL=https://api.example.com
```

---
