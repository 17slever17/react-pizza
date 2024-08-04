import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

type PaginationProps = { pageCount: number; currentPage: number | undefined; setCurrentPage: (page: number) => void }

const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage, setCurrentPage }) => (
  <ReactPaginate
    className={`${styles.root}`}
    breakLabel='...'
    nextLabel='>'
    onPageChange={(event) => setCurrentPage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={pageCount}
    previousLabel='<'
    forcePage={ currentPage !== undefined ? (currentPage - 1): undefined}
  />
)

export default Pagination
