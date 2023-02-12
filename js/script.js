const { performance } = require("perf_hooks");
const arrFirst = new Array(1e6) 
.fill(123).map(() => Math.random()),
    arrSecond = [...arrFirst],
    arrThird = [...arrFirst],
    arrFour = [...arrFirst];

checkPerformance(
 () => arrFirst.reduce((prev, curr) => {
    return curr > prev ? curr : prev;
 }, arrFirst[0], 'check perform reduce')
);

checkPerformance(() => arrSecond.sort((a, b) => {
    return b -a;
})[0], 'check perform sort');

checkPerformance(() => {
    let max = arrThird[0];
    for (let i =0; i < arrThird.length; i ++) {
        if (arrThird[i] > max) max = arrThird[i];
    }
}, 'check perform loop for');

checkPerformance(() => Math.max(...arrFour), 'check perform Math max' );

function checkPerformance(
    func = () => {},
    operationName
    ) {
    try {
        let startTime = performance.now();
        func();
        let endTime = performance.now();
        let result = endTime - startTime;
        console.log(
            `${operationName} took ${result} 
            milliseconds.`
        );
    } catch (err) {
        console.error(
            `${operationName} is failed!`
            );
        console.error(err);
    }
}