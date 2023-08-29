import { FC } from 'react';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={e => onPageChange(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
