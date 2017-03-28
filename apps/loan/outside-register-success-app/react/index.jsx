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

class DownloadLinkWrap extends React.Component {
  render() {
    return (
      <div className="download-link-wrap">
        <div className="gift-container">
          <img src="images/gift.png"></img>
        </div>
        <div
          className="download-btns"
          onClick={this.props.handleClick}>
          <div id="ios">
            <img src="images/ios-icon.png" alt="icon-for-ios"></img>
            iOS版下载
          </div>
          <div id="android">
            <img src="images/android-icon.png" alt="icon-for-android"></img>
            Android版下载
          </div>
        </div>
      </div>
    )
  }
}

class DownloadAppWrap extends React.Component {
  launchDownload(e) {
    var deviceType = e.target.id;
    switch (deviceType) {
      case 'ios':
        location.href = 'https://itunes.apple.com/cn/app/%E6%94%BE%E5%BF%83%E8%8A%B1-%E6%8E%8C%E4%B8%8A%E5%B0%8F%E9%A2%9D%E7%8E%B0%E9%87%91%E5%80%9F%E6%AC%BE/id1208062782?mt=8';
        break;
      case 'android':
        if ($FW.inIOS) {
          return;
        }
        var channel = $FW.Format.urlQuery().name;
        $FW.Ajax(`${API_PATH}api/v1/download.json?name=${channel}`).then((data) => {
            location.href = data.url;
        }, e => $FW.Component.Toast(e.message));
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="follow-wx-wrap">
        <SuccessInfo />
        <DownloadLinkWrap
          handleClick={this.launchDownload}/>
      </div>
    )
  }
}


// render ReactDom

$FW.DOMReady(() => {
    ReactDOM.render(<DownloadAppWrap />, CONTENT_NODE)
})
