import ReactDOM from 'react-dom'
import React from 'react'
import Alert from './alert.js'
import Toast from './toast.js'
import Loading from './loading.js'
import SVGCircleProgress from './circle-progress.js'
import Nav from './nav.js'

const LOADING_ELEMENT_ID = '_id_react_component_global_loading'

let createTemporaryDOMNode = function (id) {
    let node = document.getElementById(id)
    if (!node) {
        node = document.createElement('div');
        node.id = id;
        document.body.appendChild(node);
    }
    return node
}

let showLoading = function (theme) {
    let node = createTemporaryDOMNode(LOADING_ELEMENT_ID)
    ReactDOM.render(
        <Loading unMountHandler={
            () => node.parentNode.removeChild(node)} />,
        node);
    setTimeout(() => ReactDOM.unmountComponentAtNode(node), 6900);
}

let hideLoading = () => {
    let node = document.getElementById(LOADING_ELEMENT_ID)
    ReactDOM.unmountComponentAtNode(node)
}

let showAlert = function (title, options) {
    options = options || {};
    var id = '_id_react_component_global_alert',
        node = createTemporaryDOMNode(id);

    ReactDOM.render(<Alert
        id={id}
        title={title}
        header={options.header}
        confirm_text={'确认'}
        unMountAlert={() => node.parentNode.removeChild(node)}
    />, node);
}

let showToast = function (data) {
    var id = '_id_react_component_global_toast',
        node = createTemporaryDOMNode(id);

    ReactDOM.render(<Toast
        id={id}
        text={data}
        unMountToast={() => node.parentNode.removeChild(node)}
    />, node);
}


export {
    createTemporaryDOMNode
    , showAlert
    , showLoading
    , hideLoading
    , showToast
    , Alert
    , Toast
    , Loading
    , Nav
    , SVGCircleProgress
}
