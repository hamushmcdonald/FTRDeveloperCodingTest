import {LinkedList, Val} from './DataStructures';

let x: number;
let y: LinkedList;
let z: number;
let i: number = 0;

console.log("Please input the amount of time in seconds between emitting numbers and their frequency");
process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        if (i == 0) {
            x = Number(chunk) * 1000;
            console.log("x: ", x);
            console.log("Please enter the first number");
            
        } else if (i == 1) {
            y = new LinkedList(Number(chunk));
            console.log("y: ", y);
            console.log("Please enter the next number");
        } else {
            z = Number(chunk);
            console.log("z: ", z);
            console.log("Please enter the next number");
        }
        i++; 
    }
    
});