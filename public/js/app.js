// import 'Board' from './chessBoard';
// function docReady(fn) {
//     // see if DOM is already available
//     if (document.readyState === "complete" || document.readyState === "interactive") {
//         // call on next available tick
//         setTimeout(fn, 1);
//     } else {
//         document.addEventListener("DOMContentLoaded", fn);
//     }
// }

jQuery(document).ready(function(){

    let chessBoard = new Board();
    chessBoard.renderBoard();
    chessBoard.addPiece(('&#9822;'),1);

    jQuery('.chessboard > div > div').draggable(function(e) {
        console.log(e);
        console.log(this);
        console.log("item dragged ")
    });

//     let events = ['darg', 'dragstart' ,'dragenter', 'dragover' , 'dragleave', 'dragexit' , 'drop'];
//     let draggableElement = document.querySelector(".chessboard>div>div");
// console.log(draggableElement)
//     for(let eventType  of events){
//         jQuery(draggableElement).on(eventType,function(event){
//             console.log(`eventType : ${eventType}`,event);
//             let style = getComputedStyle(draggedElement);
//             console.log(`left : ${style.left}`)
//             console.log(`top : ${style.top}`)

//         })
//     }


});