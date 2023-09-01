import  React, { FC } from "react";
// import { useWhyDidYouUpdate } from "ahooks";


type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void
}

const Categories: FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {

  // useWhyDidYouUpdate('Categories', { value, onChangeCategory } );

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li key={index} onClick={() => onChangeCategory(index)} className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
