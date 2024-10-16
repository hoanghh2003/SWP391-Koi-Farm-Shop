const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware auth

// Import Controllers
const userSignUp = require('../controllers/userSignUp');
const userSignIn = require('../controllers/userSignIn');
const logoutUser = require('../controllers/userLogout');
const changePassword = require('../controllers/changePassword');
const forgotPassword = require('../controllers/forgotPassword');

const { createKoiFish, getAllKoiFish, getKoiFishById } = require('../controllers/koiController');
const { getAllOrders, getOrderById } = require('../controllers/orderController');
const { getAllCustomers, getCustomerById } = require('../controllers/customerController');
const { createReportController, getAllReportsController, getReportByIdController, updateReportController, deleteReportController } = require('../controllers/reportController');

const { createKoiPackage, getAllKoiPackages } = require('../controllers/koiPackageController');
const { createKoiConsignment, getAllKoiConsignments } = require('../controllers/koiConsignmentController');
const { createBreeder, getAllBreeders } = require('../controllers/breedersController');
const { createVariety, getAllVarieties } = require('../controllers/varietyController');

// User routes
/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new user
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
 *                 description: User's login username (usually email)
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "password123"
 *               fullname:
 *                 type: string
 *                 description: Full name of the user
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *                 example: "123456789"
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: "john.doe@example.com"
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Input error (duplicate username, phone, or email)
 *       500:
 *         description: System error
 */
router.post('/signup', userSignUp);

/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: User login
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
 *         description: Successful login
 */
router.post('/signin', userSignIn);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: User logout
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful logout
 */
router.post('/logout', authMiddleware, logoutUser);

/**
 * @swagger
 * /api/change-password:
 *   post:
 *     summary: Change user password
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
 *                 description: Current user password
 *                 example: "oldPassword123"
 *               newPassword:
 *                 type: string
 *                 description: New user password
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Incorrect current password
 *       500:
 *         description: System error
 */
router.post('/change-password', authMiddleware, changePassword);

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Reset user password
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
 *                 description: User's email address
 *                 example: "user@example.com"
 *               userName:
 *                 type: string
 *                 description: User's username
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: New password sent to email
 *       404:
 *         description: User not found with provided email
 *       500:
 *         description: System error
 */
router.post('/forgot-password', forgotPassword);

// Koi Fish routes
/**
 * @swagger
 * /api/koifish:
 *   get:
 *     summary: Get all Koi Fish
 *     tags: [Koi Fish]
 *     responses:
 *       200:
 *         description: List of all Koi Fish
 */
router.get('/koifish', getAllKoiFish);

/**
 * @swagger
 * /api/koifish/{koiId}:
 *   get:
 *     summary: Get Koi Fish details by ID
 *     tags: [Koi Fish]
 *     parameters:
 *       - in: path
 *         name: koiId
 *         schema:
 *           type: string
 *         required: true
 *         description: Koi Fish ID
 *     responses:
 *       200:
 *         description: Koi Fish details
 */
router.get('/koifish/:koiId', getKoiFishById);

/**
 * @swagger
 * /api/koifish:
 *   post:
 *     summary: Create a new Koi Fish
 *     tags: [Koi Fish]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Koi Fish name
 *                 example: "Koi1"
 *               varietyId:
 *                 type: integer
 *                 description: Variety ID of the Koi Fish
 *                 example: 1
 *               origin:
 *                 type: string
 *                 description: Origin of the Koi Fish
 *                 example: "Japan"
 *               breederId:
 *                 type: integer
 *                 description: Breeder ID of the Koi Fish
 *                 example: 1
 *               gender:
 *                 type: string
 *                 description: Gender of the Koi Fish
 *                 example: "Male"
 *               born:
 *                 type: integer
 *                 description: Year of birth
 *                 example: 2022
 *               size:
 *                 type: number
 *                 description: Size of the Koi Fish
 *                 example: 20.5
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the Koi Fish
 *                 example: 1000.5
 *               availability:
 *                 type: string
 *                 enum: [Available, Sold Out]
 *                 description: Availability status
 *                 example: "Available"
 *     responses:
 *       201:
 *         description: Koi Fish created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/koifish', createKoiFish);  // Add the route for creating a new Koi Fish

// Koi Package routes
/**
 * @swagger
 * /api/koipackage:
 *   post:
 *     summary: Create a new Koi Package
 *     tags: [Koi Package]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               koiId:
 *                 type: integer
 *                 description: ID of the Koi Fish
 *                 example: 1
 *               packageName:
 *                 type: string
 *                 description: Name of the package
 *                 example: "Deluxe Koi Package"
 *               imageLink:
 *                 type: string
 *                 description: URL to the image of the package
 *                 example: "http://example.com/package.jpg"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the package
 *                 example: 200.50
 *               packageSize:
 *                 type: integer
 *                 description: Size of the package
 *                 example: 5
 *               availability:
 *                 type: string
 *                 enum: [Available, Sold Out]
 *                 description: Availability status
 *                 example: "Available"
 *     responses:
 *       201:
 *         description: Koi Package created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/koipackage', authMiddleware, createKoiPackage);

/**
 * @swagger
 * /api/koipackages:
 *   get:
 *     summary: Get all Koi Packages
 *     tags: [Koi Package]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Koi Packages
 *       500:
 *         description: Internal server error
 */
