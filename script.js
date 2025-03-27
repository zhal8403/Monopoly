
let position = 1;

function movePlayer() {
    let die1 = Math.floor(Math.random() * 6) + 1;
    let die2 = Math.floor(Math.random() * 6) + 1;
    let rollTotal = die1 + die2;
 
    document.getElementById("dice1").textContent = die1;
    document.getElementById("dice2").textContent = die2;

    position = (position + rollTotal) % 41;

    let newSpace = document.getElementById("id" + position);
    let playerToken = document.getElementById("player");

    if (newSpace) {
        newSpace.appendChild(playerToken);
    }
    
}
