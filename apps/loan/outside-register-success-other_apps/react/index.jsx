// components

class SuccessInfo extends React.Component {
  render() {
    return (
      <div className="success-info">
        <h3>恭喜您！注册成功</h3>
        <p>还差一步就可以领钱啦</p>
      </div>
    )
  }
}

class QrcodeWrap extends React.Component {
  render() {
    return (
      <div className="qrcode-wrap">
        <div className="qrcode-container">
          <img src="images/qrcode.png" alt="qrcode for fxh"></img>
        </div>
        <div className="wx-info">
          <h1>微信号：fxhuaba</h1>
          <h2>长按保存上方二维码图片<br />打开微信扫一扫，选择从相册选取</h2>
        </div>
      </div>
    )
  }
}

class FollowWxWrap extends React.Component {
  render() {
    return (
      <div className="follow-wx-wrap">
        <SuccessInfo />
        <QrcodeWrap />
      </div>
    )
  }
}


// render ReactDom

$FW.DOMReady(() => {
    ReactDOM.render(<FollowWxWrap />, CONTENT_NODE)
})
