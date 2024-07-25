import { faker } from "@faker-js/faker";

const generateProducts = (count = 30) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    products.push({
      id: i + 1,
      thumbnail: faker.image.image(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      rating: parseFloat((Math.random() * 5).toFixed(1)),
      price: faker.commerce.price(),
      purchases: faker.datatype.number(),
      totalRevenue: faker.commerce.price(),
      status: Math.random() > 0.5 ? "public" : "draft",
    });
  }

  return products;
};

export default generateProducts;
