import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components/'
import styles from '../../css/fa-xian/home.css'
import { NativeBridge } from '../../helpers'
import { Browser } from '../../helpers'
import { BannerGroup } from 'fw-components'

@inject('faxian')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Home extends React.Component {
    componentDidMount() {
        let { faxian } = this.props;
        faxian.getBannersHandler()
    }
    render() {
        let { banners } = this.props.faxian.data;
        let banner_group;
        if (banners.length > 0)
            banner_group = <BannerGroup styleName="banners"
                onImageClick={this.onImageClickHandler}
                images={banners.map(i => i.img)} />;
        return <div styleName="home">
            <div styleName="findBanner">
                {banner_group}
            </div>
        </div>
    }
}
export default Home