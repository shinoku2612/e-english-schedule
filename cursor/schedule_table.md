# Tạo một feature mới cho server hiện tại với Node JS

_Trước khi thực hiện yêu cầu, hãy phân tích source code hiện tại để nắm rõ ngữ cảnh_

## Hãy tạo một feature mới với các yêu cầu sau:
### 1. Sử dụng Google API, Google Drive API để clone 1 Spreadsheet có sẵn
- Nhận 1 file spreadsheet có sẵn với format

| 26/01/2026    | MON        | TUE        | WED        | THU        | FRI        | SAT        | SUN |
| ------------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | --- |
|| 26/01/2026    | 27/01/2026 | 28/01/2026 | 29/01/2026 | 30/01/2026 | 31/01/2026 | 01/02/2026 |
| 08:00 - 09:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 09:00 - 10:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 10:00 - 11:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 11:00 - 12:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 12:00 - 13:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 13:00 - 14:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 14:00 - 15:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 15:00 - 16:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 16:00 - 17:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 17:00 - 18:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 18:00 - 19:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 19:00 - 20:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 20:00 - 21:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |
| 21:00 - 22:00 |            |            |            |            |            |            |     |            |     |     |     |     |     |     |     |  |  |  |  |  |  |

- Clone spreadsheet và đặt tên với định dạng: \<Month> - \<Year> (long format). Ví dụ tháng 01/2026, clone spreadsheet và đổi tên thành January - 2026
- Việc clone spreadsheet được thực hiện thông qua cronjob với thời gian mỗi tháng 1 lần, vào ngày cuối cùng của tháng trước đó

### 2. Sử dụng Google API để cập nhật Worksheet của Spreadsheet được cloned ở trên
- Mỗi worksheet sẽ có format giống với bảng ở yêu cầu ###1
- Spreadsheet mẫu đã có sẵn 5 worksheet tương ứng với mỗi tuần trong tháng (có tháng có nhiều hơn 4 tuần), worksheet sẽ được cập nhật vào tuần tương ứng với dữ liệu lấy được từ hàm `getAutoTeachingSchedule` có trong `src/get-schedule.js`.
- Việc cập nhật được thực hiện thông qua cronjob với thời gian 1 tuần 1 lần.

## Hãy viết Document và Runbook cho các bước thực hiện để có thể thực thi tính năng này