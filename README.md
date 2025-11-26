# 🌶️ Pepperhouse Loyalty Mobile Web App

Modern, single-page React-alapú mobile-only web alkalmazás a Pepperhouse vendéglátóhely hűségprogramjához.

## 📱 Funkciók

### Hűségprogram funkciók
- ✅ **QR kód alapú pontgyűjtés** - Egyedi QR kód minden felhasználónak
- ✅ **Pontgyűjtés** - Minden 100 Ft vásárlás = 1 pont
- ✅ **Ingyenes kávé program** - Minden 5. kávé ingyen
- ✅ **Jutalom beváltás** - Pontok beváltása kedvezményekre
- ✅ **VIP szintek** - Bronze, Silver, Gold tagság
- ✅ **Promóciók** - Exkluzív ajánlatok a tagoknak
- ✅ **Vélemény rendszer** - +10 pont minden véleményért

### Felhasználói élmény
- ✅ **Onboarding flow** - 4 lépéses bemutató
- ✅ **Teljes képernyős QR kód** - Könnyű beolvasás
- ✅ **Tranzakció történet** - Összes pont mozgás követése
- ✅ **Aktív jutalmak** - Beváltott jutalmak kezelése
- ✅ **Profil szerkesztés** - Személyes adatok módosítása
- ✅ **Desktop redirect** - QR kóddal mobil eszközre

## 🛠️ Technológiai Stack

- **Frontend Framework:** React 18+
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **QR Code:** qrcode.react
- **Build Tool:** Vite
- **Storage:** LocalStorage (mock API-ready)

## 📦 Telepítés

```bash
# Függőségek telepítése
npm install

# Development szerver indítása
npm run dev

# Production build
npm run build

# Build előnézet
npm run preview
```

## 🚀 Indítás

1. Klónozd le a repository-t
2. Telepítsd a függőségeket: `npm install`
3. Indítsd el a dev szervert: `npm run dev`
4. Nyisd meg a böngészőben: `http://localhost:3000`

## 📱 Használat

### Első indítás (Onboarding)

1. **Üdvözlő képernyő** - Ismerd meg a programot
2. **Előnyök bemutatása** - Pontgyűjtés, ingyenes jutalmak
3. **Regisztráció** - Add meg az adataidat
   - Név: Batka Miklós (példa)
   - Email: batka.miklos@pepperhouse.hu
   - Jelszó: minimum 6 karakter
   - GDPR elfogadása kötelező

### Demo vásárlás szimuláció

A **Főoldalon** található "Demo vásárlás" gomb segítségével szimulálhatsz vásárlásokat:
- Véletlen összeg generálása (500-5000 Ft)
- Automatikus pontszámítás
- Véletlen Pepperhouse lokáció
- Kávé számláló növelése

### Képernyők

#### 🏠 Főoldal (Home)
- Felhasználói QR kód
- Aktuális pontszám
- Kávé tracker (5-ös számláló)
- Következő jutalom haladás
- Legutóbbi 3 tranzakció
- Gyors linkek (Jutalmak, Ajánlatok, Vélemény)

#### ⭐ Jutalmak (Rewards)
- **Jutalmak tab:**
  - Beváltható jutalmak listája
  - Aktív (beváltott) jutalmak QR kóddal
  - Felhasznált jutalmak történet
- **Pontok tab:**
  - Pontszám összesítő
  - Tranzakció történet
  - Szűrés: Mind / Bevétel / Beváltás

#### 📢 Ajánlatok (Promotions)
- Aktív promóciók listája
- Szűrés: Összes / Aktív / Csak nekem
- Részletes promóció nézet
- Lejárati dátum figyelmeztetés

#### 💬 Vélemények (Feedback)
- **Új vélemény:**
  - Étterem választó
  - 5 csillagos értékelés
  - Opcionális rendelés megnevezés
  - Szöveges vélemény
  - +10 pont bónusz
- **Korábbi vélemények:** Saját értékelések listája

#### 👤 Profil (Profile)
- Személyes adatok megtekintése/szerkesztése
- VIP szint megjelenítése (Bronze/Silver/Gold)
- Haladás követése következő szintig
- Push/Email értesítések be/ki
- ÁSZF, Adatvédelem, Kapcsolat
- Kijelentkezés

## 🎨 Design System

### Színpaletta
```css
Primary: #E31E24 (piros)
Secondary: #2D2D2D (sötétszürke)
Background: #FFFFFF
Light Gray: #F5F5F5
Success: #10B981
Warning: #F59E0B
```

### Tipográfia
- Font: Inter (Google Fonts)
- Headings: Bold
- Body: Regular
- Számok: Tabular-nums

### Komponens stílus
- Kerekített sarkok: 12-16px
- Minimum touch target: 48px
- Árnyékok: Finom, modern shadow
- Spacing: 16px/24px rendszer

## 📂 Projekt Struktúra

