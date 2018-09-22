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

function printGrid(grid) {
  const printable = grid.map(row => (
    row.join().toString() + '\n'
  )).join('').toString().replace(/\[|\]/g, '');
  console.log(printable);
}

class IslandCounter {
  constructor(gridSize, minIslandSize) {
    this.grid = createGrid(gridSize);
    this.minIslandSize = minIslandSize;
    printGrid(this.grid);
  }

  get islandCount() {
    return this.countIslands();
  }

  countIslands() {
    let islandCount = 0;
    this.grid.forEach((row, rIdx) => {
      row.forEach((col, cIdx) => {
        if (this.grid[rIdx][cIdx] === 1) {
          this.workingIslandSize = 1;
          this.markCellAndCheckNeighbors(rIdx, cIdx);
          if (this.workingIslandSize >= this.minIslandSize) {
            islandCount++;
          }
        }
      })
    });
    return islandCount;
  }

  markCellAndCheckNeighbors(rIdx, cIdx) {
    this.grid[rIdx][cIdx] = 'C';

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
        this.workingIslandSize++;
         this.markCellAndCheckNeighbors(nextRIdx, nextCIdx);
      }
    });
  }
}


const args = process.argv.slice(2);
const islandCounter = new IslandCounter(args[0] || 6, args[1] || 1);
console.log(islandCounter.islandCount);
