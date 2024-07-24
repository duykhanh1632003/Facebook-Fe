import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
} from "@mui/material";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";

const generateRandomData = () => {
  const products = [];
  for (let i = 1; i <= 10; i++) {
    const rating = (Math.random() * 5).toFixed(1);
    const numRatings = Math.floor(Math.random() * 1000) + 1;
    const totalPurchases = Math.floor(Math.random() * 5000) + 1;
    const price = (Math.random() * 100).toFixed(2);
    products.push({
      id: i,
      name: `Product with a very long name number ${i} that needs truncation`,
      description: `Description of product ${i} which might be very long so it needs to be truncated...`,
      image: `https://via.placeholder.com/50`,
      rating,
      numRatings,
      manufacturer: `Manufacturer ${i}`,
      price,
      totalPurchases,
      totalRevenue: (price * totalPurchases).toFixed(2),
    });
  }
  return products;
};

const products = generateRandomData();

const truncateText = (text, length = 22) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
};

const renderRating = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} style={{ color: "#FFD700", fontSize: "40px" }} />);
  }

  if (hasHalfStar) {
    stars.push(
      <StarHalf key="half" style={{ color: "#FFD700", fontSize: "40px" }} />
    );
  }

  while (stars.length < 5) {
    stars.push(
      <StarBorder
        key={stars.length}
        style={{ color: "#FFD700", fontSize: "40px" }}
      />
    );
  }

  return <Box display="flex">{stars}</Box>;
};

const BestSelling = () => {
  return (
    <div className="ml-3 mt-3 bg-white dark:bg-gray-800 rounded-lg p-3">
      <div className="font-bold text-[#403E57] dark:text-white text-xl">
        Top sản phẩm được bán nhiều nhất
      </div>
      <TableContainer component={Paper} className="mt-5  dark:bg-gray-900">
        <Table>
          <TableHead className="bg-blue-600 ">
            <TableRow className="text-white font-bold">
              <TableCell className="text-white font-bold">Stt</TableCell>
              <TableCell className="text-white font-bold">Ảnh</TableCell>
              <TableCell className="text-white font-bold">Sản phẩm</TableCell>
              <TableCell className="text-white font-bold">Rating</TableCell>
              <TableCell className="text-white font-bold">
                Tỉ lệ rating
              </TableCell>
              <TableCell className="text-white font-bold">
                Nhà sản xuất
              </TableCell>
              <TableCell className="text-white font-bold">Giá tiền</TableCell>
              <TableCell className="text-white font-bold">
                Tổng lượt mua
              </TableCell>
              <TableCell className="text-white font-bold">
                Tổng số tiền{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow
                key={product.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-700"
                }
              >
                <TableCell className="dark:text-white">{index + 1}</TableCell>
                <TableCell>
                  <Avatar src={product.image} />
                </TableCell>
                <TableCell className="dark:text-white">
                  <div>{truncateText(product.name)}</div>
                  <div className="text-gray-500 dark:text-gray-300">
                    {truncateText(product.description)}
                  </div>
                </TableCell>
                <TableCell>{renderRating(product.rating)}</TableCell>
                <TableCell className="dark:text-white">
                  {product.rating} ({product.numRatings} đánh giá)
                </TableCell>
                <TableCell className="dark:text-white">
                  {product.manufacturer}
                </TableCell>
                <TableCell className="dark:text-white">
                  ${product.price}
                </TableCell>
                <TableCell className="dark:text-white">
                  {product.totalPurchases}
                </TableCell>
                <TableCell className="dark:text-white">
                  ${product.totalRevenue}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BestSelling;
