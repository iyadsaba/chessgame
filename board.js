
//unused code just an example, please ignore 
module.exports =  class Board { 

    constructor(config){
        this.board = this.buildDataStructure();
        this.settings = {
            boardSelector : '#chess-board',
            dragLimitedAreaSelector : 'main',
            wdith : 640,
            height : 640,
        }
    }


    buildDataStructure(){ 
        let board = [];
        for(let  i = 0;i < 8;i++){
            let row = this.buildRow(i);
            board.push(row);
        }
        return board;
    }
     
    buildRow(rowNumber){
        let row = [];
        for(let j=0;j<8;j++){
             let index  = rowNumber * 8  +  j ;
             let details = [];
             details.push(index);
             console.log(details)

             row.push(details);  
        }
        return  row;
    }

    addPiece(piece, positon){
        let {x,y} = positon
        console.log(positon)
        this.board[x][y].push(piece);
        console.log(this.board[x][y])

    };  

    
}