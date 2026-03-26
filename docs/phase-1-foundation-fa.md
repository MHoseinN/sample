# فاز ۱ — تحلیل پروژه سازمانی (Vue 3)

## 1) هدف پروژه
پیاده‌سازی یک سامانه سازمانی مدیریت کاربران و پروفایل پرسنل با امکانات زیر:
- ثبت‌نام و ورود
- مدیریت کاربران (CRUD)
- نمایش پروفایل کامل هر کاربر
- جستجو و فیلتر در لیست کاربران
- فرم‌های استاندارد با اعتبارسنجی

---

## 2) نقش‌ها (Role)
### `admin`
- مشاهده همه کاربران
- ایجاد/ویرایش/حذف کاربر
- مشاهده و ویرایش پروفایل کاربران

### `operator`
- مشاهده لیست کاربران
- ویرایش محدود (مثلاً وضعیت و اطلاعات غیرحساس)

### `viewer`
- فقط مشاهده اطلاعات

---

## 3) مدل داده (Data Model)

### Entity: `User`
- `id: number`
- `firstName: string`
- `lastName: string`
- `nationalCode: string` (کد ملی)
- `mobile: string`
- `email: string`
- `role: 'admin' | 'operator' | 'viewer'`
- `status: 'active' | 'inactive' | 'suspended'`
- `createdAt: string (ISO)`
- `updatedAt: string (ISO)`

### Entity: `Profile`
- `id: number`
- `userId: number`
- `avatarUrl: string | null`
- `department: string` (مثلاً مالی، منابع انسانی، فنی)
- `position: string`
- `province: string`
- `city: string`
- `address: string`
- `postalCode: string`
- `birthDate: string`
- `bio: string`

### Entity: `AuthSession`
- `token: string`
- `refreshToken: string`
- `expiresAt: string`
- `user: User`

---

## 4) قرارداد API (نسخه اولیه)

## Auth
- `POST /auth/register`
  - body: `{ firstName, lastName, email, mobile, password }`
  - response: `{ token, refreshToken, user }`

- `POST /auth/login`
  - body: `{ emailOrMobile, password }`
  - response: `{ token, refreshToken, user }`

- `POST /auth/logout`
  - header: `Authorization: Bearer <token>`
  - response: `{ success: true }`

- `GET /auth/me`
  - response: `{ user }`

## Users
- `GET /users?page=1&limit=10&search=&status=&role=&department=`
  - response: `{ items: User[], total: number, page: number, limit: number }`

- `GET /users/:id`
  - response: `{ user: User, profile: Profile }`

- `POST /users`
  - body: اطلاعات کاربر
  - response: `{ user }`

- `PUT /users/:id`
  - body: فیلدهای قابل ویرایش
  - response: `{ user }`

- `DELETE /users/:id`
  - response: `{ success: true }`

## Profiles
- `GET /profiles/:userId`
  - response: `{ profile }`

- `PUT /profiles/:userId`
  - body: اطلاعات پروفایل
  - response: `{ profile }`

---

## 5) مسیرهای فرانت (Vue Router)
- `/login`
- `/register`
- `/dashboard`
- `/users`
- `/users/:id`
- `/profile` (پروفایل کاربر لاگین‌شده)

### Guardها
- مسیرهای خصوصی نیاز به `token`
- مسیرهای مدیریتی نیاز به role مناسب

---

## 6) ساختار پوشه پیشنهادی
```txt
src/
  api/
    http.js
    auth.api.js
    users.api.js
    profiles.api.js
  router/
    index.js
  stores/
    auth.store.js
    users.store.js
  views/
    LoginView.vue
    RegisterView.vue
    DashboardView.vue
    UsersListView.vue
    UserDetailView.vue
    MyProfileView.vue
  components/
    users/
      UsersTable.vue
      UserForm.vue
      UserFilters.vue
    common/
      BaseInput.vue
      BaseSelect.vue
      BaseModal.vue
```

---

## 7) نگاشت مباحث درخواستی شما به پروژه
- `composition api`: همه Viewها با `<script setup>`
- `ref/reactive`: مدیریت state فرم و فیلتر
- `computed`: خروجی لیست فیلترشده/نمایش مشتقات داده
- `watch`: واکنش به تغییر سرچ و فیلتر، debounce
- `pinia/state management`: مدیریت auth و users
- `vue-router`: ناوبری و route guard
- `async/api`: درخواست‌های axios با `async/await`
- `ES6`: ماژولار سازی، destructuring، spread/rest

---

## 8) Definition of Done فاز ۱
- [x] محدوده پروژه مشخص شد
- [x] مدل داده نهایی شد
- [x] endpointها تعریف شد
- [x] مسیرهای فرانت و نقش‌ها مشخص شد
- [x] معماری پوشه‌ها مشخص شد

## گام بعد (فاز ۲)
- نصب وابستگی‌ها: `vue-router`, `pinia`, `axios`, `json-server`
- پیاده‌سازی `router` + `stores` پایه
- آماده‌سازی Mock API برای شروع Auth و Users CRUD
