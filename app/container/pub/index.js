import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ListView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from "../../actions"

import PubComponent from '../../components/pub/list'

class Pub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
    this.changeKeyword = this.changeKeyword.bind(this)
    this.initKeyword = this.initKeyword.bind(this)

    this.props.navigation.setParams({
      initPubList: this.props.getPubList,
      initKeyword: this.initKeyword,
    })
  }
  static navigationOptions = ({ navigation }) => ({
    tabBarOnPress: (scene, jumpToIndex) => {
      if (!scene || !scene.focused) {
        navigation.state.params.initKeyword()
        navigation.state.params.initPubList()
      }
      jumpToIndex(scene.index)
    },
  })

  initKeyword() {
    this.setState({
      keyword: ''
    })
  }

  changeKeyword(keyword) {
    this.setState({ keyword })
    setTimeout(() => {
      this.props.getPubList(this.state.keyword)
    }, 300)
  }

  navigateDetailPage(_id) {
    if (this.props.nav.routes[this.props.nav.index].routeName !== 'PubDetail') {
      this.props.navigation.navigate('PubDetail', { _id })
    }
  }

  render() {
    if (this.props.pubData && this.props.pubData.pubList) {
      return (
        <View style={{ marginBottom: 56 }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#eea51b',
            height: 56, elevation: 8, }}>
            <Text style={{ flex: 16, marginTop: 14, marginLeft: 28, color: '#fff',
              fontSize: 20, fontWeight: '600' }}>Pub</Text>
            <TouchableOpacity style={{ flex: 2, marginTop: 17, }}
              onPress={() => {
                const nav = this.props.nav
                if (nav.routes[nav.index].routeName !== 'PubRank') {
                  this.props.navigation.navigate('PubRank')
                }
              }}>
              <Image source={require('../../images/common/rank.png')} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', height: 60, borderBottomWidth: 1,
              borderBottomColor: '#eea51b', marginLeft: 28, marginRight: 18,  }}>
              <Image source={require('../../images/record/search.png')}
                style={{ marginTop: 22, marginLeft: 2, marginBottom: 18  }}/>
              <TextInput
                maxLength={30}
                numberOfLines={1}
                placeholder={'검색'}
                placeholderTextColor={'#949494'}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                style={{ flex: 5, marginTop: 10, marginLeft: 16, fontSize: 16, height: 40,
                  color: '#000', fontWeight: '400', }}
                onChangeText={(keyword) => this.changeKeyword(keyword)}
                value={this.state.keyword}/>
            </View>
            <ListView
              enableEmptySections={true}
              dataSource={this.state.ds.cloneWithRows(this.props.pubData.pubList)}
              renderRow={rowData => {
                return rowData ? (
                  <PubComponent data={rowData}
                    navigateDetailPage={this.navigateDetailPage.bind(this, rowData._id)}/>
                ) : null
              }}
            />
          </ScrollView>
        </View>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center',
        alignItems: 'center', marginTop: 70, }}>
        <ActivityIndicator
          animating={!this.props.pubData || !this.props.pubData.pubList}
          color='#eea51b'
          size="large"
          style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', height: 100, }}/>
      </View>
    )
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  pubData: state.pubData,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(Pub)
