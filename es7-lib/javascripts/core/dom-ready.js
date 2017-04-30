import { runInCatch } from './capture.js';

let readyList = [];

let ready = () => {
    document.removeEventListener("DOMContentLoaded", ready, false);
    window.removeEventListener("load", ready, false);
    popDOMReadyArr();
}

let popDOMReadyArr = () => {
    readyList.forEach(function (cb) {
        runInCatch(function () {
            if (typeof (cb) === 'undefined')
                throw new Error(cb + ' is undefined');
            if (typeof (cb) !== 'function')
                throw new Error(cb + ' is not a function');
            cb()
        })
    });
    readyList = [];
}

let DOMReady = cb => {
    document.readyState === 'complete' ?
        runInCatch(cb) :
        readyList.push(cb);
}

if (document.readyState === "complete") {
    setTimeout(popDOMReadyArr);
} else {
    // Use the handy event callback
    document.addEventListener("DOMContentLoaded", ready, false);
    // A fallback to window.onload, that will always work
    window.addEventListener("load", ready, false);
}


export default DOMReady
