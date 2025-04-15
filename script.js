class Player
{
    constructor(playerNum, color)
    {
        this.playerNum = playerNum;
        this.properties = [];
        this.balance = 1500;
        this.position = 1;
        this.color = color;
        this.jailed = false;
        this.getOutOfJail = false;
        this.jailTime = 0;
        this.dub = false;
        this.out = false;
        this.sigma = "very";
    }
}

class Property
{
  constructor(position, price, rents, housePrice, mortgage, color, propertyNames)
  {
      this.whoOwned = null;
      this.type = "property";
      this.price = price;
      this.position = position;
      this.owned = false;
      this.rents = rents;
      this.housePrice = housePrice;
      this.mortgage = mortgage;
      this.house = 0;
      this.color = color;
      this.monopoly = false;
      this.propertyNames = propertyNames;
  }
}
let turn =0;
let house = 32;
let hotel = 12;
let double = 0;

let player1 = new Player(1, "blue");
let player2 = new Player(2, "red");
let player3 = new Player(3, "green");
let player4 = new Player(4, "yellow");

let price = [60, 60, 200, 100, 100, 120, 140, 140, 160, 200, 180, 180, /*utility*/150, 200, 220, 220, 240, 200, 260, 260, /*utility*/150, 280, 300, 300, 320, 200, 350, 400];
let position = [2, 4, 6, 7, 9, 10, 12, 14, 15, 16, 17, 18, 19, 20, 22, 24, 25, 26, 27, 28, 29, 30, 32, 34, 35, 36, 38, 40];
let mortgage = [30, 30, 100, 50, 50, 60, 70, 70, 80, 100, 90, 90, 75, 100, 110, 110, 120, 130, 100, 130, 140, 75, 150, 150, 160, 100, 175, 200];
let housePrices = [50, 50, -1, 50, 50, 50, 100, 100, 100, -1, 100, 100, -1, 100, 150, 150, 150, -1, 150, 150, -1, 150, 200, 200, 200, -1, 200, 200];
let color = ["violet", "violet", null, "indigo", "indigo", "indigo", "pink", "pink", "pink", null, "orange", "orange", null, "orange", "red", "red", "red", null, "yellow", "yellow", null, "yellow", "green", "green", "green", null, "blue", "blue"]
let propertyNames = [
    "Mediterranean Avenue",
    "Baltic Avenue",
    "Reading Railroad",
    "Oriental Avenue",
    "Vermont Avenue",
    "Connecticut Avenue",
    "St. Charles Place",
    "States Avenue",
    "Virginia Avenue",
    "Pennsylvania Railroad",
    "St. James Place",
    "Tennessee Avenue",
    "Electric Company",
    "New York Avenue",
    "Kentucky Avenue",
    "Indiana Avenue",
    "Illinois Avenue",
    "B&O Railroad",
    "Atlantic Avenue",
    "Ventnor Avenue",
    "Water Works",
    "Marvin Gardens",
    "Pacific Avenue",
    "North Carolina Avenue",
    "Pennsylvania Avenue",
    "Short Line Railroad",
    "Park Place",
    "Boardwalk"
];  
let rents = [
    [2, 10, 30, 90, 160, 250], // Mediterranean Avenue
    [4, 20, 60, 180, 320, 450], // Baltic Avenue
    [-1],
    [6, 30, 90, 270, 400, 550], // Oriental Avenue
    [6, 30, 90, 270, 400, 550], // Vermont Avenue
    [8, 40, 100, 300, 450, 600], // Connecticut Avenue
    [10, 50, 150, 450, 625, 750], // St. Charles Place
    [10, 50, 150, 450, 625, 750], // States Avenue
    [12, 60, 180, 500, 700, 900], // Virginia Avenue
    [-1],
    [14, 70, 200, 550, 750, 950], // St. James Place
    [14, 70, 200, 550, 750, 950], // Tennessee Avenue
    [-1],
    [16, 80, 220, 600, 800, 1000], // New York Avenue
    [18, 90, 250, 700, 875, 1050], // Kentucky Avenue
    [18, 90, 250, 700, 875, 1050], // Indiana Avenue
    [20, 100, 300, 750, 925, 1100], // Illinois Avenue
    [-1],
    [22, 110, 330, 800, 975, 1150], // Atlantic Avenue
    [22, 110, 330, 800, 975, 1150], // Ventnor Avenue
    [-1],
    [24, 120, 360, 850, 1025, 1200], // Marvin Gardens
    [26, 130, 390, 900, 1100, 1275], // Pacific Avenue
    [26, 130, 390, 900, 1100, 1275], // North Carolina Avenue
    [28, 150, 450, 1000, 1200, 1400], // Pennsylvania Avenue
    [-1],
    [35, 175, 500, 1100, 1300, 1500], // Park Place
    [50, 200, 600, 1400, 1700, 2000]  // Boardwalk
];
let properties = [];

