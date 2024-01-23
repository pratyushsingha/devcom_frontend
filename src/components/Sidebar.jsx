import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { sortFilter } from "../utils";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Sidebar = () => {
  const {
    categories,
    handlePrice,
    selectedPrice,
    handleCategory,
    selectedCategory,
    getCategory,
    handleSort,
    selectedSort,
  } = useContext(AppContext);

  return (
    <Card className="w-80">
      <CardHeader className="flex justify-between">
        <CardTitle className=" scroll-m-20 text-2xl font-semibold tracking-tight uppercase">
          filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="font-bold hover:underline hover:text-purple-700">Sort</p>
        <Select
          defaultValue={selectedSort}
          onValueChange={handleSort}
          value={selectedSort}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>none</SelectLabel>
              {sortFilter.map((filter) => (
                <SelectItem key={filter._id} value={filter.name}>
                  {filter.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <p className="font-bold hover:underline hover:text-purple-700">
          Price: {selectedPrice}
        </p>
        <Slider
          value={[selectedPrice]}
          onValueChange={(newValue) => handlePrice(newValue[0])}
          defaultValue={[1000]}
          max={1000}
          min={20}
          step={1}
        />
        <p className="font-bold hover:underline hover:text-purple-700">
          Category
        </p>
        <Select
          defaultValue={selectedCategory}
          onValueChange={handleCategory}
          value={selectedCategory}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={"Select a option" || selectedCategory} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>none</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
