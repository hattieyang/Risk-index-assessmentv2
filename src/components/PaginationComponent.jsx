function PaginationComponent({ currentPage, pageCount, handlePreviousPage, handleNextPage, handlePageChange }) {
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <a 
        href="#"
        onClick={(e) => { e.preventDefault(); handlePreviousPage(); }}
        className={currentPage === 1 ? 'disabled' : ''}
      >
        &laquo;
      </a>
      {pageNumbers.map(number => (
        <a 
          key={number}
          href="#"
          onClick={(e) => { e.preventDefault(); handlePageChange(number); }}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </a>
      ))}
      <a 
        href="#"
        onClick={(e) => { e.preventDefault(); handleNextPage(); }}
        className={currentPage === pageCount ? 'disabled' : ''}
      >
        &raquo;
      </a>
    </div>
  );
}

export default PaginationComponent;