for (let i = 0; i < 28; i++)
{
  properties.push(new Property(position[i], price[i], rents[i][0], housePrices[i], mortgage[i], color[i], propertyNames[i]));
}

function move()
{
    if (double == 0)
    {
        turn++;
        document.getElementById("message").innerHTML = "";
    }
    console.log(turn)

    document.getElementById("player1").style.backgroundColor = "#d1ecf1";
    document.getElementById("player2").style.backgroundColor = "#d1ecf1";
    document.getElementById("player3").style.backgroundColor = "#d1ecf1";
    document.getElementById("player4").style.backgroundColor = "#d1ecf1";

    let die1 = Math.floor(Math.random() * 6) + 1;
    let die2 = Math.floor(Math.random() * 6) + 1;
    let rollTotal = die1 + die2;

    document.getElementById("dice1").src = die1 + ".png";
    document.getElementById("dice2").src = die2 + ".png";
    console.log("Die 1: " + die1 + " Die 2: " + die2);

    let current_player = player1;
    if(turn % 4 == 1)
        current_player = player1
    else if(turn % 4 == 2)
        current_player = player2
    else if(turn % 4 == 3)
        current_player = player3
    else if(turn % 4 == 0)
        current_player = player4

    if (current_player.out)
    {
        return;
    }

    document.getElementById("player" + current_player.playerNum).style.backgroundColor = "#AAAAFF";

    if (current_player.jailed)
    {
        if (die1 != die2)
        {
            current_player.jailTime++;
            console.log(current_player.jailTime)
            if(current_player.jailTime < 4)
            {
                turn++;
                return 0;
            }
            else
            {
                current_player.balance -= 50;
                updateBalances(current_player);
                document.getElementById("message").innerHTML = "You paid $50 to get out of jail";
                current_player.jailed = false;
            }
        }
    }

    let prevPosition = current_player.position;
    current_player.position = (current_player.position + rollTotal) %41

    let newSpace = document.getElementById("id" + current_player.position);

    let color = document.getElementById(current_player.color)

    if (newSpace) {
        newSpace.appendChild(color);
    }

    if (prevPosition > current_player.position)
    {
        current_player.balance += 200;
        updateBalances(current_player);
    }

    penalties(current_player);

    if (die1 == die2)
    {
        double++;
        console.log("double" + double)
        if (double == 3)
            {
                current_player.jailed = true;
                document.getElementById("message").innerHTML = "Three double rolls is illegal"
                current_player.position = 11;
                document.getElementById("id" + current_player.position).appendChild(document.getElementById(current_player.color));
                double = 0;
            }
        return 0;
    }

    double = 0;
}

