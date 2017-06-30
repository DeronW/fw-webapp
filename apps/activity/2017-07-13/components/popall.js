import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/pop.css'
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PopStartPanel extends React.Component {
    render() {
        return <div className="pop_status_box pop_notbegun_box">
            <div className="pop_status_text pop_notbegun_text">

            </div>
        </div>
    }
}
export {PopStartPanel}