import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from "../../actions"

import { STATIC_URL } from '../../../config/config'
const { width, height } = Dimensions.get('window')

import RankComponent from '../../components/rank'

class BeerRank extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    if (this.props.beerRank) {
      return (
        <View style={{ backgroundColor: '#fff', }}>
          <ListView
            enableEmptySections={true}
            dataSource={ds.cloneWithRows(this.props.beerRank)}
            style={{ paddingTop: 10, }}
            renderRow={rowData => {
              return rowData ? (
                <RankComponent
                  rank={rowData}
                  navigation={this.props.navigation}
                  isBeer={true}
                />
              ) : null
            }}
          />
        </View>
      )
    } else {

    }
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  beerRank: state.beerData.beerRank,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(BeerRank)
