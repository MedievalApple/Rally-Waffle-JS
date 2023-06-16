
// Define a function to find the shortest path using Dijkstra's algorithm
function findShortestPath(start, end, TheMap) {
  // Create a 2D array to store the distances from the start cell
  const distances = Array(TheMap.length)
    .fill()
    .map(() => Array(TheMap[0].length).fill(Infinity));

  // Create a priority queue to store the cells to be explored
  const queue = new PriorityQueue();

  // Set the distance of the start cell to 0 and add it to the queue
  distances[start[0]][start[1]] = 0;
  queue.enqueue(start, 0);

  // Define the possible movements (up, down, left, right)
  const movements = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  // Process cells in the queue until it's empty or the destination is reached
  while (!queue.isEmpty()) {
    const { element: current, priority } = queue.dequeue();

    if (current[0] === end[0] && current[1] === end[1]) {
      // Destination reached, construct and return the path
      return constructPath(distances, start, end, TheMap);
    }

    // Check each neighbor cell
    for (const movement of movements) {
      const newRow = current[0] + movement[0];
      const newCol = current[1] + movement[1];

      // Check if the neighbor cell is within the maze boundaries
      if (newRow >= 0 && newRow < TheMap.length && newCol >= 0 && newCol < TheMap[0].length) {
        // Check if the neighbor cell is a valid path and has a shorter distance
        if (
          TheMap[newCol][newRow] === "R" &&
          distances[newRow][newCol] > priority + 1
        ) {
          // Update the distance and enqueue the neighbor cell
          distances[newRow][newCol] = priority + 1;
          queue.enqueue([newRow, newCol], priority + 1);
        }
      }
    }
  }

  // No path found
  return [];
}

// Define a function to construct the path from start to end
function constructPath(distances, start, end, TheMap) {
  const path = [];
  let current = end;

  while (current[0] !== start[0] || current[1] !== start[1]) {
    path.unshift(current);
    const row = current[0];
    const col = current[1];
    const movement = [
      [-1, 0], // Up
      [1, 0], // Down
      [0, -1], // Left
      [0, 1], // Right
    ];

    for (const move of movement) {
      const newRow = row + move[0];
      const newCol = col + move[1];

      if (
        newRow >= 0 &&
        newRow < TheMap.length &&
        newCol >= 0 &&
        newCol < TheMap[0].length &&
        distances[newRow][newCol] === distances[row][col] - 1
      ) {
        current = [newRow, newCol];
        break;
      }
    }
  }

  // Add the start cell to the path
  path.unshift(start);
  return path;
}

// Priority queue implementation
class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}
var correctPath = [];
// Example usage
function solveMaze(TheMap, ai) {
  var aiPos = ai.pos.copy().mult(1 / gridSize);
  var playerPos = player.pos.copy().mult(1 / gridSize);
  let startCell = [floor(aiPos.x), floor(aiPos.y)];
  let endCell = [floor(playerPos.x), floor(playerPos.y)];
  correctPath = findShortestPath(startCell, endCell, TheMap);
  console.log(correctPath);
}

