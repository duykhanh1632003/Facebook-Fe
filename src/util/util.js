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
export const generateAttributes = () => {
  return [
    { id: 1, category: "Color", value: "Blue,green,white" },
    { id: 2, category: "Size", value: "S,M,L,XL" },
    { id: 3, category: "Material", value: "Cotton,Polyester" },
    { id: 4, category: "Style", value: "Classic,modern,ethnic,western" },
    { id: 5, category: "Meat Type", value: "Fresh,Frozen,Marinated" },
    { id: 6, category: "Weight", value: "1kg,2kg,3kg,over 5kg" },
    {
      id: 7,
      category: "Packaging",
      value: "Plastic box, paper, nylon, tin cans",
    },
    {
      id: 8,
      category: "Kind of food",
      value: "Dried food, wet food, supplementary food",
    },
    { id: 9, category: "Milk", value: "Formula milk, fresh milk" },
    { id: 10, category: "Combo", value: "Cat food, dog food" },
  ];
};
