const HomePanel = React.createClass({
    getInitialState: function () {
        return {
            banners: [],
            notice: '123123',
        }
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: `${API_PATH}mall/api/index/v1/banners.json`, // banner轮播图数据
            success: (data) => this.setState({banners: data.banners})
        })
    },
    onImageClickHandler: function (index) {
        console.log(index)
    },
    closeNoticeHandler: function () {
        this.setState({notice: null})
    },
    render: function () {
        let images = [...this.state.banners].map(x => x.img);

        let banner;
        if (images.length) {
            banner = <BannerGroup className="head-images" images={images}
                                  onImageClick={this.onImageClickHandler}/>;
        }

        let notice;
        if (this.state.notice) {
            notice = <div className="notice">
                {this.state.notice}
                <a onClick={this.closeNoticeHandler}>&times;</a>
            </div>
        }

        return (
            <div className="home-panel">
                {banner}
                {notice}
                <div className="panel-title" onClick={()=>this.props.switchInvestPanel('new')}>
                    <i className="icon-new-bid"></i>
                    最新项目
                    <i className="pull-right icon-right-arrow"></i>
                </div>
                <HomePanel.Projects project="new"/>
                <HomePanel.Info />
                <div className="panel-title" onClick={()=>this.props.switchInvestPanel('transfer')}>
                    <i className="icon-transfer"></i>
                    债权转让
                    <i className="pull-right icon-right-arrow"></i>
                </div>
                <HomePanel.Projects project="transfer"/>
            </div>
        )
    }
});

HomePanel.Projects = React.createClass({
    getInitialState: function () {
        return {
            bids: []
        }
    },
    componentDidMount: function () {
        let url = this.props.tab == 'new' ?
            `${API_PATH}mpwap/newPrdClaims/dataList.shtml` :
            `${API_PATH}mpwap/newPrdTransfer/dataList.shtml`;

        $FW.Ajax({
            url: url,
            // method: 'post',
            data: {},
            complete: (data) => {
                let page = data.pageData.pagination;
                let bids = this.state.bids;
                bids = bids.concat(data.pageData.result);
                this.setState({page: page.pageNo, total_page: page.totalPage, bids: bids});
            },
            fail: () => true
        })
    },
    render: function () {
        return (
            <div className="projects">
                {this.state.bids.map((bid)=><Bid bid={bid} key={bid.prdNum}/>)}
            </div>
        )
    }
});

HomePanel.Info = React.createClass({
    getInitialState: function () {
        this._touch = {};
        return {
            left: 0, infos: [{
                img: 'http://placehold.it/350x150',
                link: '',
                title: 'xxx'
            }, {
                img: 'http://placehold.it/350x150',
                link: '',
                title: 'xxx'
            }, {
                img: 'http://placehold.it/350x150',
                link: '',
                title: 'xxx'
            }]
        }
    },
    componentDidMount: function () {
        this._CONTAINER_WIDTH = 326 * this.state.infos.length + 20;
    },
    touchStartHandler: function (event) {
        if (this._onTouching) return;
        this._touch.startX = event.changedTouches[0].pageX;
        this._touch.originLeft = this.state.left;
        this._onTouching = true;

        event.preventDefault();
        // event.stopPropagation();
    },
    touchMoveHandler: function (event) {
        let left = this._touch.originLeft + event.changedTouches[0].pageX - this._touch.startX;
        this.setState({left: Math.max(720 - this._CONTAINER_WIDTH, Math.min(0, left))});
        event.preventDefault();
        // event.stopPropagation();
    },
    touchEndHandler: function (event) {
        this._onTouching = false;
        event.preventDefault();
        // event.stopPropagation();
    },
    render: function () {

        let sc_style = {
            width: this._CONTAINER_WIDTH + 'px',
            left: this.state.left + 'px'
        };

        let event = (data, index) => {
            return (
                <a href={data.link} className="event" key={index}>
                    <img src={data.img}/>
                    <div className="event-title">{data.title}</div>
                </a>
            )
        };

        return (
            <div className="information">
                <div className="info-title">平台信息</div>
                <div className="scroll-panel" onTouchStart={this.touchStartHandler}
                     onTouchMove={this.touchMoveHandler} onTouchEnd={this.touchEndHandler}>
                    <div className="scroll-container" style={sc_style}>
                        {this.state.infos.map(event)}
                    </div>
                </div>
            </div>
        )
    }
});