class CountDown extends React.Component{
    constructor(){
        super()
        this.countDown = this.countDown.bind(this)
    }
    countDown(time, index) {
        clearInterval(timer);
        let createdTime = time;
        console.log(createdTime + "11111111111111")
        let mm = createdTime / 1000;

        let m = Math.floor(mm / 60 % 60);
        let s = (mm % 60).toFixed(0);
        let timer = setInterval(() => {
            if(s<10){
                s= "0"+s;
            }
            document.getElementById(index+"limit_time").innerHTML = m + ':' + s;
            s--;
            if (s < 0) {
                s = 59;
                m--;
                if (m == -1) {
                    clearInterval(timer);
                    this.props.request();//重新请求数据
                }
                if(m<10){
                    m="0"+m;
                }
            }
        }, 1000)
    }
    render(){
        let {id,time,index} = this.props;
        return <div className="content_time"
        id={index+"limit_time"}>{this.countDown(time, index)}
        </div>

    }
}
