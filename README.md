# Thu Chi — Theo dõi thu chi cá nhân

Ứng dụng web nhẹ, riêng tư, chạy hoàn toàn trên trình duyệt (localStorage).

## Tính năng

- Ghi **thu** / **chi** với danh mục, ghi chú, ngày
- Tổng hợp theo **tháng**, tìm kiếm giao dịch
- Biểu đồ **phân bổ danh mục** (thu & chi)
- **Sửa / xóa** giao dịch
- **Xuất / nhập** JSON sao lưu
- Giao diện **sáng / tối / theo hệ thống**
- Định dạng **VND**, tiếng Việt

## Chạy local (Mac / PC)

```bash
npm install
npm run dev
```

Mở http://localhost:5173

## Chạy trên iPhone

### Cách 1 — Cùng Wi‑Fi với Mac (thử nhanh)

1. Mac và iPhone **cùng mạng Wi‑Fi**.
2. Trên Mac, trong thư mục project:

```bash
npm run dev:mobile
```

3. Terminal sẽ hiện dòng **Network**, ví dụ `http://192.168.1.5:5173/`.
4. Trên iPhone mở **Safari**, gõ đúng địa chỉ đó (dùng `http`, không phải `https`).
5. Nếu không mở được: tắt VPN trên iPhone/Mac, kiểm tra firewall Mac (cho phép Node/Vite).

Lấy IP Mac thủ công nếu cần:

```bash
ipconfig getifaddr en0
```

(rồi mở `http://<IP>:5173` trên iPhone)

**Lưu ý:** Mac phải **bật** và chạy `npm run dev:mobile` thì iPhone mới vào được. Tắt Mac là hết.

### Cách 2 — Dùng thường xuyên (khuyên dùng)

Build và host miễn phí (Vercel / Netlify / GitHub Pages), mở link HTTPS trên iPhone mọi lúc:

```bash
npm run build
```

Upload thư mục `dist/` lên host, hoặc deploy repo bằng Vercel.

### Thêm icon ra màn hình chính (giống app)

1. Mở trang trong **Safari** (không dùng Chrome in-app).
2. Nút **Chia sẻ** (hình vuông + mũi tên).
3. **Thêm vào Màn hình chính** → **Thêm**.

Mở từ icon trên màn hình — chạy full màn, dữ liệu vẫn lưu trên iPhone (localStorage).

## Build production

```bash
npm run build
npm run preview
```

File tĩnh trong `dist/` — có thể host trên GitHub Pages, Netlify, Vercel, hoặc mở trực tiếp.
