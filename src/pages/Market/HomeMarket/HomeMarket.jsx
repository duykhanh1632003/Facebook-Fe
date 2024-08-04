import { Link } from "react-router-dom";
import { useMarketContext } from "../../../context/MarketContext";
import { LoadingRounded } from "../../../Loading/LoadingRounded";
import { Star } from "@mui/icons-material"; // For displaying stars

const HomeMarket = () => {
  const { productsAfterDiscount, loading } = useMarketContext();

  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    return Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
  };
  console.log("Check productsAfterDiscount ", productsAfterDiscount);
  const getLowestPriceVariation = (product) => {
    return product.product_variations.reduce(
      (min, variation) =>
        variation.discountedPrice < min ? variation.discountedPrice : min,
      product.product_variations[0].discountedPrice
    );
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      {loading && <LoadingRounded />}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${
          loading ? "opacity-50" : ""
        }`}
      >
        {productsAfterDiscount.map((product) => {
          const lowestPriceVariation = getLowestPriceVariation(product);
          const originalPriceVariation = product.product_variations.find(
            (variation) => variation.discountedPrice === lowestPriceVariation
          ).price;
          const hasDiscount = originalPriceVariation > lowestPriceVariation;

          return (
            <Link
              to={`/market/${product._id}`}
              key={product._id}
              className="product-card h-[361px] bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition transform duration-200"
            >
              <div className="product-image h-2/3">
                <img
                  src={product.product_thumb}
                  alt={product.product_name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="product-info mt-2">
                <div
                  className="product-name text-md font-medium break-words line-clamp-2 "
                  title={product.product_name}
                >
                  {product.product_name}
                </div>
                <div className="product-price mt-2 text-sm">
                  <span
                    className={`original-price ${
                      hasDiscount ? "line-through text-gray-500" : ""
                    } mr-2`}
                  >
                    {originalPriceVariation} ₫
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="discounted-price text-red-500 font-bold">
                        {lowestPriceVariation} ₫
                      </span>
                      <span className="discount-percentage text-red-500 font-bold ml-2">
                        -
                        {calculateDiscountPercentage(
                          originalPriceVariation,
                          lowestPriceVariation
                        )}
                        %
                      </span>
                    </>
                  )}
                </div>
                <div className="product-rating flex items-center mt-2 text-sm text-gray-600">
                  <Star style={{ color: "#ffb400" }} />
                  <span className="ml-1">{product.product_ratingsAverage}</span>
                  <span className="ml-2">
                    | Đã bán{" "}
                    {product.product_variations.reduce(
                      (total, variation) => total + variation.orders_count,
                      0
                    )}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeMarket;
