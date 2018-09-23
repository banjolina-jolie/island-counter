# island-counter
Counts the groupings of 1s in a randomly generated 2D matrix of bits

install npm packages with `npm install`

Run in the terminal with `node index.js [matrix_size] [min_island_size]`
`matrix_size` is optional and will default to 6
`min_island_size` is optional and will default to 1

Example:

`node index.js 7 3`

will output something like:
```
1,0,1,1,1,0,0
1,0,0,1,0,0,0
1,0,0,0,1,1,0
0,0,0,0,0,0,0
0,1,1,0,0,0,0
1,0,0,1,1,0,1
0,0,0,0,0,1,0

1,0,2,2,2,0,0
1,0,0,2,0,0,0
1,0,0,0,N,N,0
0,0,0,0,0,0,0
0,N,N,0,0,0,0
N,0,0,N,N,0,N
0,0,0,0,0,N,0
```

Where numbers represent the island in which the cell is included and Ns represent islands that are too small
