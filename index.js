const colors = require('colors');

function createGrid(size) {
  const grid = [];
  let rIdx = 0;

  while (rIdx < size) {
    const row = [];
    let cIdx = 0;
    while (cIdx < size) {
      row.push(Math.round(Math.random()- 0.2));
      cIdx++;
    }
    grid.push(row);
    rIdx++;
  }

  return grid;
}

function printGrid(grid, withColor) {
  let printable = grid.map(row => (
    row.join().toString() + '\n'
  ))
  .join('')
  .toString()
  .replace(/\[|\]/g, '');

  if (withColor) {
    printable = printable.replace(/([^0|,|\n|N])/g, '$1'.green);
  }
  console.log(printable);
}

class IslandCounter {
  constructor(gridSize, minIslandSize) {
    this.grid = createGrid(gridSize);
    this.minIslandSize = minIslandSize;
  }

  get islandCount() {
    return this.countIslands();
  }

  countIslands() {
    printGrid(this.grid);
    this.islandCoordinatesSets = [];
    let islandCount = 0;
    this.grid.forEach((row, rIdx) => {
      row.forEach((col, cIdx) => {
        this.workingIslandCoordinates = [];
        if (this.grid[rIdx][cIdx] === 1) {
          this.workingIslandCoordinates = [[rIdx,cIdx]];
          this.workingIslandSize = 1;
          this.markCellAndCheckNeighbors(rIdx, cIdx);
          if (this.workingIslandCoordinates.length >= this.minIslandSize) {
            this.islandCoordinatesSets.push(this.workingIslandCoordinates);
          } else {
            this.workingIslandCoordinates.forEach(coordinates => {
              this.grid[coordinates[0]][coordinates[1]] = 'N';
            });
          }
        }
      })
    });
    this.islandCoordinatesSets.forEach((set, setIdx) => {
      set.forEach(coordinates => {
        this.grid[coordinates[0]][coordinates[1]] = setIdx + 1;
      })
    });
    printGrid(this.grid, true);
    return this.islandCoordinatesSets.length;
  }

  markCellAndCheckNeighbors(rIdx, cIdx) {
    this.grid[rIdx][cIdx] = 'C'; // 'C' for being checked

    const neighboringIdxs = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0]
    ];

    neighboringIdxs.forEach(set => {
      const nextRIdx = rIdx + set[0];
      const nextCIdx = cIdx + set[1];
      if (this.grid[nextRIdx] && (this.grid[nextRIdx][nextCIdx]) === 1) {
        this.workingIslandCoordinates.push([nextRIdx,nextCIdx]);
        this.markCellAndCheckNeighbors(nextRIdx, nextCIdx);
      }
    });
  }
}


const args = process.argv.slice(2);
const islandCounter = new IslandCounter(args[0] || 6, args[1] || 1);
const count = islandCounter.islandCount;
const msg = count === 1 ? 'There is 1 island' : `There are ${count} islands`;
console.log(msg);