router.get('/koipackages', authMiddleware, getAllKoiPackages);

// Koi Consignment routes
/**
 * @swagger
 * /api/koiconsignment:
 *   post:
 *     summary: Create a new Koi Consignment
 *     tags: [Koi Consignment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *                 description: ID of the Customer
 *                 example: 1
 *               koiId:
 *                 type: integer
 *                 description: ID of the Koi Fish
 *                 example: 1
 *               consignmentType:
 *                 type: string
 *                 enum: [Care, Sell]
 *                 description: Type of consignment
 *                 example: "Sell"
 *               consignmentMode:
 *                 type: string
 *                 enum: [Offline, Online]
 *                 description: Mode of consignment
 *                 example: "Online"
 *               status:
 *                 type: string
 *                 enum: [Pending, Approved, In Care, Listed for Sale, Sold, Withdrawn]
 *                 description: Status of the consignment
 *                 example: "Pending"
 *               priceAgreed:
 *                 type: number
 *                 format: float
 *                 description: Price agreed for the consignment
 *                 example: 1500.75
 *               approvedStatus:
 *                 type: string
 *                 enum: [Approved, Rejected, Pending]
 *                 description: Approved status of the consignment
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: Koi Consignment created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/koiconsignment', authMiddleware, createKoiConsignment);

/**
 * @swagger
 * /api/koiconsignments:
 *   get:
 *     summary: Get all Koi Consignments
 *     tags: [Koi Consignment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Koi Consignments
 *       500:
 *         description: Internal server error
 */
router.get('/koiconsignments', authMiddleware, getAllKoiConsignments);

// Breeders routes
/**
 * @swagger
 * /api/breeders:
 *   post:
 *     summary: Create a new Breeder
 *     tags: [Breeders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the Breeder
 *                 example: "John's Breeding Farm"
 *               address:
 *                 type: string
 *                 description: Address of the Breeder
 *                 example: "123 Breeder Lane, Tokyo, Japan"
 *               contactInfo:
 *                 type: string
 *                 description: Contact information of the Breeder
 *                 example: "+81 23456789"
 *     responses:
 *       201:
 *         description: Breeder created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/breeders', authMiddleware, createBreeder);

/**
 * @swagger
 * /api/breeders:
 *   get:
 *     summary: Get all Breeders
 *     tags: [Breeders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Breeders
 *       500:
 *         description: Internal server error
 */
router.get('/breeders', authMiddleware, getAllBreeders);

// Varieties routes
/**
 * @swagger
 * /api/varieties:
 *   post:
 *     summary: Create a new Variety
 *     tags: [Varieties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               varietyName:
 *                 type: string
 *                 description: Name of the Variety
 *                 example: "Kohaku"
 *               description:
 *                 type: string
 *                 description: Description of the Variety
 *                 example: "Kohaku is a red and white colored Koi fish."
 *               origin:
 *                 type: string
 *                 enum: [Japan, Vietnam, Other]
 *                 description: Origin of the Variety
 *                 example: "Japan"
 *     responses:
 *       201:
 *         description: Variety created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/varieties', authMiddleware, createVariety);

/**
 * @swagger
 * /api/varieties:
 *   get:
 *     summary: Get all Varieties
 *     tags: [Varieties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Varieties
 *       500:
 *         description: Internal server error
 */
router.get('/varieties', authMiddleware, getAllVarieties);

module.exports = router;
