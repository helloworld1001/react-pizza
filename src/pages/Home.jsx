import React from 'react';
import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

    useEffect(() => {
        const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';
        const sortBy = sortType.sortProperty.replace('-', '');

        setIsLoading(true);
        fetch(`http://localhost:3001/items?${categoryId ? `category=${categoryId}` : ''}&_sort=${sortBy}&_order=${order}`)
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={i => setCategoryId(i)} />
                <Sort value={sortType} onChangeSort={obj => setSortType(obj)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
                    : items.map(item => <PizzaBlock key={item.id} {...item} />)}
            </div>
        </div>
    );
};

export default Home;
