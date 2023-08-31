import { FC } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl : string;
    title : string;
    price: number
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`http://localhost:3001/items/?id=${Number(id)}`);
        setPizza(data[0]);
        if(!data.length) {
            throw new Error('Ошибка при получении пиццы');
        }        
      } catch (error) {
        alert(error);
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <h1>Загрузка...</h1>;
  }

  return (
    <div className="container">
      <img alt="pizzaImg" src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
