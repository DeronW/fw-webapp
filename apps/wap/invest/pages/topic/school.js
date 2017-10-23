import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../../css/topic/school.css'


function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

const TABS = [
    ["出借百科", 34], ["出借人技巧", 35], ["出借讲堂", 36]
]

const t = {
    "出借百科": 34,
    "出借人技巧": 35,
    "出借讲堂": 36
}

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class School extends React.Component {

    state = {
        tab: '出借百科',
        banner: '',
        listData: []
    }

    componentDidMount = () => {

        this.getBannerFun();
        this.getListHandler(34);
    }

    getBannerFun() {
        $FW.Ajax({
            url: 'https://fore.9888.cn/cms/api/appbanner.php',
            type: 'get',
            data: {
                key: '0ca175b9c0f726a831d895e',
                id: 37 // 37
            },
            dataType: 'json',
            fail: () => true,
            complete: data => {
                this.setState({ banner: data[0].thumb })
            }
        });
    }
    toggleTabHandler(t) {
        this.setState({ tab: t });
        if (t == "出借百科") {
            this.getListHandler(34); //34
        } else if (t == "出借人技巧") {
            this.getListHandler(35); //35
        } else {
            this.getListHandler(36); //36
        }
    }
    getListHandler(id) {
        $FW.Ajax({
            url: 'https://fore.9888.cn/cms/api/appbanner.php',
            type: 'get',
            data: {
                key: '0ca175b9c0f726a831d895e',
                id: id
            },
            fail: () => true,
            complete: (data) => this.setState({ listData: data })
        })
    }

    render() {

        let tabStyle = {
            paddingBottom: $FW.Browser.inIOS() ? "23px" : "26px"
        };
        let tab = (t, i) => {
            return <div className="tabBlock" key={i} onClick={() => this.toggleTabHandler(t)}>
                <em style={tabStyle} className={this.state.tab == t ? "tab selected" : 'tab'}>{t}</em>
            </div>
        };


        let item = () => {

            let cell = (item, index) => {
                return <a className="cell" key={index} href={item.url}>
                    <div className="cellText">{item.title}</div>
                    <img className="iconArrow" src="images/arrow.png" />
                </a>
            };
            return <div className="list">
                {
                    this.props.listData.map(cell)
                }
            </div>

        }

        return <div className="investSchool">
            <img className="banner" src={this.state.banner} />

            <div className="tabGroup">
                {["出借百科", "出借人技巧", "出借讲堂"].map(tab)}
                <i className="dashed1"></i>
                <i className="dashed2"></i>
            </div>
            <div className="space"></div>
            {
                <InvestSchool.List listData={this.state.listData} />
            }
        </div>
    }
}

export default School