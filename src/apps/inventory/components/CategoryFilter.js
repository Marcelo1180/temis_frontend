import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Button } from "antd";
import { URL_LIST_CATEGORIES } from "../../../constants";
import { readAllCategories } from "../actions/shoppingActions";
import { apiPrivate } from "../../../core/apiCall";

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { categories } = state.shopping;

  useEffect(() => {
    apiPrivate
      .get(URL_LIST_CATEGORIES)
      .then((res) => {
        dispatch(readAllCategories(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Products
  const filterProductByCategory = (category_id) => {
    setSelectedCategory(category_id);
  };

  return (
    <div>
      <Space>
        <Button
          shape="round"
          type={selectedCategory === 0 ? "primary" : null}
          onClick={() => filterProductByCategory(0)}
        >
          Todos
        </Button>
        {categories.map((category) => (
          <Button
            shape="round"
            key={category.id}
            type={selectedCategory === category.id ? "primary" : null}
            onClick={() => filterProductByCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default CategoryFilter;
