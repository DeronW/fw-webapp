import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../lib/components'

import styles from '../css/idcard-live-match.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false})
class IdcardLiveMatch extends React.Component {

    state = {
        numsToRead: '',
        showPop: false
    }

    componentDidMount() {
        this.setState({ numsToRead: '1537' });
    }

    togglePop = () => this.setState({ showPop: !this.state.showPop })

    handleVideoInput = e => {

    }

    render() {
        const { numsToRead, showPop } = this.state;

        return <div styleName="bg">
            <Header title="人脸识别" history={this.props.history} />

            <div>
                <img src={require('../images/idcard-live-match/banner.png')}></img>
            </div>

            <div styleName="opt-guide">
                <div styleName="opt-step">打开前置<br />摄像头</div>
                <div styleName="opt-step">录制3~6秒<br />自拍视频</div>
                <div styleName="opt-step">录制中朗读<br />下面数字</div>
            </div>

            <div styleName="nums-to-read">{numsToRead}</div>

            <div styleName="tip">请用普通话</div>

            <div styleName="record-btn-container" onClick={this.togglePop}>
                <div styleName="record-btn">开始录制视频</div>
            </div>

            { showPop &&
                <div styleName="pop-mask">
                    <div styleName="pop-and-close">
                        <div styleName="pop">
                            <div styleName="nums-to-read">{numsToRead}</div>
                            <div styleName="tip">牢记这4位数字，录制时用普通话匀速念出。</div>
                            <div styleName="record-btn-container">
                                <div styleName="record-btn">开始录制视频</div>
                                <input type="file" accept="video/*" capture="camcorder" />
                            </div>
                        </div>
                        <i styleName="close" onClick={this.togglePop}></i>
                    </div>
                </div>
            }
        </div>
    }
}

export default IdcardLiveMatch
