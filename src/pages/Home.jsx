import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Container from "@/components/Container";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import ProductItem from "@/components/ProductItem";
import { Link } from "react-router-dom";

export default function Home() {
  const { products, getProducts } = useContext(AppContext);
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container className="mt-10">
      <Carousel className="mx-auto">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="">
                  <CardContent className="p-6">
                    <img
                      className="w-full"
                      src="https://i.postimg.cc/Dzpfs45w/image.png"
                      alt="carousalImage"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-between">
        <h1 className="scroll-m-10 text-xl my-10 font-extrabold tracking-tight lg:text-3xl">
          LATEST PRODUCTS
        </h1>
        <Link to="/products" className="self-center">
          <p className="text-xl text-muted-foreground ">More &raquo;</p>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, 4).map((item) => (
          <ProductItem
            key={item._id}
            _id={item._id}
            mainImage={item.mainImage}
            price={item.price}
            name={item.name}
          />
        ))}
      </div>
    </Container>
  );
}
