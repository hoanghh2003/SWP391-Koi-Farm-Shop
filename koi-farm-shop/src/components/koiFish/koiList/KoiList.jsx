import { Breadcrumb, Col, Row } from "antd";
import React from "react";
import KoiCard from "../koiCard/KoiCard";
import "./KoiList.scss";

import { Link } from "react-router-dom";
import koiImg1 from "../../../assets/koi-list/koiImg1.jpg";
import koiImg2 from "../../../assets/koi-list/koiImg2.jpg";
import koiImg3 from "../../../assets/koi-list/koiImg3.jpg";
import koiImg4 from "../../../assets/koi-list/koiImg4.jpg";
import koiImg5 from "../../../assets/koi-list/koiImg5.jpg";
import koiImg6 from "../../../assets/koi-list/koiImg6.jpg";
import koiImg7 from "../../../assets/koi-list/koiImg7.jpg";
import koiImg8 from "../../../assets/koi-list/koiImg8.jpg";

const koiSampleList = [
  {
    id: 1,
    name: "Kohaku Koi",
    image: koiImg1,
    color: "Đỏ & Trắng",
    size: "30 cm",
    price: "2.000.000 VND",
  },
  {
    id: 2,
    name: "Showa Koi",
    image: koiImg2,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
  {
    id: 3,
    name: "Showa Koi",
    image: koiImg3,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
  {
    id: 4,
    name: "Showa Koi",
    image: koiImg4,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
  {
    id: 5,
    name: "Kohaku Koi",
    image: koiImg5,
    color: "Đỏ & Trắng",
    size: "30 cm",
    price: "2.000.000 VND",
  },
  {
    id: 6,
    name: "Showa Koi",
    image: koiImg6,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
  {
    id: 7,
    name: "Showa Koi",
    image: koiImg7,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
  {
    id: 8,
    name: "Showa Koi",
    image: koiImg8,
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
  },
];

const KoiList = ({ isAuthenticated }) => {
  return (
    <div className="koi-list">
      <div className="breadcrumb-background">
        <Breadcrumb separator=">" style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/home">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Tìm kiếm cá Koi</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row gutter={[32, 40]} justify="center">
        {" "}
        {/* Điều chỉnh khoảng cách giữa các card */}
        {koiSampleList.map((koi) => (
          <Col key={koi.id} xs={24} sm={12} md={8} lg={6}>
            <KoiCard koi={koi} isAuthenticated={isAuthenticated} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default KoiList;
