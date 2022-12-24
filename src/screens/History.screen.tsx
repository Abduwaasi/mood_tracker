import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useGlobalContext } from '../App.Provider'
import MoodItemRow from '../components/MoodItemRow'

const History: React.FC = () => {
  const { moodList } = useGlobalContext()
  return (
    <ScrollView>
      <View style={styles.bottom}>
        {moodList?.slice().reverse().map(item => (
          <MoodItemRow item={item} key={item.timestamp} />
        ))}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  bottom: {
    marginTop: 28
  }
})

export default History