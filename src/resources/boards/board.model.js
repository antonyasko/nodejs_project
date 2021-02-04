const { v4: uuidv4 } = require('uuid');

class Board {
  constructor({ id = uuidv4(), title = 'Board title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.length
      ? columns.map((column) => ({ ...column, id: uuidv4() }))
      : [];
  }
}

module.exports = Board;
