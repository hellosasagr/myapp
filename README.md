# Vocabulary Story Builder

Web app tạo câu chuyện tiếng Anh từ danh sách từ vựng và đảm bảo có đủ tất cả từ bạn nhập.

## Tính năng

- Nhập từ vựng bằng dấu phẩy, chấm phẩy hoặc xuống dòng.
- Chọn thể loại truyện (10 thể loại): `Phiêu lưu`, `Bí ẩn`, `Học đường`, `Khoa học viễn tưởng`, `Giả tưởng`, `Lãng mạn`, `Hài hước`, `Lịch sử`, `Công sở`, `Sinh tồn`.
- Chọn độ dài truyện: `Ngắn`, `Vừa`, `Dài`.
- Tạo truyện tự nhiên hơn và kiểm tra độ bao phủ từ vựng.
- Đọc truyện bằng giọng máy: `Đọc`, `Tạm dừng`, `Tiếp tục`, `Dừng`, chọn tốc độ và giọng đọc.
- AB Repeat: đặt điểm `A/B`, lặp đoạn theo vòng `3/5/10` hoặc vô hạn.
- Dịch nhanh: rê chuột lên từ tô màu hoặc bôi đen cụm/câu để xem nghĩa tiếng Việt.
- Mẫu câu (modelling sentences): rê chuột vào câu, phân tích công thức câu và gợi ý thay từ để tạo câu mới.
- Luyện tập nhiều dạng cho toàn bộ câu chuyện: `Điền từ`, `Trắc nghiệm`, `Đúng/Sai`.
- Nghe chép toàn bộ câu chuyện (không giới hạn 8/12 câu).
- Lưu truyện vào `Tủ sách` (localStorage), mở lại, tải, xóa.
- Coverage Guarantee v2: báo cáo `N/K/M`, số lần xuất hiện từng từ, vị trí câu chứa từ, hỗ trợ `Auto Patch`.
- Error Bank: lưu lỗi từ quiz/dictation/pronunciation/retell và tạo bài luyện lại từ yếu.
- Backup dữ liệu có version schema + kiểm tra tương thích khi import.
- Mỗi khối chức năng đều có nút `Hướng dẫn` để người dùng thao tác đúng cách.

## Coverage matching rules

- `EXACT` (mặc định):
  - Khớp theo ranh giới từ, không phân biệt hoa thường.
  - `work` khớp `Work`.
  - `work` không khớp `worked`, không khớp `homework`.
- `FLEX`:
  - Chấp nhận biến thể cơ bản: số nhiều (`apple` -> `apples`), đuôi `-ed`, `-ing` (`work` -> `worked`, `working`), và một số dạng apostrophe phổ biến (`word's`).
  - Vẫn giữ ranh giới từ nên `work` không khớp `homework`.

## Data export/import format & versioning

- File export dùng envelope thống nhất:
  - `version`: ví dụ `1.1.0`
  - `createdAt`: ISO timestamp
  - `payload`: dữ liệu ứng dụng (`shelf`, `progress`, `flashcards`, `errorBank`, ...)
- Import an toàn:
  - Validate schema trước khi ghi vào localStorage.
  - Nếu khác `major version` thì từ chối với thông báo lỗi rõ ràng.
  - Hỗ trợ migrate khi khác `minor version` trong cùng major (ví dụ từ định dạng cũ `1.0.0` -> `1.1.0`).
  - Nếu import lỗi, dữ liệu hiện tại không bị ghi đè.

## Chạy ứng dụng

1. Mở `index.html` trong trình duyệt.
2. Nhập danh sách từ vựng.
3. Chọn thể loại + độ dài.
4. Bấm `Tạo truyện`.
5. Dùng các nút `Hướng dẫn` ở từng khối để xem cách dùng chi tiết.

Không cần cài thêm server.
