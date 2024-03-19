# Hướng dẫn sử dụng API khi đăng nhập và lấy data cho mobile

## Đầu tiên là đăng nhập

```js
homeRouter.post("/controll", authenticate, getControlPage);
```

Bên trên là router để đăng nhập gồm 1 cái xác thực và cái trả về data.

Nếu tk có tồn tại và mật khẩu đúng thì dữ liệu sẽ được trả về dưới dạng json

Nhiệt độ, Độ ẩm, CO, CO2, LPG, PM2.5, PM1.0, PM10, CO2, NO

```json
{
  "id": "1",
  "location": [106.1929714, 21.2800742],
  "labels": [
    "07:30",
    "07:30",
    "07:30",
    "07:30",
    "07:30",
    "07:30",
    "07:30",
    "07:30",
    "07:40",
    "07:41"
  ],
  "emissions": [
    {
      "data": [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
    },
    {
      "data": [66, 66, 66, 66, 66, 66, 66, 66, 66, 66]
    },
    {
      "data": [40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
    },
    {
      "data": [63, 63, 63, 63, 63, 63, 63, 63, 63, 63]
    },
    {
      "data": [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
    },
    {
      "data": [30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    },
    {
      "data": [75, 75, 75, 75, 75, 75, 75, 75, 75, 75]
    },
    {
      "data": [46, 46, 46, 46, 46, 46, 46, 46, 46, 46]
    },
    {
      "data": [32, 32, 32, 32, 32, 32, 32, 32, 32, 32]
    },
    {
      "data": [63, 63, 63, 63, 63, 63, 63, 63, 63, 63]
    }
  ],
  "alert": "0"
}
```

## Call data để update chart

Sau đây là cái API lấy dữ liệu mới để cập nhật dữ liệu vào biểu đồ. Mối 15s thì chạy 1 lần là tốt nhất

```js
`/get-data-to-render/${userID}`;
```

Dữ liệu trả về có dạng sau

```json
{
  "label": "07:41",
  "emissions": [20, 66, 40, 63, 50, 30, 75, 46, 32, 63],
  "alert": "0",
  "location": [106.1929714, 21.2800742]
}
```

Khi này ta chỉ cần thêm vào cuối mảng và cắt đầu mảng đi. Nên mảng chỉ cần các giá trị cuối cùng mới đc update thôi (Nhiệt độ, Độ ẩm, CO, CO2, LPG, PM2.5, PM1.0, PM10, CO2, NO)

## Bây giờ là đăng ký

```js
`/addUser`;
```

Để mà đăng ký 1 tài khoản thì đẩy cho server 1 cái JSON

```json
{
  userName,
  numberPhone,
  address,
  password,
  deviceType
}
```

# Cảnh báo

Trong các file json không bao giờ được phép can thiệp vào giá trị của admin. Nếu không sẽ gây lỗi ghi dữ liệu.

Trong các file luôn có các object có id:1 chứa thông tin của admin. Nếu các object này mất sẽ không có mốc thứ tự để tạo id cho các user tiếp theo