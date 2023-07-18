import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
    const { categoryId, sort } = useSelector((state) => state.filter);
    const sortTye = sort.sortProperty;
    const dispatch = useDispatch();
    const { searchValue } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const changeCategory = (id) => {
        dispatch(setCategoryId(id));

    }

    useEffect(() => {
        const order = sortTye.includes('-') ? 'desc' : 'asc';
        const sortBy = sortTye.replace('-', '');

        setIsLoading(true);
        fetch(
            `http://localhost:3001/items?_page=${currentPage}&_limit=4&${categoryId ? `category=${categoryId}` : ''
            }&_sort=${sortBy}&_order=${order}&title_like=${searchValue}`
        )
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortTye, searchValue, currentPage]);

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
            <Pagination onPageChange={number => setCurrentPage(number)} />
        </div>
    );
};

export default Home;
