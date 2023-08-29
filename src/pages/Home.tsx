import qs from 'qs';
import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage, setFilters, selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { sortList } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { searchValue, categoryId, sort, currentPage } = useSelector(selectFilter);
  const sortType = sort.sortProperty;

  const changeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'desc' : 'asc';
    const sortBy = sortType.replace('-', '');

    dispatch(
      //@ts-ignore
      fetchPizzas({
        order,
        sortBy,
        categoryId,
        searchValue,
        currentPage,
      })
    );

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
  }, [dispatch]);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={changeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка при загрузке контента 😕</h2>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </div>
  );
};

export default Home;
