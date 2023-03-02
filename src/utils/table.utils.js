/*
    Utils file for Table operations
*/

export function sortTableRows(data, by, order) {
    function compare(firstElement, secondElement) {
      const firstCompare = (order === 'asc') ? firstElement[by] : secondElement[by]
      const secondCompare = (order === 'asc') ? secondElement[by] : firstElement[by]
      let comparison = 0;
      if (firstCompare > secondCompare) {
        comparison = 1;
      } else if (firstCompare < secondCompare) {
        comparison = -1;
      }
      return comparison;
    }
  
    return [...data].sort(compare);
  }