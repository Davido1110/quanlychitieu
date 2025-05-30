# Ứng dụng Quản lý Chi tiêu

Ứng dụng quản lý chi tiêu gia đình với giao diện chat thông minh, hỗ trợ nhập liệu bằng text, voice và hình ảnh.

## Tính năng

- Giao diện chat thân thiện
- Nhập liệu bằng text, voice hoặc hình ảnh
- Tự động xử lý dữ liệu bằng OpenAI API
- Lưu trữ dữ liệu trên Google Sheets
- Xem báo cáo chi tiêu theo tháng
- Hỗ trợ PWA trên iOS

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file .env và cấu hình các biến môi trường:
```
REACT_APP_API_BASE_URL=your_make_com_webhook_url
```

4. Chạy ứng dụng ở môi trường development:
```bash
npm start
```

5. Build cho production:
```bash
npm run build
```

## Cấu hình Make.com

1. Tạo một scenario mới trong Make.com
2. Thêm Webhook trigger
3. Kết nối với OpenAI API để xử lý dữ liệu
4. Kết nối với Google Sheets để lưu trữ
5. Cấu hình response trả về cho ứng dụng

## Cấu hình PWA

Ứng dụng đã được cấu hình sẵn để hoạt động như một PWA. Để cài đặt trên iOS:

1. Mở ứng dụng trong Safari
2. Nhấn vào nút Share
3. Chọn "Add to Home Screen"
4. Đặt tên và nhấn "Add"

## Công nghệ sử dụng

- React + TypeScript
- Material-UI
- React Speech Recognition
- Workbox (PWA)
- Make.com (Automation)
- OpenAI API
- Google Sheets API

## License

MIT
