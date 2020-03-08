function getOptions(index , name) {
    let position =getCoordinates(index);
    return getPieceOptions(position , name);
}

function getCoordinates(index){
    return { 
        x : Math.floor(index/8),
        y : index %8
    }
}

function getPieceOptions(position, name) {
    let options = [];
    let rules  =getPieceRules(name);
    for (let rule of rules ) {
        tmpX = position.x + rule[0];
        tmpY = position.y + rule[1];
        if (isValidMove(tmpX,tmpY)) {
            let option = tmpX * 8 + tmpY;
            options.push(option)
        }
    }
    return options;
}

function isValidMove(x ,y){
    return x < 8 && x > -1 && y < 8 && y > -1;
}

function getPieceRules(name){
    let piecesRoles = {
        Knight : [[2, 1],[2, -1],[-2, 1],[-2, -1],[1, 2], [1, -2], [-1, 2],[-1, -2] ]
    }
    return piecesRoles[name];
}

module.exports = {
    getOptions
}