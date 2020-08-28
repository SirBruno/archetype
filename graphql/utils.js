const Schemas = require('../models/Schemas')

module.exports = {
  paginateResults: ({
    after: cursor,
    pageSize = 3,
    results,
    // can pass in a function to calculate an item's cursor
    getCursor = () => pageSize - 1,
  }) => {
    if (pageSize < 1) return [];

    // console.log(cursor);

    if (!cursor) return results.slice(0, pageSize);
    
    let cursorIndex = results.findIndex(item => {

      // if an item has a `cursor` on it, use that, otherwise try to generate one
      let itemCursor = item.cursor ? item.cursor : getCursor();

      // catch (e) { return e.message }

      // console.log(cursor);
      // console.log(itemCursor);

      // if there's still not a cursor, return false by default
      // return itemCursor ? itemCursor : false;
    });

    cursorIndex = parseInt(cursor);
    // console.log("results length: " + results.length);
    // console.log("cursor index: " + cursorIndex);
    // console.log("cursor: " + cursor)
    // console.log("pageSize: " + pageSize)
    // console.log("math min: " + Math.min(results.length, cursorIndex + 1 + pageSize));
    // console.log("stuff: " + (parseInt(cursor) + 1 + pageSize));

    return cursorIndex >= 0
      ? cursorIndex === results.length - 1 // don't let us overflow
        ? []
        : results.slice(
          cursorIndex,
          Math.min(results.length, cursorIndex + pageSize),
        )
      : results.slice(0, pageSize);
  }
}