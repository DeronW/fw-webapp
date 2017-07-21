import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/home.css'


@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class Home extends React.Component {

    componentDidMount() {
        document.title = '放心花'
    }

    render() {
        return <div>
            sss
        </div>
    }
}