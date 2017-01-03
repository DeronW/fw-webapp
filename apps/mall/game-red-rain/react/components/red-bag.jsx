//单个红包
const Redbag = function () {
    this.finished = false;
    this.checked = false;
    this.stage = 'up'; // up, down, hold, complete
    this.holdonTimes = 4000;
    this.holdonAt = null;
    this.maxScale = 1.3;
    this.element = null;
    this.timer = 'animate timer';
    this.scale = 0;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isBoom = false;

    this.initialize();
}
Redbag.prototype = {
    initialize: function () {
        this.createNode();
        this.animate();
    },
    destory: function () {
        clearInterval(this.timer);
        setTimeout(() => {
            this.element.parentNode.removeChild(this.element);
        }, this.checked ? 500 : 0)
    },
    createNode: function () {
        var box = document.getElementById("red-cnt");
        var node = document.createElement("div");
        node.className = "bag-li";
        node.style.left = this.width * 0.2 + Math.random() * this.width * 0.6 + 'px';
        node.style.top = this.height * 0.2 + Math.random() * this.height * 0.6 + 'px';
        let img_list = ["redBag0.png", "redBag1.png", "redBag2.png", "redBag3.png", "redBag4.png", "redBag5.png"]
        let img = img_list[parseInt(img_list.length * Math.random())];
        node.innerHTML = `
            <div class="bag-text">+1</div>
            <div class="bag-img"><img src="images/${img}"/></div>`;
        node.onclick = this.clickHandler.bind(this);

        box.appendChild(node);
        this.element = node;
    },
    animate: function () {
        let node = this.element;
        var step = 0.15;

        this.timer = setInterval(() => {
            if (this.stage == 'up') {
                this.scale += step;
            } else if (this.stage == 'down') {
                this.scale -= step;
            } else if (this.stage == 'hold') {

            } else if (this.stage == 'complete') {
                this.scale -= step * 2;
            }
            requestAnimationFrame(() => this.element.style.transform = `scale(${this.scale})`);

            if (this.stage == 'up' && this.scale >= this.maxScale) {
                this.stage = 'down'
            } else if (this.stage == 'down' && this.scale <= 1) {
                this.stage = 'hold';
                this.holdonAt = new Date().getTime();
            } else if (this.stage == 'hold' && (new Date().getTime() - this.holdonAt) > this.holdonTimes) {
                this.stage = 'complete';
            } else if (this.stage == 'complete' && this.scale <= 0) {
                clearInterval(this.timer);
                this.destory();
            }

            // console.log('scale', this.stage, this.scale, this.stage == 'down' && this.scale <= 1)
        }, 20);
    },

    clickHandler: function () {
        console.log('click')
        if (!this.checked) {
            this.checked = true;
            this.className = "bag-li bag-li-on";
            this.destory();
            console.log('click', getCheckedCount())
            if(this.isBoom) {
                endGame()
            }
        }
    }
}

window.RedbagList = [];
window.RedbagTimer = null;

function startGame(game_time) {
    setTimeout(endGame, game_time);

    window.RedbagTimer = setInterval(function () {
        window.RedbagList.push(new Redbag());
    }, 1000)
}

function endGame() {
    clearInterval(window.RedbagTimer)
}

function getCheckedCount() {
    let s = 0;
    RedbagList.map(i => s += i.checked ? 1 : 0)
    return s;
}