function penalties(player)
{
    if(player.position === 3 || player.position === 13 || player.position === 33)
    {
        community_chest(player)
    }
    
    if(player.position === 8 || player.position === 23 || player.position === 37)
    {
        chance(player)
    }

    if (player.position == 5)
    {
        player.balance -= 200;
        updateBalances(player)
    }

    if (player.position == 39)
    {
        player.balance -= 75;
        updateBalances(player)
    }
    
    if (!player.properties.includes(properties[player.position]))
    {
        rent(player);
    }

    if(player.position === 31)
    {
        if (!player.getOutOfJail)
            {
            document.getElementById("message").innerHTML = "You were Arrested";
            player.jailed = true;
            player.jailTime = 0;
            player.position = 11;
            document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
        }
        else
        {
            document.getElementById("message").innerHTML = "You went to jail, but used your get out of jail free card";
            player.getOutOfJail = false;
        }
    }

    for (let i = 0; i < 40; i++) {
        if(player.position === properties[i].position){
            cardDisplay(properties[i]);
        }
    }
}

function rent(player) {
    for (let i = 0; i < 28; i++) {
        if (player.position !== properties[i].position) {
            continue;
        }

        let owner = null;

        if (player1.properties.includes(properties[i].position)) {
            owner = player1;
        } 
        else if (player2.properties.includes(properties[i].position)) {
            owner = player2;
        } 
        else if (player3.properties.includes(properties[i].position)) {
            owner = player3;
        } 
        else if (player4.properties.includes(properties[i].position)) {
            owner = player4;
        }

        if (owner && owner !== player) {
            if (properties[i].type == "railroad") {
                railrent(player, owner); 
                return 0;
            }

            if (properties[i].type == "utility") {
                utility(player, owner);
                return 0;
            }

            if (properties[i].monopoly) {
                properties[i].rents = properties[i].rent * 2;
            }

            if (properties[i].house > 0) {
                properties[i].rents = rents[i][properties[i].house];
            }

            player.balance -= properties[i].rents;
            owner.balance += properties[i].rents;
            console.log("rent: " + properties[i].rents);
            updateBalances(player);
            updateBalances(owner);
        }
        break;
    }

    function railrent(player, owner) {
        let count = 0;

        for (let i = 0; i < owner.properties.length; i++) {
            if (owner.properties[i] == 6 || owner.properties[i] == 16 || owner.properties[i] == 26 || owner.properties[i] == 36) {
                count++;
            }
        }

        let rentAmount = 0;
        if (count == 1) 
        {
            rentAmount = 25;
        } 
        else if (count == 2) 
        {
            rentAmount = 50;
        } 
        else if (count == 3) 
        {
            rentAmount = 100;
        } 
        else if (count == 4) 
        {
            rentAmount = 200;
        }

        if (player.dub)
        {
            rentAmount = rentAmount * 2;
        }

        player.balance -= rentAmount;
        owner.balance += rentAmount;

        console.log("railroad rent: " + rentAmount);
        updateBalances(player);
        updateBalances(owner);

        player.dub = false;
    }
    function utility(player, owner){
        let count = 0;
        for (let i = 0; i < owner.properties.length; i++) {
            if (owner.properties[i] == 19 || owner.properties[i] == 29) {
                count++;
            }
        }
        let u1 = Math.floor(Math.random() * 6) + 1;
        let u2 = Math.floor(Math.random() * 6) + 1;
        let rentAmount = 0;
        if (count == 1)
        {
            rentAmount = (u1 + u2) * 4;
            console.log("utility rent: " + (u1 + u2) * 4)
        }
        else if (count == 2)
        {
            rentAmount = (u1 + u2) * 10;
            console.log("utility rent: " + (u1 + u2) * 10)
        }

        if (player.dub)
        {
            rentAmount = rentAmount * 2;
        }

        player.balance -= rentAmount;
        owner.balance -= rentAmount;
        updateBalances(player);

        player.dub = false;
    }
}

