import bcrypt from "bcryptjs";

const dataShop = {
  users: [
    {
      name: "Filippo",
      email: "filippo.moretti6@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "John",
      email: "filippo.cicco6@gmail",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "product 1",
      date:"1982-11-26",
      category: "season 1",
      image: "product-1.jpeg",
      price: 80,
      countInStock: 1,
      rating: 4.5,
      numReviews: 10,
      description: "Suuuper coool!!!",
    },
    {
      name: "product 2",
      date:"1982-11-26",
      category: "season 1",
      image: "product-2.jpeg",
      price: 80,
      countInStock: 1,
      rating: 4.5,
      numReviews: 10,
      description: "Suuuper coool!!!",
    },
    {
      name: "product 3",
      date:"1982-11-26",
      category: "season 1",
      image: "product-3.jpeg",
      price: 80,
      countInStock: 1,
      rating: 4.5,
      numReviews: 10,
      description: "Suuuper coool!!!",
    },
    {
      name: "product 4",
      date:"1982-11-26",
      category: "season 1",
      image: "product-4.jpeg",
      price: 80,
      countInStock: 1,
      rating: 4.5,
      numReviews: 10,
      description: "Suuuper coool!!!",
    },
    {
      name: "product 5",
      date:"1982-11-26",
      category: "season 1",
      image: "product-5.jpeg",
      price: 80,
      countInStock: 1,
      rating: 4.5,
      numReviews: 10,
      description: "Suuuper coool!!!",
    },
    {
      name: "product 6",
      date:"1982-11-26",
      category: "season 1",
      image: "product-6.jpeg",
      price: 80,
      countInStock: 1,
      rating: 4.5,
      numReviews: 10,
      description: "Suuuper coool!!!",
    },
  ],
  
};

export default dataShop;
