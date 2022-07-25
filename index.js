let user = [0, 0];
let squares = [];
const size = 10;

let enemy = [4, 4];

document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector("#grid");

  function grid() {
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const square = document.createElement("div");
        square.innerHTML = 0;
        gridDisplay.appendChild(square);
        row.push(square);
      }
      squares.push(row);
    }
  }

  grid();

  let [i, j] = user;
  squares[i][j].classList.add("user-square");
  moveEnemy();
});

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;

  let [i, j] = user;

  console.log(i, j);

  if (e.keyCode == "38") {
    if (i > 0) {
      // move up 1
      document.querySelector(".user-square").classList.remove("user-square");
      user[0] -= 1;
      squares[user[0]][user[1]].classList.add("user-square");
      moveEnemy();
    }
  } else if (e.keyCode == "40") {
    if (i < size - 1) {
      //down 1
      document.querySelector(".user-square").classList.remove("user-square");
      user[0] += 1;
      squares[user[0]][user[1]].classList.add("user-square");
      moveEnemy();
    }
  } else if (e.keyCode == "37") {
    if (j > 0) {
      // left1
      document.querySelector(".user-square").classList.remove("user-square");
      user[1] -= 1;
      squares[user[0]][user[1]].classList.add("user-square");
      moveEnemy();
    }
  } else if (e.keyCode == "39") {
    if (j < size - 1) {
      //right 1
      document.querySelector(".user-square").classList.remove("user-square");
      user[1] += 1;
      squares[user[0]][user[1]].classList.add("user-square");
      moveEnemy();
    }
  }
}

async function moveEnemy() {
  // Calculate shortest path
  const path = bfs(enemy, user);

  console.log(enemy);

  // Set enemy position
  while (path.length > 0) {
    await sleep(1000);
    let pos = path.shift();
    enemy = pos;
    squares[enemy[0]][enemy[1]].classList.add("enemy-square");
  }
}

function getPath(pathDict, last, start) {
  let pos = last;
  const path = [pos];

  while (pos.join() != start.join()) {
    pos = pathDict[pos.join()];
    path.unshift(pos);
  }

  return path;
}

function bfs(start, end) {
  let [er, ec] = end;

  const visited = new Set();
  const queue = [start];
  const pathDict = {};

  while (queue) {
    for (let i = 0; i < queue.length; i++) {
      pos = queue.shift();
      [row, col] = pos;

      if (visited.has(pos.join()) || row < 0 || row > size - 1 || col < 0 || col > size - 1) {
        continue;
      }

      if (pos.join() === end.join()) {
        return getPath(pathDict, pos, start);
      }

      if (row != er) {
        queue.push([row + 1, col]);
        queue.push([row - 1, col]);
      }

      if (col != ec) {
        queue.push([row, col + 1]);
        queue.push([row, col - 1]);
      }

      queue.slice(-4).forEach((newPos) => {
        if (!(newPos.join() in pathDict)) {
          pathDict[newPos.join()] = pos;
        }
      });

      visited.add(pos.join());
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
