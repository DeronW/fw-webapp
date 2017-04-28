import ReactDOM from 'react-dom'
import Alert from './alert'
import Toast from './toast'
import Loading from './loading'
import SVGCircleProgress from './circle-progress'

const LOADING_ELEMENT_ID = '_id_react_component_global_loading'

let createTemporaryDOMNode = function (id) {
    var element = document.getElementById(id);

    if (!element) {
        element = document.createElement('div');
        element.id = id;
        document.body.appendChild(element);
    }
    return element;
}

let showLoading = function (theme) {
    let element = createTemporaryDOMNode(LOADING_ELEMENT_ID)
    ReactDOM.render(
        <Loading unMountHandler={
            () => element.parentNode.removeChild(element)} />,
        element);
    setTimeout(() => ReactDOM.unmountComponentAtNode(element), 6900);
}

let hideLoading = () => {
    let element = document.getElementById(LOADING_ELEMENT_ID)
    ReactDOM.unmountComponentAtNode(element)
}

let showAlert = function (title, options) {
    options = options || {};
    var id = '_id_react_component_global_alert',
        node = createTemporaryDOMNode(id);

    ReactDOM.render(React.createElement(Alert, {
        id: id,
        title: title,
        header: options.header,
        confirm_text: '确认',
        unMountAlert: function () {
            node.parentNode.removeChild(node)
        }
    }), node);
}

let showToast = function (data) {
    var id = '_id_react_component_global_toast',
        node = FW.Component._createTemporaryDOMNode(id);

    FW.Component.getReactDOM().render(React.createElement(GlobalToast, {
        id: id,
        text: data,
        unMountToast: function () {
            node.parentNode.removeChild(node)
        }
    }), node);
}

export Nav from './nav'
export SVGCircleProgress from './circle-progress'

export {
    createTemporaryDOMNode,
    showAlert,
    showLoading,
    hideLoading,
    showToast,
    Alert,
    Toast,
    Loading
}
