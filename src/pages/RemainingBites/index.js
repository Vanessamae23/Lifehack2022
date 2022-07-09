import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Category, Gap, CardNews } from '../../components'
import { Firebase } from '../../config'

const RemainingBites = ({navigation}) => {

  const [ category, setCategory] = useState([])
  const [ mentor, setMentor ] = useState([])
  const [news, setNews] = useState([])
  useEffect(() => {
    Firebase.database().ref('category/').once('value').then(res => {
      if(res.val()) {
        setCategory(res.val())
 
      }
    })

    Firebase.database().ref('news/').once('value').then(res => {
      if(res.val()) {
        setNews(res.val())
        console.log(news)
      }
    })

  }, [])

  const Logout = () => {
    Firebase.auth().signOut().then(() => {
      navigation.replace('SplashScreen')
    }).catch(e => {
      showMessage({
        message: e.message,
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white
      })
    })
  }

  return (
    <ScrollView style={styles.page}>
        <Text style={styles.welcome}>
        Put Food Waste to good use
      </Text>
        <View style={styles.wrapperScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.category}>
            <Gap width={16} />
            { category.map(item => {
              return <Category onPress={() => navigation.navigate('ChooseMentor', item)} type={item.category} key={item.id} />
            })}
            <Gap width={6} />
          </View>
        </ScrollView>
        <View style={styles.news}>
            <Text style={styles.welcome}>
            Announcements and News
          </Text>
          <View style={styles.newsContainer}>
          { news.map((item, index) => {
              return <CardNews onPress={() => navigation.navigate('News', item)} uri={item.uri} details={item.title} key={index} date={item.date} time={item.time} />
            })}
          </View>
          
        </View>
        
      </View>
      
    </ScrollView>
  )
}

export default RemainingBites

const styles = StyleSheet.create({
    page: {
        paddingTop: 30,
        paddingHorizontal: 16,
        backgroundColor: "white",
        flex: 1
      },
      category: {
        flexDirection: 'row',
      },
      wrapperScroll: {
          marginHorizontal: -16
      },
      welcome: {
        fontSize: 22,
        marginTop: 30,
        marginBottom: 15,
        maxWidth: 300,
        fontWeight: "600",
        color: 'black',
        fontWeight: '600'
      },
      news: {
        paddingHorizontal: 20
      },
      newsContainer: {
        paddingBottom: 100
      }

})
