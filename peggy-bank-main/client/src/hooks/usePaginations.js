import { useState } from "react";

// const usePagination = (perPageRecords, totalPageRecords) => {
//   const totalPages = Math.ceil(totalPageRecords / perPageRecords);
//   const [startPageIndex, setStartPageIndex] = useState(0);
//   const [endPageIndex, setEndPageIndex] = useState(perPageRecords - 1);
//   const [currentPageIndex, setCurrentPageIndex] = useState(1);

//   const displayPage = (pageNo) => {
//     setCurrentPageIndex(pageNo);
//     let end_page_index = perPageRecords * pageNo - 1;
//     let start_page_index = perPageRecords * pageNo - perPageRecords;
//     setStartPageIndex(start_page_index);

//     if (end_page_index > totalPageRecords)
//       setEndPageIndex(totalPageRecords - 1);
//     else setEndPageIndex(end_page_index);
//   };

//   return [
//     totalPages,
//     startPageIndex,
//     endPageIndex,
//     currentPageIndex,
//     displayPage,
//   ];
// };

// export default usePagination;
const usePagination = (perPageRecords, totalPageRecords) => {
  const totalPages = Math.ceil(totalPageRecords / perPageRecords);
  const [startPageIndex, setStartPageIndex] = useState(0);
  const [endPageIndex, setEndPageIndex] = useState(perPageRecords - 1);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const displayPage = (pageNo) => {
    setCurrentPageIndex(pageNo);
    let end_page_index = perPageRecords * pageNo - 1;
    let start_page_index = perPageRecords * pageNo - perPageRecords;
    setStartPageIndex(start_page_index);

    if (end_page_index > totalPageRecords)
      setEndPageIndex(totalPageRecords - 1);
    else setEndPageIndex(end_page_index);
  };

  return [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex,
    displayPage,
  ];
};
export default usePagination;
