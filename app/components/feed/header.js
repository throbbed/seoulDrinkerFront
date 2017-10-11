import React, { Component } from 'react'
import { TouchableOpacity, View, ListView, Image, Text } from 'react-native'

import { makeTimer } from '../common'

import styles from '../../styles/feed'

export default class FeedHeaderComponent extends Component {
  constructor (props) {
    super(props)
    this._onPressButton = this._onPressButton.bind(this)
  }

  _onPressButton () {
    alert(this.props.feedId)
  }

  render () {
    return (
      <View style={ styles.feedHeaderContainer }>
        <View style={ styles.feedHeaderImageContainer }>
          <Image
            style={ styles.feedHeaderImage }
            source={{ uri: `${this.props.picture}` }} />
        </View>
        <View style={ styles.feedHeaderContentsContainer }>
          <Text style={ styles.feedHeaderContentsName }>{this.props.name}</Text>
          <Text style={ styles.feedHeaderContentsDate }>{makeTimer(this.props.date)}</Text>
        </View>
        <View style={ styles.feedHeaderModal }>
          <TouchableOpacity onPress={this._onPressButton} style={ styles.feedHeaderModalTouchable }>
            <Image
              style={ styles.feedHeaderModalImage }
              source={require('../../images/feed/more.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
