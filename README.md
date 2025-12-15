# 🎬 Movie Explorer (SPA)

TMDB API를 활용한 **영화 탐색 Single Page Application(SPA)** 프로젝트입니다.  
Vue.js 기반으로 영화 조회, 검색, 필터링, 찜(Wishlist), 로그인 및 로딩 처리까지 구현했습니다.

---

## 📌 프로젝트 기본 정보

- **프로젝트명**: Movie Explorer
- **배포 URL**: https://yun-hanseo.github.io/pb_project3/
- **개발 기간**: 2025년
- **개발 방식**: Front-End SPA (Single Page Application)

---

## 🛠 기술 스택 (Tech Stack)

- **Vue 3 (Composition API)**
- **Vite**
- **Vue Router**
- **JavaScript (ES6+)**
- **CSS3**
    - Media Query
    - Responsive Web Design
- **Axios**
- **TMDB API**
- **LocalStorage**
- **Git / GitHub**
- **GitHub Actions**
- **GitHub Pages**

---

## ✨ 주요 기능

- 로그인 / 회원가입 (TMDB API Key 기반)
- 로그인 상태 유지 (Keep Login)
- 인기 영화 조회
- 영화 검색
- 영화 필터링 (장르 / 평점 / 정렬)
- 영화 찜(Wishlist) 추가 및 삭제
- 찜 목록 페이지 제공
- API 호출 중 공통 Loading 컴포넌트 표시
- 모바일 / 데스크탑 반응형 UI 지원

---

## 📂 프로젝트 폴더 구조

```text
src
├─ components
│  ├─ common
│  │  ├─ Header.vue
│  │  └─ Loading.vue
│  │
│  ├─ Home
│  │  ├─ Home.vue
│  │  ├─ MovieCard.vue
│  │  └─ MovieSection.vue
│  │
│  ├─ Login
│  │  ├─ AuthContainer.vue
│  │  ├─ LoginForm.vue
│  │  └─ RegisterForm.vue
│  │
│  ├─ popular
│  │  ├─ Popular.vue
│  │  ├─ PopularInfinite.vue
│  │  ├─ PopularItem.vue
│  │  ├─ PopularTable.vue
│  │  └─ PopularTopButton.vue
│  │
│  ├─ Search
│  │  ├─ Search.vue
│  │  ├─ SearchFilter.vue
│  │  ├─ SearchInput.vue
│  │  ├─ SearchItem.vue
│  │  └─ SearchTable.vue
│  │
│  └─ Wishlist
│     ├─ Wishlist.vue
│     └─ WishlistItem.vue
│
├─ composables
│  ├─ useAuth.js
│  ├─ useTMDB.js
│  └─ useWishlist.js
│
├─ router
│  └─ index.js
│
├─ App.vue
└─ main.js

```


## ⚙ 설치 · 실행 · 빌드 · 배포

```bash
# 프로젝트 클론
git clone https://github.com/yun-hanseo/pb_project3.git
cd pb_project3

# 의존성 설치
npm install
npm install axios
npm install vue-router

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 배포 (main 브랜치 기준)
git checkout main
git merge develop
git push origin main

