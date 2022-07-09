import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IsMe from './isMe'
import Other from './Other'

const ChatItem = ({isMe, text, date}) => {
  if(isMe) {
    return <IsMe  text={text} date={date}/>
  }
  return <Other  text={text} date={date} />
}

export default ChatItem

const styles = StyleSheet.create({

})