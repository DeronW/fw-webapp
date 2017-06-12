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
            <Link to="/car-info">Car info</Link>
            <Link to="/policy-detail">Policy detail</Link>
            <Link to="/orders">orders</Link>
        </div>
    }
}

export default Home
