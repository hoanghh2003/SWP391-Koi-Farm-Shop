import React from "react";
import "./KoiPackage.scss";
import KoiPackageItem1 from "../../../assets/images/Koipackage1.jpg";
import KoiPackageItem2 from "../../../assets/images/Koipackage2.jpg";
import KoiPackageItem3 from "../../../assets/images/Koipackage3.jpg";

const PackagesList = [
  {
    id: 1,
    name: "Gói Koi cao cấp",
    image: KoiPackageItem1,
    description: "6 con cá Koi được chọn lọc với chế độ chăm sóc cao cấp trong 3 tháng",
    price: "5,000,000 VNĐ",
    size: "30-40 cm",
    food: "Thức ăn cá Koi chất lượng cao",
    filterSystem: "Hệ thống lọc tiên tiến",
    rating: 5,
    discount: 10,
  },
  {
    id: 2,
    name: "Gói Koi tiêu chuẩn",
    image: KoiPackageItem2,
    description: "5 con cá Koi được chăm sóc và cho ăn cơ bản trong 2 tháng",
    price: "3,000,000 VNĐ",
    size: "20-30 cm",
    food: "Thức ăn cá Koi tiêu chuẩn",
    filterSystem: "Hệ thống lọc cơ bản",
    rating: 4,
    discount: 5,
  },
  {
    id: 3,
    name: "Gói Koi khởi đầu",
    image: KoiPackageItem3,
    description: "4 con cá Koi với gói chăm sóc thiết yếu trong 1 tháng",
    price: "2,000,000 VNĐ",
    size: "15-20 cm",
    food: "Thức ăn cá Koi cơ bản",
    filterSystem: "Hệ thống lọc thiết yếu",
    rating: 3,
    discount: 0,
  },
];

const KoiPackage = () => {
  return (
    <div className="koi-package">
      <div className="koi-package__intro">
        <h2>Lô cá Koi độc quyền</h2>
        <p>
        Chọn từ các gói Koi được chúng tôi lựa chọn thủ công, mỗi gói được thiết kế để cung cấp
        dịch vụ chăm sóc và chất lượng tốt nhất cho ao của bạn.
        </p>
        <h3>Nhấp vào ảnh để xem thêm thông tin chi tiết</h3>
      </div>

      <div className="koi-package__list">
        {PackagesList.map((pkg) => (
          <div key={pkg.id} className="koi-package-card">
            {pkg.discount > 0 && (
              <span className="koi-package-card__discount-badge">{pkg.discount}% OFF</span>
            )}
            <div className="koi-package-card__image">
              <img
                src={pkg.image || "https://via.placeholder.com/150"}
                alt={pkg.name}
              />
            </div>
            <div className="koi-package-card__info">
              <h3>{pkg.name}</h3>
              <p>{pkg.description}</p>
              <p><strong>Kích thước:</strong> {pkg.size}</p>
              <p><strong>Thức ăn:</strong> {pkg.food}</p>
              <p><strong>Hệ thống lọc:</strong> {pkg.filterSystem}</p>
              <p className="koi-package-card__price">
                <strong>Giá:</strong> {pkg.price}
              </p>
              <p className="rating">
                {Array(pkg.rating)
                  .fill("★")
                  .join("")}
                {Array(5 - pkg.rating)
                  .fill("☆")
                  .join("")}
              </p>
              <button className="koi-package-card__buy-now-button">Mua ngay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KoiPackage;