function buy()
{
    let current_player = player1;
    if(turn % 4 == 1)
        current_player = player1
    else if(turn % 4 == 2)
        current_player = player2
    else if(turn % 4 == 3)
        current_player = player3
    else if(turn % 4 == 0)
        current_player = player4

    for (let i = 0; i < 28; i++) {
        if (current_player.position != properties[i].position)
        {
            continue;
        }
        if (properties[i].owned)
        {
            continue;
        }
        if (current_player.balance < properties[i].price)
        {
            document.getElementById("message").innerHTML = "Insufficient funds";
            continue;
        }
        if (properties[i].position == 6 || properties[i].position == 16 || properties[i].position == 26 || properties[i].position == 36)
        {
            properties[i].type = "railroad";
        }
        if (properties[i].position == 29 || properties[i].position == 19)
        {
            properties[i].type = "utility";
        }

        let count;
        if (properties[i].color == "violet" || properties[i].color == "blue") {
            count = 2;
        } 
        else {
            count = 3;
        }

        for (let j = 0; j < current_player.properties.length; j++) {
            if (properties[i].color == properties[current_player.properties[j]].color) {
                count--;
            }
        }

        if (count === 0) {
            properties[i].monopoly = true;
        }

        current_player.balance -= properties[i].price;
        properties[i].owner = current_player;
        properties[i].owned = true;

        current_player.properties.push(properties[i].position);
        updateBalances(current_player);

        let spaceElement = document.getElementById("id" + properties[i].position);
        if (spaceElement)
        {
            if (spaceElement.classList.contains("left"))
            {
                spaceElement.style.borderLeft = `5px solid ${current_player.color}`;
            }
            else if (spaceElement.classList.contains("right"))
            {
                spaceElement.style.borderLeft = `5px solid ${current_player.color}`;
            }
            else if (spaceElement.classList.contains("top"))
            {
                spaceElement.style.borderTop = `5px solid ${current_player.color}`;
            }
            else if (spaceElement.classList.contains("bottom"))
            {
                spaceElement.style.borderBottom = `5px solid ${current_player.color}`;
            }
        }
        console.log(" bought " + properties[i].position);
        console.log(properties[i])

    }
}

function community_chest(player) {
    let num = Math.floor(Math.random() * 10);
    let players = [player1, player2, player3, player4]
    switch (num)
    {
        case 0:
            document.getElementById("message").innerHTML = "Advance to Go: Collect $200";
            player.position = 1;
            document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            player.balance += 200;
            break;
        case 1:
            document.getElementById("message").innerHTML = "Bank error: Collect $200";
            player.balance += 200;
            break;
        case 2:
            document.getElementById("message").innerHTML = "Insurance Denied Your Claim: Pay $50";
            player.balance -= 50;
            break;
        case 3:
            document.getElementById("message").innerHTML = "You sold Stock and Earned $50";
            player.balance += 50;
            break;
        case 4:
            document.getElementById("message").innerHTML = "Tax Fund: Gain $50";
            player.balance += 50;
            break;
        case 5:
            document.getElementById("message").innerHTML = "It's your Birthday, Collect $10 from Every Player";
            player.balance += 30;
            for (let i = 0; i < 4; i++) {
                if(players[i] != player)
                {
                    players[1].balance -= 10;
                }
            }
            break;
        case 6:
            document.getElementById("message").innerHTML = "Life Insurance Claim: Gain $100";
            player.balance += 100;
            break;
        case 7:
            document.getElementById("message").innerHTML = "Pay School Fees, Pay $50";
            player.balance -= 50;
            break;
        case 8:
            document.getElementById("message").innerHTML = "You Inherit $100";
            player.balance += 100;
            break;
        case 9:
            if (!player.getOutOfJail)
            {
                document.getElementById("message").innerHTML = "You are Arrested";
                player.jailed = true;
                player.jailTime = 0;
                player.position = 11;
                document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            }
            else
            {
                document.getElementById("message").innerHTML = "You went to jail, but used your get out of jail free card";
                player.getOutOfJail = false;
            }
            break;
    }
    updateBalances(player);
}

