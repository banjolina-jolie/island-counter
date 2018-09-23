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
    // print original unaffected grid
    printGrid(this.grid);

    // store coordinate sets of cells in aptly sized islands to change their value later
    const islandCoordinatesSets = [];

    this.grid.forEach((row, rIdx) => {
      row.forEach((col, cIdx) => {
        // reset working island coordinates (an array of [rowIdx, colIdx])
        this.workingIslandCoordinates = [];

        if (this.grid[rIdx][cIdx] === 1) {
          this.workingIslandCoordinates = [[rIdx,cIdx]];
          this.workingIslandSize = 1;
          this.markCellAndCheckNeighbors(rIdx, cIdx);

          if (this.workingIslandCoordinates.length >= this.minIslandSize) {
            // enough cells are present in workingIslandCoordinates array to be saved
            islandCoordinatesSets.push(this.workingIslandCoordinates);
          } else {
            this.workingIslandCoordinates.forEach(coordinates => {
              // Change cell to N for "not an island" because it's too small
              this.grid[coordinates[0]][coordinates[1]] = 'N';
            });
          }
        }
      })
    });

    islandCoordinatesSets.forEach((set, setIdx) => {
      set.forEach(coordinates => {
        // change cell to be island number
        this.grid[coordinates[0]][coordinates[1]] = setIdx + 1;
      })
    });

    // print grid with island numbering and colors
    printGrid(this.grid, true);
    return islandCoordinatesSets.length;
  }

  markCellAndCheckNeighbors(rIdx, cIdx) {
    this.grid[rIdx][cIdx] = 'C'; // 'C' for being currently checked

    const neighboringIdxs = [ [0, -1], [0, 1], [-1, 0], [1, 0]];

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
