import React, { useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { sortList } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const sortType = sort.sortProperty;
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const changeCategory = id => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = num => {
    dispatch(setCurrentPage(num));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    const order = sortType.includes('-') ? 'desc' : 'asc';
    const sortBy = sortType.replace('-', '');
    axios
      .get(
        `http://localhost:3001/items?_page=${currentPage}&_limit=4&${
          categoryId ? `category=${categoryId}` : ''
        }&_sort=${sortBy}&_order=${order}&title_like=${searchValue}`
      )
      .then(function (response) {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(`Something happend wrong: ${error}`);
      });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          categoryId: params.categoryId,
          currentPage: params.categoryId,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map(item => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={changeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onPageChange={number => onChangePage(number)} />
    </div>
  );
};

export default Home;
