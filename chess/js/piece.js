
const Draggable = require('Draggable');
const axios = require('axios');

export class Piece {
    constructor(pieceSelector, zoneSelector ,chessBoard, pieceObj) {
        chessBoard.addPiece(pieceObj);
        this.pieceElement = document.querySelector(pieceSelector);
        this.squares = [...(chessBoard.getBoardElement().children)];
        this.initialCoordinates = {
            x: 0,
            y: 0
        }

        this.option = {
            limit: document.querySelector(zoneSelector),
            onDragStart: this.startDragHandler.bind(this),
            onDragEnd: this.endDragHandler.bind(this),
        };
         this.draggableElement = new Draggable(this.pieceElement, this.option);  
    };

    startDragHandler(element, x, y, event) {
        
        this.initialCoordinates.x = x;
        this.initialCoordinates.y = y;
        const start =this.getIndex();
        const name = this.pieceElement.getAttribute('name');
        axios.post('/claculateValidMoves', {start,name }).then((response) => {
            const movieOptions = response.data.movieOptions;
            !!movieOptions && !!movieOptions.length && this.addClass(response.data.movieOptions, 'valid');
        }).catch(error => console.log(error));
    }

    endDragHandler(element, x, y, event) {
        this.removeClass('valid');
        const end = this.getIndex();
        axios.post('/validateCurrentPosition', {end}).then((response) => {
            if (response.data.isValidMove) {
                this.setPosition(end);
            } else {
                this.resetPosition();
            }
        }).catch( error => console.log(error));
    }

     getIndex() {
        let index = -1;
        for (let i = 0; i < this.squares.length; i++) {
            const square = this.squares[i];
            let xDiff = Math.abs(square.offsetLeft - this.pieceElement.offsetLeft);
            let yDiff = Math.abs(square.offsetTop - this.pieceElement.offsetTop);
            if (this.isWrapper(xDiff, yDiff)) {
                index = i;
                break;
            }
        }
        return index;
    }
    
     resetPosition() {
        this.draggableElement.set(this.initialCoordinates.x, this.initialCoordinates.y);
    }
    
     setPosition(index){
        let newPosition = this.squares[index];
        this.draggableElement.set(newPosition.offsetLeft,newPosition.offsetTop);
    }
    
    
     isWrapper(xDiff, yDiff) {
        return (xDiff <= 40) && (yDiff <= 40);
    }
    

     addClass(indexies, className){
        indexies.forEach(index => {
            this.squares[index].classList.add(className);
        });
    }
    
    removeClass(className){
        [...document.querySelectorAll(`.${className}`)].forEach(element =>{
            element.classList.remove(className)
        });
    }
    
    


}