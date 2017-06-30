import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import styles from '../css/red-packet-result.css'

@inject('red_bag')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class RedPacketResult extends React.Component {
      render(){
          return (
              <div>
                  <Header title="提现结果"/>
              </div>
          )

      }


}
