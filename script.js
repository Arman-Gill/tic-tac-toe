const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
const cells = document.querySelectorAll('.board .cell')
const board = document.getElementById('board')
const messageScreen = document.getElementById('message-screen')
const messageScreenText = document.querySelector('[data-message-text]')
const restartButton = document.getElementById('restartButton')
let circlesTurn


restartButton.addEventListener('click', startGame)


function startGame(){
    circlesTurn = false
    
    cells.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true} )
    })
    
    setBoardClass()
    messageScreen.classList.remove('show')
}

function handleClick(evt){
    const cellElement = evt.target
    const currentClass = circlesTurn? CIRCLE_CLASS:X_CLASS 
    placeMark(cellElement, currentClass)

    if (checkWin(currentClass)){
        endGame(true)
    }
    else if (isDraw()){
        endGame(false)
    }

    swapTurns()
    setBoardClass()
    

    
}

function endGame(gameWin){

    messageScreen.classList.add('show')

    if (gameWin){
        const winner = circlesTurn? CIRCLE_CLASS : X_CLASS
        messageScreenText.innerText = `${winner} Wins!`
    }
    else{
        messageScreenText.innerText = 'Draw'
    }
}

function placeMark(cellElement, currentClass){
    cellElement.classList.add(currentClass)
}

function swapTurns(){
    circlesTurn = !circlesTurn
    
}

function setBoardClass(){
    board.classList.remove(CIRCLE_CLASS)
    board.classList.remove(X_CLASS)

    if (circlesTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cells[index].classList.contains(currentClass)
        })
    })
}

function isDraw(){
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

startGame()