function chance(player) {
    let num = Math.floor(Math.random() * 10);
    let players = [player1, player2, player3, player4]
    switch (num) {
        case 0:
            document.getElementById("message").innerHTML = "Advance to Go: Collect $200";
            player.position = 1;
            player.balance += 200;
            document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            break;
        case 1:
            document.getElementById("message").innerHTML = "Advance to Illinois Avenue";
            player.position = 25;
            document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            break;
        case 2:
            document.getElementById("message").innerHTML = "Advance to St. Charles Place";
            player.position = 12;
            document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            break;
        case 3:
            document.getElementById("message").innerHTML = "Advance to the nearest Railroad and pay double if owned";
            if (player.position == 37)
            {
                player.position = 36;
                document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            }
            else if(player.position == 23)
            {
                player.position = 26;
                document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            }
            else if(player.position == 8)
            {
                player.position = 6;
                document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            }
            player.dub == true;
            break;
        case 4:
            document.getElementById("message").innerHTML = "Advance to nearest Utility and pay double if owned";
            if (player.position == 23 || player.position == 8)
            {
                player.position = 19;
                document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            }
            else if (player.position == 37)
            {
                player.position = 29;
                document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            }
            player.dub == true;
            break;
        case 5:
            document.getElementById("message").innerHTML = "Bank pays you a dividend of $50";
            player.balance += 50;
            break;
        case 6:
            document.getElementById("message").innerHTML = "Get Out of Jail Free Card";
            player.getOutOfJail = true;
            break;
        case 7:
            document.getElementById("message").innerHTML = "Go Back Three Spaces";
            player.position = (player.position - 3 )
            document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            player.position =player.position - 3;
            break;
        case 8:
            if (!player.getOutOfJail)
            {
                document.getElementById("message").innerHTML = "You are Arrested";
                player.jailed = true;
                player.jailTime = 0;
                player.position = 11;
                document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
            }
            else
            {
                document.getElementById("message").innerHTML = "You went to jail, but used your get out of jail free card";
                player.getOutOfJail = false;
            }
            break;
        case 9:
            document.getElementById("message").innerHTML = "You have been elected Chairman of the Board. Pay each player $50.";
            player.balance -= 150;
            for (let i = 0; i < 4; i++) {
                if(players[i] != player)
                {
                    players[1].balance += 50;
                }
            }
            break;
    }
    updateBalances(player);
}

function updateBalances(player) {
    document.getElementById("player1").innerHTML = "Player 1: $" + player1.balance + ' <img class="out" src="out.jpeg" alt="Out jail free" width="30px">';
    document.getElementById("player2").innerHTML = "Player 2: $" + player2.balance + ' <img class="out" src="out.jpeg" alt="Out jail free" width="30px">';
    document.getElementById("player3").innerHTML = "Player 3: $" + player3.balance + ' <img class="out" src="out.jpeg" alt="Out jail free" width="30px">';
    document.getElementById("player4").innerHTML = "Player 4: $" + player4.balance + ' <img class="out" src="out.jpeg" alt="Out jail free" width="30px">';

    const players = [player1, player2, player3, player4];
    players.forEach((p, index) => 
    { 
        const img = document.querySelector(`#player${index + 1} .out`);
        if (img) 
        {
            if (p.getOutOfJail) 
            {
                img.style.visibility = "visible";
            } 
            else 
            {
                img.style.visibility = "hidden";
            }
        }
    });

    if (player.balance < 1) {
        document.getElementById("message").innerHTML = "You have gone bankrupt, you're out!";
        player.out = true;
    }
}

