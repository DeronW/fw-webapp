'use strict';

const NavTitle = React.createClass({
    render: function() {
        return (
            <div className="nav-title">
                <span className="back-btn">
                    <img src="../images/back-btn.png"/>
                </span>
                <h1 className="title">{this.props.title}</h1>
            </div>
        );  
    }   
});

/*const Carousel = React.createClass({                                                                                                                                            
    getInitialState: function () {
        return {
            banners: this.props.banners || [], 
            cur_index: 0
        }   
    },  

    changeCurrentIndex: function (index) {
        this.setState({cur_index: index})
    },  

    render: function () {
        let banner = (dot, index) => <div key={index} className={(this.state.cur_index == index) ? "on" : ''}></div>;
        let ba = (d, index) => <div key={index}><a href={d.href}><img src={d.img}/></a></div>;

        return (
            <div className="banner-carousel">
                <ReactSwipe wrapperClassName={'wrap'} auto={3000} speed={1000} callback={this.changeCurrentIndex}>
                    {this.state.banners.map(ba) }
                </ReactSwipe>
                <div className="points">
                    {this.state.banners.map(banner)}
                </div>
            </div>
        );  
    }   
});
*/

const VipGradeCont = React.createClass({
    getInitialState: function () {
        return {
            banners: [1, 2, 3, 4, 5] || [], 
            cur_index: 0
        }   
    },  
    changeCurrentIndex: function (index) {
        this.setState({cur_index: index})
    },  
    render: function() {
        var self = this;

        return (
            <div className="">
                <div className="banner-block">
                    <ReactSwipe wrapperClassName={'wrap'} auto={3000} speed={1000} callback={this.changeCurrentIndex}>
                            <div className="banner-img">
                                <div className="img-block">
                                    <a href="">
                                        <img src="../images/grade-banner.png"/>
                                    </a>
                                </div>
                                <div className="cont-img">
                                    <img src="../images/grade-img.png"/>
                                </div>
                            </div>    

                            <div className="banner-img">
                                <div className="img-block">
                                    <a href="">
                                        <img src="../images/grade-banner.png"/>
                                    </a>
                                </div>
                                <div className="cont-img">
                                    <img src="../images/grade-img.png"/>
                                </div>
                            </div>    

                            <div className="banner-img">
                                <div className="img-block">
                                    <a href="">
                                        <img src="../images/grade-banner.png"/>
                                    </a>
                                </div>
                                <div className="cont-img">
                                    <img src="../images/grade-img.png"/>
                                </div>
                            </div>    

                            <div className="banner-img">
                                <div className="img-block">
                                    <a href="">
                                        <img src="../images/grade-banner.png"/>
                                    </a>
                                </div>
                                <div className="cont-img">
                                    <img src="../images/grade-img.png"/>
                                </div>
                            </div>    

                            <div className="banner-img">
                                <div className="img-block">
                                    <a href="">
                                        <img src="../images/grade-banner.png"/>
                                    </a>
                                </div>
                                <div className="cont-img">
                                    <img src="../images/grade-img.png"/>
                                </div>
                            </div>    

                    </ReactSwipe>
                    
                    <div className="points">
                        {
                            this.state.banners.map(function(index) {
                                return <div key={index} className={(self.state.cur_index == index) ? "on" : ''}></div>
                            })
                        }
                    </div>
                </div>

                
            </div>
        );
    }
});

const UiBtn = React.createClass({
    render: function() {
        return (
            <div className="ui-btn">
                <a href="" className="btn">
                    查看升级攻略
                </a>
            </div>
        );
    }
});

const VipGrade = React.createClass({
    render: function() {
        return (
            <div>
                <NavTitle title="会员等级"/>

                <VipGradeCont/>

                <UiBtn/>
            </div>
        );
    }
});


ReactDOM.render(
    <VipGrade/>,
    document.getElementById("cnt")
);
