import React, { FC, useCallback } from 'react'
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native'
import { MoodOptionWithTimestamp } from '../type'
import { format } from "date-fns"
import { theme } from '../theme'
import { useGlobalContext } from "../App.Provider"

type MoodRowProps = {
  item: MoodOptionWithTimestamp,
  // handlePress: () => void

}

const MoodItemRow: FC<MoodRowProps> = ({ item }) => {
  const { handleDeleteMood } = useGlobalContext()

  const handlePress = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    handleDeleteMood(item)
  }, [useGlobalContext, item])
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.emoji}>{item.mood.emoji}</Text>
        <Text style={styles.description}>{item.mood.description}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.time}>
          {format(new Date(item.timestamp), "dd'/'MM, yy 'at' h:mmaa")}
        </Text>
        <Pressable onPress={handlePress}>
          <Text> Delete</Text>
        </Pressable>
      </View>

    </View>
  )
}

export default MoodItemRow

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colorWhite,
    padding: 16,
    marginBottom: 6,
    borderRadius: 8
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  emoji: {
    fontSize: 30,
    marginRight: 10
  },
  description: {
    fontFamily: theme.fontFamilyBold,
    fontSize: 17,
    fontWeight: '700',
    color: theme.colorPurple
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
  time: {
    fontFamily: theme.fontFamilyLight,
    fontSize: 13,
    fontWeight: '300',
    color: theme.colorLavender,
    marginRight: 10
  },
  deleteText: {
    fontFamily: theme.fontFamilyLight,
    fontSize: 16,
    fontWeight: '500',
    color: theme.colorPurple,

  }
})