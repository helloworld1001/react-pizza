import React from 'react';

import cartEmpty from '../assets/img/empty-cart.png'


const CartEmpty = () => {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая 😕</h2>
            <p>
              Вероятнее всего, вы ещё ничего не заказывали.<br />
              Для того, чтобы сделать заказ, перейди на главную страницу.
            </p>
            <img src={cartEmpty} alt="Empty cart" />
            <a href="/" className="button button--black">
              <span>Вернуться назад</span>
            </a>
          </div>
    );
}

export default CartEmpty;
