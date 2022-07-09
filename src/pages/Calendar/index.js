import React, {useState, useEffect} from 'react';
import Firebase from 'firebase';
import {View, TouchableOpacity, Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import { ICSergeant } from '../../assets';
import { Nothing } from '../../assets';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Calendar  = () => {
  const [items, setItems] = useState({});
    const today = timeToString(new Date())

  const loadItems = () => {
     
    Firebase.database().ref('news/').orderByChild('date').once('value').then(res => {
        if(res.val()) {
            const obj = {}
            const value = res.val();
            value.map(item => {
                let date = item.date
                obj[date] = [{title: item.title}]
            })
            setItems(obj)
        }
      })
  };

  const renderEmptyData = () => {
      return (
        <View>
          <Text style={{textAlign: 'center', margin: 20, fontSize: 20, fontWeight: '600', color: 'green'}}>Nothing found on this date</Text>
          </View>
      )
  }

  const renderItem = (item) => {
      const uri = item.uri
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content style={{borderRadius: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: 'black', fontWeight: '600'}}>{item.title}</Text>
              <ICSergeant />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={today}
        renderItem={renderItem}
        theme={{
            agendaDayTextColor: 'black',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            agendaKnobColor: 'grey'
          }}
          renderEmptyData={renderEmptyData}
      />
    </View>
  );
};


export default Calendar;