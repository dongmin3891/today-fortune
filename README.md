# 🏢 오늘의 직장 운세 🎋  
매일 아침, 당신의 직장 생활을 위한 재미있는 운세를 확인하세요!

---

## 📌 주요 기능 🌟  

### 1️⃣ 일일 운세 확인  
- 매일 오전 6시에 새로운 운세 업데이트  
- 사장님, 회의, 동료 관련 등 다양한 직장 상황별 운세 제공  
- 운세와 함께 따뜻한 응원 메시지 제공  

### 2️⃣ 운세 공유 기능  
- 운세 결과를 이미지로 캡처하여 공유  
- 카카오톡, 메시지 등 다양한 플랫폼으로 공유 가능  

### 3️⃣ 알림 기능  
- 오전 9시까지 운세를 확인하지 않은 경우 알림 발송  
- 알림 설정/해제 가능  

### 4️⃣ 지난 운세 히스토리  
- 과거의 운세 기록 확인 가능  
- 날짜별로 정렬된 운세 히스토리 제공  

---

## 🛠 기술 스택  

- **React Native**
- **Expo**
- **TypeScript**
- **expo-router** (Navigation)
- **AsyncStorage** (로컬 데이터 저장)
- **expo-notifications** (푸시 알림)
- **react-native-viewshot** (이미지 캡처/공유)

---

## 📂 프로젝트 구조  

```bash
my-app/
├── app/  
│   ├── (main)/  
│   │   ├── home/  
│   │   │   ├── index.tsx        # 홈 화면  
│   │   │   ├── fortune.tsx      # 운세 확인 화면  
│   │   │   ├── history.tsx      # 히스토리 화면  
│   │   └── settings.tsx         # 설정 화면  
│   └── layout.tsx               # 루트 레이아웃  
├── components/  
│   ├── FortuneAnimation.tsx     # 운세 애니메이션  
│   ├── FortuneResult.tsx        # 운세 결과 표시  
├── constants/  
│   ├── colors.ts                # 색상 테마  
│   ├── fortunes.ts              # 운세 데이터  
└── utils/  
    ├── notification.ts           # 알림 관련 유틸리티  
```
---

## 📌 설치 및 실행

```bash
# 1️⃣ 프로젝트 클론
git clone [repository-url]

# 2️⃣ 의존성 설치
cd my-app
npm install

# 3️⃣ 개발 서버 실행
npm start

# 4️⃣ iOS 시뮬레이터에서 실행
npm run ios

# 5️⃣ Android 에뮬레이터에서 실행
npm run android
```
---

## ⚙️ 환경 설정

```bash
# 1️⃣ expo-notifications 설치 (푸시 알림 기능)
expo install expo-notifications

# 2️⃣ expo-router 설치 (네비게이션)
expo install expo-router

# 3️⃣ AsyncStorage 설치 (로컬 데이터 저장)
expo install @react-native-async-storage/async-storage

# 4️⃣ react-native-viewshot 설치 (이미지 캡처 기능)
expo install react-native-view-shot
```
---

