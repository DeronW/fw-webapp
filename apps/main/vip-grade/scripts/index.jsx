'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const NavTitle = React.createClass({
    render: function () {
        return (
            <div className="nav-title">
                <span className="back-btn">
                    <img src={STATIC_PATH +"images/back-btn.png"}/>
                </span>
                <h1 className="title">{this.props.title}</h1>
            </div>
        );
    }
});

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
    render: function () {
        var self = this;

        return (
            <div className="">
                <div className="banner-block">
                    <ReactSwipe wrapperClassName={'wrap'} auto={3000} speed={1000} callback={this.changeCurrentIndex}>
                        <div className="banner-img">
                            <div className="img-block">
                                <a href="">
                                    <img src={STATIC_PATH +"images/grade-banner.png"}/>
                                </a>
                            </div>
                            <div className="cont-img">
                                <img src={STATIC_PATH +"images/grade-img.png"}/>
                            </div>
                        </div>

                        <div className="banner-img">
                            <div className="img-block">
                                <a href="">
                                    <img src={STATIC_PATH +"images/grade-banner.png"}/>
                                </a>
                            </div>
                            <div className="cont-img">
                                <img src={STATIC_PATH +"images/grade-img.png"}/>
                            </div>
                        </div>

                        <div className="banner-img">
                            <div className="img-block">
                                <a href="">
                                    <img src={STATIC_PATH +"images/grade-banner.png"}/>
                                </a>
                            </div>
                            <div className="cont-img">
                                <img src={STATIC_PATH +"images/grade-img.png"}/>
                            </div>
                        </div>

                        <div className="banner-img">
                            <div className="img-block">
                                <a href="">
                                    <img src={STATIC_PATH +"images/grade-banner.png"}/>
                                </a>
                            </div>
                            <div className="cont-img">
                                <img src={STATIC_PATH +"images/grade-img.png"}/>
                            </div>
                        </div>

                        <div className="banner-img">
                            <div className="img-block">
                                <a href="">
                                    <img src={STATIC_PATH +"images/grade-banner.png"}/>
                                </a>
                            </div>
                            <div className="cont-img">
                                <img src={STATIC_PATH +"images/grade-img.png"}/>
                            </div>
                        </div>

                    </ReactSwipe>

                    <div className="points">
                        {
                            this.state.banners.map((index) =>
                                <div key={index} className={(self.state.cur_index == index - 1) ? "on" : ''}></div>)
                        }
                    </div>
                </div>
            </div>
        );
    }
});

const VipGrade = React.createClass({
    render: function () {
        return (
            <div>
                <NavTitle title="会员等级"/>
                <VipGradeCont/>
                <div className="ui-btn">
                    <a href="" className="btn"> 查看升级攻略 </a>
                </div>
            </div>
        );
    }
});


ReactDOM.render(<VipGrade/>, document.getElementById("cnt"));
