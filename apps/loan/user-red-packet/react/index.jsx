class Redpacket extends React.Component{
    render(){
        return (
            <div className="red-packet-wrapper">






            </div>
        )
    }

}

function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inFXHApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

$FW.DOMReady(() => {
    ReactDOM.render(<Redpacket />, CONTENT_NODE)
})