```
src/
├── components/
│   ├── common/          # Újrafelhasználható komponensek
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ProgressBar.jsx
│   │   └── Badge.jsx
│   ├── qr/              # QR kód komponensek
│   │   ├── QRDisplay.jsx
│   │   └── QRFullscreen.jsx
│   ├── loyalty/         # Hűségprogram specifikus
│   │   ├── PointsCard.jsx
│   │   ├── CoffeeTracker.jsx
│   │   ├── TransactionItem.jsx
│   │   ├── RewardCard.jsx
│   │   ├── PromotionCard.jsx
│   │   └── TierBadge.jsx
│   └── navigation/      # Navigáció
│       ├── BottomNav.jsx
│       └── Header.jsx
├── pages/               # Oldalak
│   ├── Desktop/
│   ├── Onboarding/
│   ├── Home/
│   ├── Rewards/
│   ├── Promotions/
│   ├── Feedback/
│   └── Profile/
├── services/            # API és storage réteg
│   ├── api.js           # Mock API (API-ready)
│   ├── storage.js       # LocalStorage wrapper
│   └── mockData.js      # Demo adatok inicializálás
├── hooks/               # Custom React hooks
│   ├── usePoints.js
│   ├── useTransactions.js
│   └── useRewards.js
├── contexts/            # React contexts
│   └── AuthContext.jsx
├── utils/               # Helper függvények
│   └── helpers.js
├── App.jsx              # Főkomponens
└── main.jsx             # Entry point
```

## 🔌 API Integráció

Az alkalmazás jelenleg **mock adatokkal** működik LocalStorage-ben. Az API integráció egyszerű:

### API Szolgáltatás (`src/services/api.js`)

```javascript
// Minden API hívás készen áll a cserére:

export const pointsAPI = {
  getPoints: async () => {
    // TODO: Replace with actual API call
    // return await fetch('/api/points').then(r => r.json())
    await delay();
    return pointsStorage.get();
  },
  // ...
};
```

### Integrációs pontok

1. **User API** - `src/services/api.js` → `userAPI`
   - `register()` - Regisztráció
   - `login()` - Bejelentkezés
   - `updateProfile()` - Profil frissítés

2. **Points API** - `pointsAPI`
   - `getPoints()` - Pontszám lekérés
   - `getTransactions()` - Tranzakció történet
   - `addTransaction()` - Új vásárlás (POS integráció)

3. **Rewards API** - `rewardsAPI`
   - `getRewards()` - Jutalmak listája
   - `redeemReward()` - Jutalom beváltás

4. **Promotions API** - `promotionsAPI`
   - `getPromotions()` - Promóciók lekérése

5. **Feedback API** - `feedbackAPI`
   - `submitFeedback()` - Vélemény küldése
   - `getFeedback()` - Saját vélemények

## 📱 PWA Funkciók (Opcionális)

Az alkalmazás könnyen bővíthető PWA funkcionalitással:

1. **Service Worker** - Offline működés
2. **Add to Home Screen** - App-szerű használat
3. **Push Notifications** - Promóció értesítések
4. **Background Sync** - Offline tranzakció szinkronizálás

## 🧪 Tesztelés

```bash
# Lint futtatása
npm run lint

# Build teszt
npm run build
npm run preview
```

### Teszt felhasználó adatok
- **Név:** Batka Miklós
- **Email:** batka.miklos@pepperhouse.hu
- **Jelszó:** test123

## 🔒 Biztonság

- ✅ Input validáció minden űrlapon
- ✅ XSS védelem (React alapból)
- ✅ GDPR compliance (checkbox)
- ⚠️ **TODO:** API kulcsok környezeti változókban
- ⚠️ **TODO:** JWT token kezelés
- ⚠️ **TODO:** HTTPS only production-ben

## 📱 Mobilra optimalizálás

- ✅ Viewport: 320-430px szélesség
- ✅ Touch targetek: min 48x48px
- ✅ Smooth scrolling
- ✅ Pull-to-refresh támogatás (készenlét)
- ✅ Safe area támogatás (iOS notch)
- ✅ Desktop redirect (>768px)

## 🎯 Következő Lépések (Roadmap)

### Backend Integráció
- [ ] API endpoint-ok csatlakoztatása
- [ ] JWT autentikáció
- [ ] Real-time pontszám szinkronizálás
- [ ] Push notification backend

### POS Integráció
- [ ] QR kód olvasó a pénztárnál
- [ ] Vásárlás validálás
- [ ] Automatikus pontjóváírás
- [ ] Receipt API integráció

### Extra Funkciók
- [ ] Google Maps integráció (éttermek)
- [ ] Referral program
- [ ] Gamification badges
- [ ] Dark mode
- [ ] Többnyelvűség (EN, DE)

### Optimalizáció
- [ ] Image lazy loading
- [ ] Code splitting
- [ ] Service Worker
- [ ] Analytics integráció

## 🐛 Hibaelhárítás

### QR kód nem jelenik meg
- Ellenőrizd, hogy a `qrcode.react` telepítve van
- Böngésző console-ban nézd meg a hibákat

### LocalStorage nem működik
- Ellenőrizd a böngésző beállításokat
- Privát böngészés módban korlátozva lehet

### Mobilon nem mobile nézetű
- Ellenőrizd a viewport meta taget
- DevTools mobile emulation

## 📄 Licensz

Proprietary - Pepperhouse © 2024

## 👥 Kapcsolat

**Fejlesztő:** Claude AI Assistant
**Projekt:** Pepperhouse Loyalty Program
**Email:** support@pepperhouse.hu

---

**Készítve ❤️-tel és React-tel**
