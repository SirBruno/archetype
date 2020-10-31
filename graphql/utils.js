const Schemas = require('../models/Schemas')

module.exports = {
  paginateResults: ({
    after: cursor,
    pageSize = 3,
    category,
    results,
    getCursor = () => pageSize - 1,
  }) => {
    if (pageSize < 1) return [];

    // ##################################################################
    // ##################################################################
    if (category !== undefined) {
      let postCategory = [category.toUpperCase()]
      let filteredArr = results.filter(function (item) {
        return postCategory.indexOf(item.categoryId.toUpperCase()) > -1
      })

      results = filteredArr
    }
    // ##################################################################
    // ##################################################################

    if (!cursor) return results.slice(0, pageSize);

    let cursorIndex = results.findIndex(item => {

      let itemCursor = item.cursor ? item.cursor : getCursor();

    });

    cursorIndex = parseInt(cursor);
    console.log(results.length)

    return cursorIndex >= 0
      ? results.slice(
        cursorIndex,
        Math.min(results.length, cursorIndex + pageSize),
      )
      : results.slice(0, pageSize);

    // return cursorIndex >= 0
    //   ? cursorIndex === results.length - 1 // don't let us overflow
    //     ? []
    //     : results.slice(
    //       cursorIndex,
    //       Math.min(results.length, cursorIndex + pageSize),
    //     )
    //   : results.slice(0, pageSize);
  }
}