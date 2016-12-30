$FW.DOMReady(function(){

    fnCreateNode();
    fnAppendToBody();
    fnStartAnimation()
    fnRemoveFromBody();
    fnClickHandler();

///////////////////////////////////////////////////

    thread = (
        n = fnCreateNode()
    n.appendToBody();
    n.startAnimation();
    if(n.clickHandler){
        n.fireEvent();
        n.removeFromBody()
    }
    timeout(
        n.removeFromBody()
    )
    )

    setInterval(thread,  200);
    max thread = 50;

//////////////////////////////////////////////////////

    thread_count = 0;
    if(thread_count > 20) {
        // no more
    }
    COUNT =  0
    ANIMATION_DELAY = 50


    Redbag = function(){
        this.id = thread_count++;
        this.animationTime = 1000 * Math.random();
        this.scale = 0;
        this.positionX = Math.random() *window.innerWith;
        this.positionY = Math.random() *window.innerHeight;

        this.clickHandler = function(){
            COUNT++
        }
    };
    Redbag.prototype = {
        appendBody: function(){
            body.appendChild(this)
        },
        removeFromBody: function(){
            this.removeChildFrom(body)
        },
        startAnimation: function(){
            this.timer = setInterval(function(){

                requestAnimationFrame(function(){
                    this.style.transmateScale = this.scale + 0.01;
                }.bind(this))

                if(this.scale >= 1) {
                    this.removeFromBody()
                }
                this.scale += 0.01;
            }.bind(this), ANIMATION_DELAY)
        }
    }



});
