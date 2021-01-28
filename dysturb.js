const cc = require('./node_modules/lodash/cloneDeep.js');

const matrix = [
    ["f", "c", "e", "i", "x"],
    ["i", "e", "n", "a", "r"],
    ["h", "u", "s", "s", "e"],
    ["c", "e", "n", "d", "s"],
    ["e", "t", "h", "b", "f"]
];

const zahlen = [
    "null",
    "eins",
    "zwei",
    "drei",
    "vier", 
    "fünf",
    "fuenf",
    "sechs",
    "sieben",
    "acht",
    "neun",
];

var status = {
    visited : [],
    currentStr: '',
    numbers : [],
}; 

function crawl (prevStat, pos){
    //create new Status
    y = pos[0];
    x = pos[1];
    let newStat = cc(prevStat);
    newStat.visited.push(pos);
    
    //Ignore start position
    if (matrix[y][x] != "x") newStat.currentStr += matrix[y][x];

    // check if current position is valid
    if (zahlen.includes(newStat.currentStr)){
        //Completed a number
        newStat.numbers.push(newStat.currentStr);
        newStat.currentStr = "";
    }else if (zahlen.some(element => {return element.startsWith(newStat.currentStr)})){
        //plausible string, continue
    }else{
        return false
    };

    // calculate potential next steps
    let positions = [
        [y+2, x+1],
        [y+2, x-1],
        [y-2, x+1],
        [y-2, x-1],
        [y+1, x+2],
        [y-1, x+2],
        [y+1, x-2],
        [y-1, x-2],
    ].filter(potPos => {                                                        //all coordinates...
        return newStat.visited.map(visited =>{                                  //... that, when compared against every visited, ...
            return (potPos[0]==visited[0] && potPos[1] == visited[1])   
        }).every(comparison => {return comparison == false})                    //... return no matches = are not in visited!
    }).filter(potPos => {                                                       // filter in those coordinates...
        return potPos.every(coord =>{                                           // ... whith coordinates...
            return (coord >= 0 && coord <=4)                                    // ... within the range
        })
    });

    // if no more valid positions and there is no current string -> finished
    if (positions.length == 0 && newStat.currentStr == ""){
        return newStat};

    // othewise we need to crawl further...
    let subresults = positions.map(pos =>{
        return crawl(newStat, pos)
    }).flat(Infinity).
    filter(path => {return path != false});

    return subresults;

}

let results = crawl(status, [0,4]);
for (let result of results){
    console.log(result.numbers.join());
}