function buyHouse() {
    let current_player = player1;
    if (turn % 4 == 1)
        current_player = player1;
    else if (turn % 4 == 2)
        current_player = player2;
    else if (turn % 4 == 3)
        current_player = player3;
    else if (turn % 4 == 0)
        current_player = player4;

    for (let i = 0; i < 28; i++) {
        if (current_player.position != properties[i].position) {
            continue;
        }
        if (!current_player.properties.includes(properties[i].position)) {
            continue;
        }
        if (properties[i].color == null) {
            continue;
        }
        if (properties[i].house == 6) {
            continue;
        }
        if (properties[i].monopoly == false) {
            continue;
        }
        if (current_player.balance < properties[i].housePrice) {
            continue;
        }
        if (house > 0 && properties[i].house < 5 ){
            properties[i].house++;
            current_player.balance -= properties[i].housePrice;
            house--;
        } 
        else if (hotel > 0 && properties[i].house == 5) {
            properties[i].house++;
            current_player.balance -= properties[i].housePrice;
            hotel--;
        } 
        else 
        {
            document.getElementById("message").innerHTML = "No more houses or hotels are available.";
        }
        updateBalances(current_player);
        console.log(`Bought house/hotel on property ${properties[i].position}`);
        return; 
    }
}

function sell() {
    let current_player = player1;
    if (turn % 4 == 1) {
        current_player = player1;
    } 
    else if (turn % 4 == 2) {
        current_player = player2;
    } 
    else if (turn % 4 == 3) {
        current_player = player3;
    } 
    else if (turn % 4 == 0) {
        current_player = player4;
    }

    let box = document.querySelector('#sell-background');
    box.style.display = "block";

    let list = document.getElementById('sell-datalist');
    list.innerHTML = current_player.properties
        .map(pos => `<option value="${pos}">Property ${pos}</option>`)
        .join('');

    let submit = document.getElementById('submit');
    let cancel = document.getElementById('cancel');

    cancel.onclick = () => {
        box.style.display = "none";
        return;
    }

    submit.onclick = () => {
        let selectedProperty = parseInt(document.getElementById('sell-datalist').value);
        let selectedOption = document.querySelector('input[name="to-sell"]:checked');

        if (!selectedProperty || !selectedOption) {
            alert("Please select a property and an option to sell.");
            return;
        }

        let property = properties.find(p => p.position === selectedProperty);
        if (!property) {
            alert("Invalid property selected.");
            return;
        }

        let sellType = selectedOption.value; // 1-5 for houses, 6 for property
        if (sellType == 6) {
            
            if (property.house > 0) {
                house += property.house; 
                current_player.balance += (property.housePrice / 2) * property.house;
                property.house = 0;
            }

            current_player.balance += property.mortgage;
            current_player.properties = current_player.properties.filter(pos => pos !== property.position);
            property.owned = false;

            let spaceElement = document.getElementById("id" + property.position);
            if (spaceElement) {
                if (spaceElement.classList.contains("left")) {
                    spaceElement.style.borderLeft = `1px solid black`;
                } 
                else if (spaceElement.classList.contains("right")) {
                    spaceElement.style.borderRight = `1px solid black`;
                } 
                else if (spaceElement.classList.contains("top")) {
                    spaceElement.style.borderTop = `1px solid black`;
                } 
                else if (spaceElement.classList.contains("bottom")) {
                    spaceElement.style.borderBottom = `1px solid black`;
                }
            }

            alert("Property sold successfully!");
        } 
        else {
            let housesToSell = parseInt(sellType);
            if (property.house < housesToSell) {
                housesToSell = property.house;
            }

            house += housesToSell;
            current_player.balance += (property.housePrice / 2) * housesToSell;
            property.house -= housesToSell;

            alert(`Sold ${housesToSell} house(s)/hotel(s) successfully!`);
        }

        updateBalances(current_player);
        box.style.display = "none";
    };
}

