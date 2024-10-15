const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware auth

// Import Controllers
const userSignUp = require('../controllers/userSignUp');
const userSignIn = require('../controllers/userSignIn');
const logoutUser = require('../controllers/userLogout');
const changePassword = require('../controllers/changePassword'); // Import changePassword controller
const forgotPassword = require('../controllers/forgotPassword'); // Import forgotPassword controller

const { getAllKoiFish, getKoiFishById } = require('../controllers/koiController');
const { getAllOrders, getOrderById } = require('../controllers/orderController');
const { getAllCustomers, getCustomerById } = require('../controllers/customerController');
const {
    createReportController,
    getAllReportsController,
    getReportByIdController,
    updateReportController,
    deleteReportController
} = require('../controllers/reportController');

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Tên đăng nhập của người dùng (thường là email)
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: Mật khẩu người dùng
 *                 example: "yourPassword"
 *               fullname:
 *                 type: string
 *                 description: Họ tên đầy đủ của người dùng
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 description: Số điện thoại của người dùng
 *                 example: "123456789"
 *               email:
 *                 type: string
 *                 description: Địa chỉ email của người dùng
 *                 example: "john.doe@example.com"
 *     responses:
 *       201:
 *         description: Người dùng đăng ký thành công
 *       400:
 *         description: Lỗi về thông tin nhập vào (Tên đăng nhập, số điện thoại hoặc email đã tồn tại)
 *       500:
 *         description: Lỗi hệ thống
 */
router.post('/signup', userSignUp);

/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
router.post('/signin', userSignIn);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Đăng xuất người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 */
router.post('/logout', authMiddleware, logoutUser); // Thêm authMiddleware cho logout

/**
 * @swagger
 * /api/change-password:
 *   post:
 *     summary: Thay đổi mật khẩu
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: Mật khẩu cũ của người dùng
 *                 example: "oldPassword123"
 *               newPassword:
 *                 type: string
 *                 description: Mật khẩu mới của người dùng
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: Mật khẩu đã được thay đổi thành công
 *       400:
 *         description: Mật khẩu cũ không chính xác
 *       500:
 *         description: Lỗi hệ thống
 */
router.post('/change-password', authMiddleware, changePassword); // Thêm authMiddleware cho changePassword

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Đặt lại mật khẩu của người dùng
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Địa chỉ email của người dùng
 *                 example: "user@example.com"
 *               userName:
 *                 type: string
 *                 description: Tên đăng nhập của người dùng
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: Mật khẩu mới đã được gửi tới email
 *       404:
 *         description: Không tìm thấy người dùng với email đã cung cấp
 *       500:
 *         description: Lỗi hệ thống
 */
router.post('/forgot-password', forgotPassword); // Route cho forgotPassword

/**
 * @swagger
 * /api/koifish:
 *   get:
 *     summary: Lấy danh sách tất cả cá Koi
 *     tags: [Koi Fish]
 *     responses:
 *       200:
 *         description: Danh sách tất cả cá Koi
 */
router.get('/koifish', getAllKoiFish);

/**
 * @swagger
 * /api/koifish/{koiId}:
 *   get:
 *     summary: Lấy chi tiết cá Koi theo ID
 *     tags: [Koi Fish]
 *     parameters:
 *       - in: path
 *         name: koiId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của cá Koi
 *     responses:
 *       200:
 *         description: Chi tiết cá Koi
 */
router.get('/koifish/:koiId', getKoiFishById);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lấy tất cả đơn hàng
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Danh sách tất cả đơn hàng
 */
router.get('/orders', authMiddleware, getAllOrders); // Bảo vệ route lấy danh sách đơn hàng

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Lấy chi tiết đơn hàng theo ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của đơn hàng
 *     responses:
 *       200:
 *         description: Chi tiết đơn hàng
 */
router.get('/orders/:orderId', authMiddleware, getOrderById); // Bảo vệ route lấy chi tiết đơn hàng

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Lấy tất cả khách hàng
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Danh sách tất cả khách hàng
 */
router.get('/customers', authMiddleware, getAllCustomers); // Bảo vệ route lấy danh sách khách hàng

/**
 * @swagger
 * /api/customers/{customerId}:
 *   get:
 *     summary: Lấy chi tiết khách hàng theo ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của khách hàng
 *     responses:
 *       200:
 *         description: Chi tiết khách hàng
 */
router.get('/customers/:customerId', authMiddleware, getCustomerById); // Bảo vệ route lấy chi tiết khách hàng

module.exports = router;
