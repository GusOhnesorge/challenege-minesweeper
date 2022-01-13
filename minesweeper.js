//
// This is only a SKELETON file for the 'Minesweeper' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const annotate = (input) => {
  let coords = {}
  // parse rows
  for (let row = 0; row<input.length(); row++){
    // convert rows from strings to individual chars in array
    let split_row = input[row].split()
    for (let col = 0; col<split_row.length(); col++){
      if(split_row[col] === '*'){
        coords = increment_coords_from_bomb(row, col, row.length(), col.length(), coords)
      }
    }
  }
  
};

function increment_coords_from_bomb(b_row, b_col, max_row, max_col, coords){
  // unclear if using space to store these checks is worth any tiny computational time gain
  let neg_col = false
  let pos_col = false
  let point = b_row + "," + b_col
  coords[point] = -1
  function increment(cur_point) {
    if (coords[cur_point] === undefined){
      coords[cur_point] = 1
    }
    else if (coords[cur_point] >= 1){
      coords[cur_point] = coords[cur_point]+=1
    }
  }
  // incrementing same row as bomb
  if(b_col-1>-1){
    neg_col = true
    point = b_row + "," + (b_col-1)
    increment(point)
  }
  if(b_col+1<max_col){
    pos_col = true
    point = b_row + "," + (b_col+1)
    increment(point)
  }
  // incrementing row "above" bomb if possible
  if(b_row-1>-1){
    if(neg_col){
      point = (b_row-1) + "," + (b_col-1)
      increment(point)
    }
    if(pos_col){
      point = (b_row-1) + "," + (b_col+1)
      increment(point)
    }
    point = (b_row-1) + "," + (b_col)
    increment(point)
  }
  // incrementing row "below" bomb if possible
  if(b_row+1<max_row){
    if(neg_col){
      point = (b_row+1) + "," + (b_col-1)
      increment(point)
    }
    if(pos_col){
      point = (b_row+1) + "," + (b_col+1)
      increment(point)
    }
    point = (b_row+1) + "," + (b_col)
    increment(point)
  }
}
