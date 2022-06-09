
process.stdin.on('data', seconds => {
    var emittingFrequency = Number(seconds) * 1000;
    printToConsole();
    process.exit();
});

function printToConsole() {
    console.log(emittingFrequency);
}


// process.stdin.on('data', data => {
//     console.log(`You typed ${data.toString()}`);
//     process.exit();
// });