var url = 'https://static.9888.cn/pdf/wap/pdf-html/2.%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%B9%BF%E5%91%8A%E6%B3%95.pdf?b';
// Disable workers to avoid yet another cross-origin issue (workers need
// the URL of the script to be loaded, and dynamically loading a cross-origin
// script does not work).
// PDFJS.disableWorker = true;
// The workerSrc property shall be specified.
// var url = 'images/one.pdf';
PDFJS.workerSrc = 'javascripts/pdf.worker.js';

// Asynchronous download of PDF
// var loadingTask = PDFJS.getDocument(url);
// loadingTask.promise.then(function (pdf) {
//     console.log('PDF loaded');


var currPage = 1; //Pages are 1-based not 0-based
var numPages = 0;
var thePDF = null;

//This is where you start
PDFJS.getDocument(url).then(function (pdf) {

    //Set PDFJS global object (so we can easily access in our page functions
    thePDF = pdf;

    //How many pages it has
    numPages = pdf.numPages;

    //Start with first page
    pdf.getPage(1).then(handlePages);
});


function handlePages(page) {
    //This gives us the page's dimensions at full scale
    var viewport = page.getViewport(1);

    //We'll create a canvas for each page to draw it on
    var canvas = document.createElement("canvas");
    canvas.style.display = "block";
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    //Draw it on the canvas
    page.render({canvasContext: context, viewport: viewport});

    //Add it to the web page
    document.body.appendChild(canvas);

    //Move to next page
    currPage++;
    if (thePDF !== null && currPage <= numPages) {
        thePDF.getPage(currPage).then(handlePages);
    }
}




