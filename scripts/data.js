let dataArray = {values: [
]
}


const diagCont = document.getElementById("diagCont");
const timeSlider = document.getElementById("timer");
const modeSelect = document.getElementById("algos");
let ms;

timeSlider.oninput = function() {
    ms = timeSlider.value;
}

const contWidth = diagCont.clientWidth;

let arrSize = 50;
let state = false;

function generateRandomArray() {
    if (dataArray.values.length == 0) {
        for(let i = 0; i <= arrSize - 1; i++) {
            const newInt = Math.floor(Math.random() * 100);
            dataArray.values.push(newInt);
        }
    } else {
        for(let i = 0; i <= arrSize - 1; i++) {
            const newInt = Math.floor(Math.random() * 100);
            dataArray.values[i] = newInt;
        }
    }

    if (diagCont.childNodes.length < 2) {
        createBars(dataArray.values)
    } else {
        redrawChart(dataArray.values);
    }  
}

function createBars(data, j) {
    let barWidth = (contWidth - (arrSize * 5)) / arrSize;

    for(let i = 0; i < arrSize; i++) {
        let barHeight = data[i] * 7;
        const newBar = document.createElement("div");
        newBar.setAttribute("class", "bar");
        newBar.style.height = barHeight + "px";
        newBar.style.width = barWidth + "px";
        diagCont.appendChild(newBar);
    }
} 

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    redrawChart(array)
}

function redrawChart(data, j) {
    let barWidth = (contWidth - (arrSize * 5)) / arrSize;
    for (let i = 0; i < arrSize; i++) {
        let barHeight = data[i] * 7;
        const bar = diagCont.childNodes[i+1];
        bar.style.width = barWidth + "px";
        bar.style.height = barHeight + "px";
        if (i == j || i == j +1) {
            bar.style.backgroundColor = "blue";
        } else {
            bar.style.backgroundColor = "#008080";
        }
    }
}

function start() {
    const algo = algos.value;
    if (algo == "bubble") {
        bubbleSort(dataArray.values, dataArray.values.length);
    } else if (algo == "merge") {
        console.log(dataArray.values)
        console.log(mergeSort(dataArray.values))
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(data) {
    let len = data.length;

    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len - i - 1; j++) {
            if (data[j] > data[j + 1]) {
                let temp = data[j];
                data[j] = data[j+1];
                data[j + 1] = temp;
                await sleep(ms);
            }
              redrawChart(data, j);
        }
        await sleep(ms);
    }
}

const merge = (arr1, arr2) => {
    let sorted = [];
  
    while (arr1.length && arr2.length) {
      if (arr1[0] < arr2[0]) sorted.push(arr1.shift());
      else sorted.push(arr2.shift());
    };
    redrawChart(sorted)
    return sorted.concat(arr1.slice().concat(arr2.slice()));
};
  

const mergeSort = arr => {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2),
        left = mergeSort(arr.slice(0, mid)),
        right = mergeSort(arr.slice(mid));
  
    return merge(left, right); 
  };