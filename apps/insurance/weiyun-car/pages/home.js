import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect, Link } from 'react-router-dom'


// import styles from '../css/home.css'

// @inject('') @observer @CSSModules(styles)
class Home extends React.Component {
    componentDidMount() {
        document.title = 'HOME'
    }
    render() {
        return <div>
            <Link to="/basic-info">Basic info</Link>
            <br />
            <Link to="/car-info">Car info</Link>
            <br />
            <Link to="/policy-detail">Policy detail</Link>
            <br />
            <Link to="/orders">orders</Link>
            <br />
            <Link to="/policy-quotation">policy-quotation</Link>
            <br />
            <br />
            <br />
            <br />
        </div>
    }
}

export default Home
