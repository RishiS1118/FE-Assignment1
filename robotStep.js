const Direction = {NORTH:1, EAST: 2, SOUTH: 3, WEST: 4, 1: "NORTH", 2: "EAST", 3: "SOUTH", 4: "WEST"};
Object.freeze(Direction);

class RoboBoard {
    constructor(boardSize = 8) {
        this.boardSize = boardSize;
    }

    validCell = function(x, y) {
        return x >= 0 && y >= 0 && x < this.boardSize && y < this.boardSize;
    }
    
    prepareBoard(initialPosX = 0, initialPosY = 0, initialDirection = Direction.EAST, boardSize = 8) {
        this.posX = initialPosX;
        this.posY = initialPosY;
        this.direction = initialDirection;
        this.boardSize = boardSize;
    }

    executeCommand(command) {
        switch(command.toUpperCase()) {
            case 'L':
                switch(this.direction) {
                    case Direction.NORTH:
                        if (this.validCell(this.posX, this.posY - 1)) {
                            this.posY--;
                            this.direction = Direction.WEST;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.EAST:
                        if (this.validCell(this.posX - 1, this.posY)) {
                            this.posX--;
                            this.direction = Direction.NORTH;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.SOUTH:
                        if (this.validCell(this.posX, this.posY + 1)) {
                            this.posY++;
                            this.direction = Direction.EAST;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.WEST:
                        if (this.validCell(this.posX + 1, this.posY)) {
                            this.posX++;
                            this.direction = Direction.SOUTH;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                }
                break;
            case 'R':
                switch(this.direction) {
                    case Direction.NORTH:
                        if (this.validCell(this.posX, this.posY + 1)) {
                            this.posY++;
                            this.direction = Direction.EAST;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.EAST:
                        if (this.validCell(this.posX + 1, this.posY)) {
                            this.posX++;
                            this.direction = Direction.SOUTH;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.SOUTH:
                        if (this.validCell(this.posX, this.posY - 1)) {
                            this.posY--;
                            this.direction = Direction.WEST;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.WEST:
                        if (this.validCell(this.posX - 1, this.posY)) {
                            this.posX--;
                            this.direction = Direction.NORTH;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                }
                break;
            case 'F':
                switch(this.direction) {
                    case Direction.NORTH:
                        if (this.validCell(this.posX - 1, this.posY)) {
                            this.posX--;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.EAST:
                        if (this.validCell(this.posX, this.posY + 1)) {
                            this.posY++;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.SOUTH:
                        if (this.validCell(this.posX + 1, this.posY)) {
                            this.posX++;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.WEST:
                        if (this.validCell(this.posX, this.posY - 1)) {
                            this.posY--;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                }
                break;
            case 'B':
                switch(this.direction) {
                    case Direction.NORTH:
                        if (this.validCell(this.posX + 1, this.posY)) {
                            this.posX++;
                            this.direction = Direction.SOUTH;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.EAST:
                        if (this.validCell(this.posX, this.posY - 1)) {
                            this.posY--;
                            this.direction = Direction.WEST;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.SOUTH:
                        if (this.validCell(this.posX - 1, this.posY)) {
                            this.posX--;
                            this.direction = Direction.NORTH;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                    case Direction.WEST:
                        if (this.validCell(this.posX, this.posY + 1)) {
                            this.posY++;
                            this.direction = Direction.EAST;
                        } else {
                            throw "Doraemon fell from board ";
                        }
                        break;
                }
                break;
            default:
                throw "Unknown Command: "+ command ;
        }
    }

    info() {
        return "Robot is at ("+ (this.posX +1) + ", "+ (this.posY + 1) +") facing "+ Direction[this.direction]+".";
    }

    getDirection() {
        return this.direction;
    }

    getPosition() {
        return {x: this.posX, y: this.posY};
    }
}

var robot;

function init() {
    robot = new RoboBoard();
    robot.prepareBoard(Math.floor(Math.random() * 8), Math.floor(Math.random() * 8), Math.floor(Math.random() * 4) + 1);
    robotCellId = "cell"+robot.getPosition().x+""+robot.getPosition().y;
    positionRobot();
    console.log("Initial Position: "+robot.info());
}

function startGame(command) {
    let commands = command.split(',');
    let i = 0;
    let robotExecutor = window.setInterval( () => {
        if (i < commands.length) {
            try {
                previousCellId =  "cell"+robot.getPosition().x+""+robot.getPosition().y;
                robot.executeCommand(commands[i].trim());
                i++;  
                positionRobot(previousCellId);
                console.log("Moved: "+robot.info());
            } catch (err) {
                alert(err);
                clearInterval(robotExecutor);    
            }
        } else {
            clearInterval(robotExecutor);
        }
    }, 1000);
}

function positionRobot(previousCellId = undefined) {
    if (previousCellId) {
        var previousRobotCell = document.getElementById(previousCellId);
        previousRobotCell.classList.remove("selected");
        previousRobotCell.classList.add("traversed");

    }
    cellId = "cell"+robot.getPosition().x+""+robot.getPosition().y;
    var direction = robot.getDirection();
    var robotCell = document.getElementById(cellId);
    robotCell.appendChild(createRobotDiv(direction));
    robotCell.classList.add("selected");
}

function createRobotDiv(direction) {
    let robotDiv = document.createElement("div");
    let arrorDiv = document.createElement("div");
    robotDiv.classList.add("robot");
    arrorDiv.classList.add("arrow");

    switch(direction) {
        case Direction.NORTH:
            arrorDiv.classList.add("up");
            break;
        case Direction.EAST:
            arrorDiv.classList.add("right");
            break;
        case Direction.SOUTH:
            arrorDiv.classList.add("down");
            break;
        case Direction.WEST:
            arrorDiv.classList.add("left");
            break;
    }
    robotDiv.appendChild(arrorDiv);   
    return robotDiv;
}

function runRobot() {
    var command = document.getElementById("commandInput").value;
    startGame(command);
}