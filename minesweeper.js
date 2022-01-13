//
// This is only a SKELETON file for the 'Minesweeper' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const annotate = (input) => {
  // parse rows
  for (let row = 0; row<input.length; row++){
    // convert rows from strings to individual chars in array
    input[row] = input[row].split("")
  }
  // find bombs and increment around them
  for(let row = 0; row<input.length; row++){
    for(let col = 0; col<input[row].length; col++){
      if(input[row][col] === '*'){
        input = increment_coords_from_bomb(row, col, input)
      }
    }
  }
  // collapse all of the columns back into strings
  for (let row = 0; row<input.length; row++){
    input[row] = input[row].join('')
  }

  return input
}

function increment_coords_from_bomb(cur_row, cur_col, input){
  // unclear if using space to store these checks is worth any tiny computational time gain
  let neg_col = false
  let pos_col = false
  function increment(dif_row, dif_col) {
    if (input[dif_row][dif_col] === " "){
      input[dif_row][dif_col] = 1
    }
    // '*' is not >= than 1
    else if (input[dif_row][dif_col] >= 1){
      input[dif_row][dif_col] = input[dif_row][dif_col]+=1
    }
  }
  // incrementing same row as bomb
  if(cur_col-1>-1){
    neg_col = true
    increment(cur_row, cur_col-1)
  }
  if(cur_col+1<input[cur_row].length){
    pos_col = true
    increment(cur_row, cur_col+1)
  }
  // incrementing row "above" bomb if possible
  if(cur_row-1>-1){
    if(neg_col){
      increment(cur_row-1, cur_col-1)
    }
    if(pos_col){
      increment(cur_row-1, cur_col+1)
    }
    increment(cur_row-1, cur_col)
  }
  // incrementing row "below" bomb if possible
  if(cur_row+1<input.length){
    if(neg_col){
      increment(cur_row+1, cur_col-1)
    }
    if(pos_col){
      increment(cur_row+1, cur_col+1)
    }
    increment(cur_row+1, cur_col)
  }
  return input
}