function trade() {
    let current_player = player1;
    let name = null;
    if (turn % 4 == 1) {
        current_player = player1;
        name = "player 1";
    } 
    else if (turn % 4 == 2) {
        current_player = player2;
        name = "player 2";
    } 
    else if (turn % 4 == 3) {
        current_player = player3;
        name = "player 3";
    } 
    else if (turn % 4 == 0) {
        current_player = player4;
        name = "player 4";
    }
    
    let person = prompt("Trade with player 1, 2, 3, or 4?");

    if (person < 1 || person > 4 || person == current_player.playerNum) {
        alert("Invalid player number");
        return;
    }

    let other_player = [player1, player2, player3, player4][person - 1];

    let box = document.querySelector('#trade-background');
    box.style.display = "block";

    document.getElementById("b2h").innerHTML = "player " + person;
    document.getElementById("b1h").innerHTML = name;

    let list1 = document.getElementById('box1-datalist');
    let list2 = document.getElementById('box2-datalist');

    list1.innerHTML = current_player.properties
        .map(pos => `<option value="${pos}">Property ${pos}</option>`)
        .join('');
    list2.innerHTML = other_player.properties
        .map(pos => `<option value="${pos}">Property ${pos}</option>`)
        .join('');

    let submit1 = document.getElementById('submit1');
    let submit2 = document.getElementById('submit2');

    let currentPlayerAgreed = false;
    let otherPlayerAgreed = false;

    submit1.onclick = () => {
        currentPlayerAgreed = true;
        checkTradeAgreement();
    };

    submit2.onclick = () => {
        otherPlayerAgreed = true;
        checkTradeAgreement();
    };

    function checkTradeAgreement() {
        if (currentPlayerAgreed && otherPlayerAgreed) {

            let selectedProperty1 = parseInt(document.getElementById('box1-datalist').value);
            let selectedProperty2 = parseInt(document.getElementById('box2-datalist').value);

            if (!selectedProperty1 || !selectedProperty2) {
                alert("Both players must select a property to trade.");
                return;
            }

            current_player.properties = current_player.properties.filter(pos => pos !== selectedProperty1);
            other_player.properties = other_player.properties.filter(pos => pos !== selectedProperty2);

            current_player.properties.push(selectedProperty2);
            other_player.properties.push(selectedProperty1);

            properties.find(p => p.position === selectedProperty1).whoOwned = other_player;
            properties.find(p => p.position === selectedProperty2).whoOwned = current_player;

            let spaceElement1 = document.getElementById("id" + selectedProperty1);
            if (spaceElement1) {
                if (spaceElement1.classList.contains("left")) {
                    spaceElement1.style.borderLeft = `5px solid ${other_player.color}`;
                } 
                else if (spaceElement1.classList.contains("right")) {
                    spaceElement1.style.borderLeft = `5px solid ${other_player.color}`;
                } 
                else if (spaceElement1.classList.contains("top")) {
                    spaceElement1.style.borderTop = `5px solid ${other_player.color}`;
                } 
                else if (spaceElement1.classList.contains("bottom")) {
                    spaceElement1.style.borderBottom = `5px solid ${other_player.color}`;
                }
            }

            let spaceElement2 = document.getElementById("id" + selectedProperty2);
            if (spaceElement2) {
                if (spaceElement2.classList.contains("left")) {
                    spaceElement2.style.borderLeft = `5px solid ${current_player.color}`;
                } 
                else if (spaceElement2.classList.contains("right")) {
                    spaceElement2.style.borderLeft = `5px solid ${current_player.color}`;
                } 
                else if (spaceElement2.classList.contains("top")) {
                    spaceElement2.style.borderTop = `5px solid ${current_player.color}`;
                } 
                else if (spaceElement2.classList.contains("bottom")) {
                    spaceElement2.style.borderBottom = `5px solid ${current_player.color}`;
                }
            }

            alert("Trade completed successfully!");
            box.style.display = "none";

            currentPlayerAgreed = false;
            otherPlayerAgreed = false;
        }
    }
}

function cardDisplay(prop) {
    document.getElementById("card-title").innerHTML = prop.propertyNames;
}
