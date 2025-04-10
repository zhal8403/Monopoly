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
      this.sigma = "very";
  }
}

class Property
{
  constructor(position, price, rents, housePrice, mortgage, color)
  {
      this.owned = null;
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
  properties.push(new Property(position[i], price[i], rents[i][0], housePrices[i], mortgage[i], color[i]));
}

function move()
{
    if (double == 0)
    {
        turn++;
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
                alert("You paid $50 to get out of jail");
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
                alert("Three double rolls is illegal")
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

  if(player.position == 3 || player.position == 13 || player.position == 33)
  {
      community_chest(player)
  }

  if(player.position == 8 || player.position == 23 || player.position == 37)
  {
      chance(player)
  }
 
  if (!player.properties.includes(properties[player.position]))
  {
      rent(player);
  }

  if(player.position == 31)
  {
      if (!player.getOutOfJail)
          {
          alert("You were Arrested");
          player.jailed = true;
          player.jailTime = 0;
          player.position = 11;
          document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
      }
      else
      {
          alert("You went to jail, but used your get out of jail free card");
          player.getOutOfJail = false;
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

            if (properties[i].monopoly == true) {
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

        player.balance -= rentAmount;
        owner.balance += rentAmount;

        console.log("railroad rent: " + rentAmount);
        updateBalances(player);
        updateBalances(owner);
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
        if (count == 1)
        {
            player.balance -= (u1 + u2) * 4;
            console.log("utility rent: " + (u1 + u2) * 4)
        }
        else if (count == 2)
        {
            player.balance -= (u1 + u2) * 10;
            console.log("utility rent: " + (u1 + u2) * 10)
        }
        updateBalances(player);
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
            alert("Insufficient funds");
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
        if (properties[i].color == "violet" || properties[i].color == "blue")
        {
            count = 2;
        }
        else
        {
            count = 3;
        }

        for (let j = 0; j < current_player.properties.length; j++)
        {
            if (properties[i].color == properties[current_player.properties[j]].color)
            {
                count--;
            }
        }
        if (count = 0)
        {
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
          alert("Advance to Go: Collect $200");
          player.position = 1;
          document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
          player.balance += 200;
          break;
      case 1:
          alert("Bank error: Collect $200");
          player.balance += 200;
          break;
      case 2:
          alert("Insurance Denied Your Claim: Pay $50");
          player.balance -= 50;
          break;
      case 3:
          alert("You sold Stock and Earned $50");
          player.balance += 50;
          break;
      case 4:
          alert("Tax Fund: Gain $50");
          player.balance += 50;
          break;
      case 5:
          alert("It's your Birthday, Collect $10 from Every Player");
          player.balance += 30;
          for (let i = 0; i < 4; i++) {
              if(players[i] != player)
              {
                  players[1].balance -= 10;
              }
          }
          break;
      case 6:
          alert("Life Insurance Claim: Gain $100");
          player.balance += 100;
          break;
      case 7:
          alert("Pay School Fees, Pay $50");
          player.balance -= 50;
          break;
      case 8:
          alert("You Inherit $100");
          player.balance += 100;
          break;
      case 9:
          if (!player.getOutOfJail)
          {
              alert("You are Arrested");
              player.jailed = true;
              player.jailTime = 0;
              player.position = 11;
              document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
          }
          else
          {
              alert("You went to jail, but used your get out of jail free card");
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
          alert("Advance to Go: Collect $200");
          player.position = 1;
          player.balance += 200;
          document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
          break;
      case 1:
          alert("Advance to Illinois Avenue");
          player.position = 25;
          document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
          break;
      case 2:
          alert("Advance to St. Charles Place");
          player.position = 12;
          document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
          break;
      case 3:
          alert("Advance to the nearest Railroad and pay double if owned");
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
          break;
      case 4:
          alert("Advance to nearest Utility and pay double if owned");
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
          break;
      case 5:
          alert("Bank pays you a dividend of $50");
          player.balance += 50;
          break;
      case 6:
          alert("Get Out of Jail Free Card");
          player.getOutOfJail = true;
          break;
      case 7:
          alert("Go Back Three Spaces");
          player.position = (player.position - 3 )
          document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
          player.position =player.position - 3;
          break;
      case 8:
          if (!player.getOutOfJail)
          {
              alert("You are Arrested");
              player.jailed = true;
              player.jailTime = 0;
              player.position = 11;
              document.getElementById("id" + player.position).appendChild(document.getElementById(player.color));
          }
          else
          {
              alert("You went to jail, but used your get out of jail free card");
              player.getOutOfJail = false;
          }
          break;
      case 9:
          alert("You have been elected Chairman of the Board. Pay each player $50.");
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

function updateBalances(player)
{
    document.getElementById("player1").innerHTML = "Player 1: $" + player1.balance;
    document.getElementById("player2").innerHTML = "Player 2: $" + player2.balance;
    document.getElementById("player3").innerHTML = "Player 3: $" + player3.balance;
    document.getElementById("player4").innerHTML = "Player 4: $" + player4.balance;

    if (player.balance < 1)
    {
        alert ("You have gone bankrupt your out");
    }
}

function buyHouse() {
    let current_player = player1;
    if(turn % 4 == 1)
        current_player = player1
    else if(turn % 4 == 2)
        current_player = player2
    else if(turn % 4 == 3)
        current_player = player3
    else if(turn % 4 == 0)
        current_player = player4

    for (let i = 0; i < 28; i++)
    {
        if (current_player.position != properties[i].position)
        {
            continue;
        }
        if (!current_player.properties.includes(properties[i].position))
        {
            continue;
        }
        if (properties[i].color == null)
        {
            continue;
        }
        if (properties[i].house == 6)
        {
            continue;
        }
        if (properties[i].monopoly == false)
        {
            continue;
        }
        if (current_player.balance < properties[i].housePrice)
        {
            continue;
        }
        if (house > 0 && properties[i].house < 5)
        {
            properties[i].house++;
            current_player.balance -= properties[i].housePrice;
            house--;
        }
        if (hotel > 0 && properties[i].house == 5)
        {
            properties[i].house = 0;
            properties[i].house++;
            current_player.balance -= properties[i].housePrice;
            hotel--;
        }
        updateBalances(current_player);
        console.log(" bought " + properties[i].house);

    }
}
