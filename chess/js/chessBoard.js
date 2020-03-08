export class Board {
  constructor(config) {
    this.options = {
      element: document.querySelector('.chessboard'),
      width: 600,
    };
    if(!!config){
      this.options = {
        ...this.options,
        ...config
      };
    }

  }

  setElement(selector) {
    this.options.element = document.querySelector(selector);
  }
  getElement() {
    return this.options.element;
  }

  renderBoard() {
    const rootNode = this.options.element;
    for (let index = 1; index < 9; index++) {
      const rowType = index % 2 === 0 ? 'even' : 'odd';
      this.createBoardRow(rootNode, rowType);
    }

  }

  createSquare(parentNode, className) {
    const square = document.createElement('div');
    square.classList.add(className);
    parentNode.appendChild(square);
  }

  createBoardRow(parentNode, rowType) {
    let index = 1;
    while (index < 9) {
      const className = this.getColor(index, rowType);
      this.createSquare(parentNode, className);
      index++;
    }
  }

  getColor(index, rowType) {
    let color;
    if (rowType == 'even') {
      color = index % 2 == 0 ? 'white' : 'black';
    } else if (rowType === 'odd') {
      color = index % 2 === 0 ? 'black' : 'white';
    }
    return color;
  }


  addPiece(type, position, name) {
    let piece = document.createElement('div');
    piece.innerHTML = type;
    piece.setAttribute('name', name)
    let parentNode = document.querySelectorAll(".chessboard>div")[position];
    !!parentNode && parentNode.appendChild(piece);

  }

}
