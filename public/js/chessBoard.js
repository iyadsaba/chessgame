class Board {
  constructor(config) {
    this.options = {
      selector: document.getElementById("chess-board"),
      width: 600,
    };
    if (!!config) {
      this.options = {
        ...this.options,
        ...config
      };
    }
  }

  renderBoard() {
    let rootNode = this.options.selector;
    for (let index = 1; index < 9; index++) {
      let rowType = index % 2 === 0 ? 'even' : 'odd';
      this.createBoardRow(rootNode, rowType);
    }
  }

  createSquare(parentNode, className) {
    let square = document.createElement('div');
    square.classList.add(className);
    parentNode.appendChild(square);
  }

  createBoardRow(parentNode, rowType) {
    let index = 1;
    while (index < 9) {
      let className = this.getColor(index, rowType);
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


  addPiece(type, position){
    let piece = document.createElement('div');
    piece.innerHTML = type;
    let parentNode = document.querySelectorAll(".chessboard>div")[position];
    !!parentNode && parentNode.appendChild(piece);
  }

}
// export  default Board;