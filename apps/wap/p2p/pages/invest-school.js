import React from 'react'
import CSSModules from 'react-css-modules'
import {Header} from '../components'
import styles from '../css/invest-school.css'
import {Browser, Ajax} from '../helpers'


@CSSModules(styles, {allowMultiple: true, errorWhenNotFound: false})
class InvestSchool extends React.Component {
    state = {
        tab: '出借百科',
        banner: '',
        listData: []
    }

    componentDidMount() {
        this.getBannerFun();
        this.getListHandler(34);
    }

    getBannerFun = () => {
        Ajax({
            fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
            method: 'get',
            data: {key: '0ca175b9c0f726a831d895e', id: 37},
            silence: true
        }).catch(data => {
            this.setState({banner: data[0].thumb})
        })
    }

    getListHandler = (id) => {
        Ajax({
            fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
            method: 'get',
            data: {key: '0ca175b9c0f726a831d895e', id: id},
            silence: true
        }).catch(data => {
            this.setState({listData: data})
        })
    }

    toggleTabHandler = (t) => {
        this.setState({tab: t});
        if (t == "出借百科") {
            this.getListHandler(34); //34
        } else if (t == "出借者技巧") {
            this.getListHandler(35); //35
        } else {
            this.getListHandler(36); //36
        }
    }

    render() {
        let tabStyle = {
            paddingBottom: Browser.inIOS ? "23px" : "26px"
        };
        let tab = (t, i) => {
            let tab_style = this.state.tab == t ? styles["tabselected"] : styles['tab']
            return <div styleName="tabBlock" key={i} onClick={() => this.toggleTabHandler(t)}>
                <em style={tabStyle} className={tab_style}>{t}</em>
            </div>
        };
        let cell = (item, index) => {
            return <a styleName="cell" key={index} href={item.url}>
                <div styleName="cellText">{item.title}</div>
                <img styleName="iconArrow" src={require("../images/invest-school/arrow.png")}/>
            </a>
        };
        return <div styleName="investSchool">
            {(!Browser.inApp) && <Header title='网贷学堂' history={this.props.history}/>}
            <img styleName="banner" src={this.state.banner}/>
            <div styleName="tabGroup">
                {["出借百科", "出借者技巧", "出借讲堂"].map(tab)}
                <i styleName="dashed1"></i>
                <i styleName="dashed2"></i>
            </div>
            <div styleName="space"></div>
            <div styleName="list">
                {this.state.listData && this.state.listData.map(cell)}
            </div>
        </div>
    }

}


export default InvestSchool
