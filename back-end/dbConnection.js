const sql = require('mssql');

// Cấu hình kết nối
const config = {
    user: 'sa',  // Tên đăng nhập SQL Server
    password: '1',  // Mật khẩu
    server: 'localhost\\SQLEXPRESS',  // Tên hoặc địa chỉ IP của máy chủ SQL Server
    database: 'KoiFarmShop1',  // Tên cơ sở dữ liệu muốn kết nối
    options: {
        encrypt: false,  // Nếu đang sử dụng SQL Server trên Azure, hãy đặt thành true
        trustServerCertificate: true  // Đặt thành true nếu bạn không có chứng chỉ SSL
    }
};

// Kết nối với cơ sở dữ liệu
async function connectToDatabase() {
    try {
        // Thực hiện kết nối
        await sql.connect(config);
        console.log('Kết nối thành công với SQL Server');
        
        // Thực hiện truy vấn ví dụ
        const result = await sql.query`SELECT * FROM Users`;
        console.log(result);
    } catch (err) {
        console.error('Lỗi kết nối:', err);
    }
}

// Gọi hàm kết nối
connectToDatabase();
