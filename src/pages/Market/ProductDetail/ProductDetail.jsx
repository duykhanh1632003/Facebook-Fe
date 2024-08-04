import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMarketContext } from "../../../context/MarketContext";
import { LoadingRounded } from "../../../Loading/LoadingRounded";
import { Star } from "@mui/icons-material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { loading, setLoading, productsAfterDiscount } = useMarketContext();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setLoading(true);
    if (productsAfterDiscount.length > 0) {
      const foundProduct = productsAfterDiscount.find(
        (product) => product._id === id
      );
      console.log("Check foundProduct", foundProduct);

      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
      } else {
        console.error("Product not found");
      }
      setLoading(false);
    }
  }, [id, productsAfterDiscount, setLoading]);

  useEffect(() => {
    if (product) {
      updatePriceAndQuantity();
    }
  }, [selectedAttributes, product]);

  const updatePriceAndQuantity = () => {
    if (!product || !product.product_variations) return;

    const variation = product.product_variations.find((variation) =>
      variation.attributes.every(
        (attr) => selectedAttributes[attr.category] === attr.value
      )
    );
    if (variation) {
      setPrice(variation.discountedPrice);
      setAvailableQuantity(variation.quantity);
    }
  };

  const handleAttributeChange = (category, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [category]: value }));
  };

  if (loading) {
    return <LoadingRounded />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    return Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} style={{ color: "#ffb400" }} />
        ))}
        {halfStar === 1 && <Star style={{ color: "#ffb400", opacity: 0.5 }} />}
        {[...Array(emptyStars)].map((_, index) => (
          <Star key={index} style={{ color: "#d3d3d3" }} />
        ))}
      </>
    );
  };

  const hasDiscount = product.product_variations?.some(
    (variation) => variation.discountedPrice < variation.price
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="main-image mb-4">
            <img
              src={selectedImage}
              alt={product.product_name}
              className="w-[451px] h-[451px] object-cover rounded-lg"
            />
          </div>
          <div className="carousel-container">
            <Carousel
              responsive={responsive}
              showDots={true}
              ssr={true}
              arrows={true}
              renderButtonGroupOutside={true}
              itemClass="carousel-item"
            >
              {product.images?.map((image, index) => (
                <div key={index} className="h-[82px] w-[82px]">
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-[82px] w-[82px] object-cover rounded-lg mr-2 cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                    onMouseEnter={() => setSelectedImage(image)}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <div
            className="product-name text-lg font-medium break-words line-clamp-2 mb-4"
            title={product.product_name}
          >
            {product.product_name}
          </div>
          <div className="product-rating flex items-center text-sm text-gray-600 mb-4">
            {renderStars(product.product_ratingsAverage)}
            <span className="ml-2">{product.product_ratingsAverage}</span>
            <span className="ml-2">| {product.reviews_count} Đánh Giá</span>
            <span className="ml-2">| {product.units_sold} Đã Bán</span>
          </div>
          <div className="product-price text-xl font-bold mb-4">
            {hasDiscount ? (
              <>
                <span className="original-price line-through text-gray-500 mr-2">
                  {product.price} ₫
                </span>
                <span className="discounted-price text-red-500">{price} ₫</span>
                <span className="discount-percentage text-red-500 ml-2">
                  -{calculateDiscountPercentage(product.price, price)}%
                </span>
              </>
            ) : (
              <span>{price} ₫</span>
            )}
          </div>
          <div className="return-policy mb-4">
            <h3 className="font-semibold">Chính Sách Trả Hàng</h3>
            <p>Trả hàng 15 ngày</p>
            <p>Đổi ý miễn phí</p>
            <i className="icon-help"></i>
          </div>
          <div className="attributes mb-4">
            {product.product_variations?.map((variation) =>
              variation.attributes.map((attribute) => (
                <div key={attribute.category} className="mb-2">
                  <h4 className="font-semibold">{attribute.category}</h4>
                  <div className="flex flex-wrap">
                    {attribute.values?.map((value, index) => (
                      <button
                        key={index}
                        className={`attribute-button ${
                          selectedAttributes[attribute.category] === value
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        } p-2 m-1 rounded flex items-center`}
                        onClick={() =>
                          handleAttributeChange(attribute.category, value)
                        }
                      >
                        {value.includes("http") ? (
                          <img
                            src={value}
                            alt={value}
                            className="w-6 h-6 object-cover mr-2"
                          />
                        ) : null}
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="quantity mb-4">
            <h4 className="font-semibold">Số Lượng</h4>
            <input
              type="number"
              value={availableQuantity}
              onChange={(e) => setAvailableQuantity(e.target.value)}
              className="w-16 p-2 border rounded"
              min="1"
              max={availableQuantity}
            />
          </div>
          <button className="bg-red-500 text-white p-4 rounded w-full mt-4">
            Thêm Vào Giỏ Hàng
          </button>
          <button className="bg-orange-500 text-white p-4 rounded w-full mt-4">
            Mua Ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
