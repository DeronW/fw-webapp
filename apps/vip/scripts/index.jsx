'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

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

const PrivilegePageContent = React.createClass({
    render: function() {
        return (
            <div>
                <div className="privilege-banner">
                    <img src="../images/banner.jpg"/> 
                </div>

                <div className="privilege-introduction t-b-content">
                    <div className="title">
                        <h2 className="text"><img src="../images/privilege-icon.png"/> 特权介绍</h2>
                    </div>

                    <div className="content-block">
                        <p className="content-text">豆哥在你的生日当天,为你准备了生日大礼包哦, 一起来金融工场开派对吧!</p>
                    </div>
                </div>

                <div className="privilege-reward t-b-content">
                    <div className="title">
                        <h2 className="text"><img src="../images/privilege-icon-1.png"/> 特权奖励</h2>
                    </div>

                    <div className="content-block">
                        <p className="content-text">
                            <img src="../images/point.png"/>
                            <em className="c-fe606b">100</em>元返现券
                        </p>
                    </div>
                </div>
            </div>
        );
    }
});

const PrivilegePage = React.createClass({
    render: function() {
        return (
            <div>
                <NavTitle title="特权详情"/>

                <PrivilegePageContent/>
            </div>
        );
    }
});


ReactDOM.render(
    <PrivilegePage/>,
    document.getElementById("main")
);
