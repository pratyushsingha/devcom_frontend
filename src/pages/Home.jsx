import React from "react";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const HomeProducts = [
  {
    _id: "658e83b6864b3a0705a413f0",
    category: "658e83b5864b3a0705a41304",
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    mainImage: {
      url: "https://loremflickr.com/640/480/product?lock=4514475199692800",
      localPath: "",
      _id: "658e83b6864b3a0705a413f1",
    },
    name: "Licensed Plastic Keyboard",
    owner: "658d9b19a5419eacf4ad6462",
    price: 262,
    stock: 173,
    subImages: [
      {
        url: "https://loremflickr.com/640/480/product?lock=417391492202496",
        localPath: "",
        _id: "658e83b6864b3a0705a413f2",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=5570443396251648",
        localPath: "",
        _id: "658e83b6864b3a0705a413f3",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=3900923730460672",
        localPath: "",
        _id: "658e83b6864b3a0705a413f4",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=7984979187335168",
        localPath: "",
        _id: "658e83b6864b3a0705a413f5",
      },
    ],
    __v: 0,
    createdAt: "2023-12-29T08:30:46.748Z",
    updatedAt: "2023-12-29T08:30:46.748Z",
  },
  {
    _id: "658e83b6864b3a0705a413f6",
    category: "658e83b5864b3a0705a41302",
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    mainImage: {
      url: "https://loremflickr.com/640/480/product?lock=6068949343010816",
      localPath: "",
      _id: "658e83b6864b3a0705a413f7",
    },
    name: "Handmade Bronze Computer",
    owner: "658d9b19a5419eacf4ad648f",
    price: 291,
    stock: 165,
    subImages: [
      {
        url: "https://loremflickr.com/640/480/product?lock=4497782238871552",
        localPath: "",
        _id: "658e83b6864b3a0705a413f8",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=7505903532113920",
        localPath: "",
        _id: "658e83b6864b3a0705a413f9",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=1044812264374272",
        localPath: "",
        _id: "658e83b6864b3a0705a413fa",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=1917194214572032",
        localPath: "",
        _id: "658e83b6864b3a0705a413fb",
      },
    ],
    __v: 0,
    createdAt: "2023-12-29T08:30:46.748Z",
    updatedAt: "2023-12-29T08:30:46.748Z",
  },
  {
    _id: "658e83b6864b3a0705a413fc",
    category: "658e83b5864b3a0705a41306",
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    mainImage: {
      url: "https://loremflickr.com/640/480/product?lock=5758857043247104",
      localPath: "",
      _id: "658e83b6864b3a0705a413fd",
    },
    name: "Handcrafted Frozen Shoes",
    owner: "658d9b19a5419eacf4ad644a",
    price: 403,
    stock: 54,
    subImages: [
      {
        url: "https://loremflickr.com/640/480/product?lock=5305831457292288",
        localPath: "",
        _id: "658e83b6864b3a0705a413fe",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=2158882543632384",
        localPath: "",
        _id: "658e83b6864b3a0705a413ff",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=1095195259043840",
        localPath: "",
        _id: "658e83b6864b3a0705a41400",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=7712090372440064",
        localPath: "",
        _id: "658e83b6864b3a0705a41401",
      },
    ],
    __v: 0,
    createdAt: "2023-12-29T08:30:46.748Z",
    updatedAt: "2023-12-29T08:30:46.748Z",
  },
  {
    _id: "658e83b6864b3a0705a41402",
    category: "658e83b5864b3a0705a41303",
    description: "The Football Is Good For Training And Recreational Purposes",
    mainImage: {
      url: "https://loremflickr.com/640/480/product?lock=8348380453404672",
      localPath: "",
      _id: "658e83b6864b3a0705a41403",
    },
    name: "Elegant Concrete Cheese",
    owner: "658d9b19a5419eacf4ad6414",
    price: 356,
    stock: 73,
    subImages: [
      {
        url: "https://loremflickr.com/640/480/product?lock=3977688433819648",
        localPath: "",
        _id: "658e83b6864b3a0705a41404",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=4558051312926720",
        localPath: "",
        _id: "658e83b6864b3a0705a41405",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=8170296324390912",
        localPath: "",
        _id: "658e83b6864b3a0705a41406",
      },
      {
        url: "https://loremflickr.com/640/480/product?lock=1048837684723712",
        localPath: "",
        _id: "658e83b6864b3a0705a41407",
      },
    ],
    __v: 0,
    createdAt: "2023-12-29T08:30:46.748Z",
    updatedAt: "2023-12-29T08:30:46.748Z",
  },
];

const Home = () => {
  return (
    <Container>
      <div className="flex justify-center items-center">
        <img
          className="w-fit-content"
          src="https://i.postimg.cc/7YHVjpJK/15275006-5594188.jpg"
          alt=""
        />
      </div>
      <h1 className="text-3xl my-3">LATEST PRODUCTS</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {HomeProducts.map((item) => (
          <ProductItem key={item._id} product={item} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
