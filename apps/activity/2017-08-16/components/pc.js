import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/pc.css'
import gotoPage from '../../lib/helpers/goto-page.js'
import PCHeader from '../../lib/components/pc-header.js'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class PC extends React.Component {
    state = {
        masker: 1,
    }
    turn() {
        let m = 0;
        clearInterval(this.time)
        this.time = setInterval(() => {
            this.setState({ masker: m % 8 + 1 })
            m++;
        }, 100)
    }
    stop(n) {
        if (n == this.state.masker) {
            clearInterval(this.time)
        }else{
            
        }
    }
    render() {
        let cell = (n, index) => {
            let active = n == this.state.masker;
            return <div key={n} styleName={active ? "price active" : "prize"}>{n}</div>
        };
        return <div styleName="pc">
            <PCHeader bgColor="rgba(0,0,0,0.5)" />
            <div styleName="nine-grid">
                {[1, 2, 3, 8, 4, 7, 6, 5].map(cell)}
            </div>
            <button onClick={() => this.turn()}>抽奖</button>
            <button onClick={() => this.stop(4)}>停止</button>
        </div>
    }
}
export default PC