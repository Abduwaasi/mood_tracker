import React, { FC, useCallback, useState } from 'react'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { theme } from '../theme';
import { MoodOptionProps } from '../type'
// Images

const imageSource = require('../../assets/images/butterflies.png')
const moodOptions: MoodOptionProps[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];
type MoodPickerProps = {
  onSelect: (mood: MoodOptionProps) => void
}
const MoodPicker: FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<MoodOptionProps>()
  const [hasSelected, setHasSelected] = useState(false)


  const handleSelectMood = useCallback(() => {
    if (selectedOption) {
      onSelect(selectedOption)
      setSelectedOption(undefined)
      setHasSelected(true)
    }
  }, [onSelect, selectedOption])

  if (hasSelected) {
    return <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode='contain' />
      <Pressable style={styles.button} onPress={(current) => setHasSelected(!current)}>
        <Text style={styles.btnText}>Back</Text>
      </Pressable>
    </View>
  }
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>How are yor right now?</Text>
      <View style={styles.wrapper}>
        {moodOptions.map(option => {
          return <View key={option.description} style={styles.emojiGroup}>
            <Pressable
              onPress={() => setSelectedOption(option)}
              style={[styles.moodWrapper,
              selectedOption?.description === option.description ? styles.selectedMood : undefined
              ]}
            >
              <Text style={styles.emoji}>{option.emoji}</Text>
            </Pressable>
            {selectedOption?.description === option.description ? <Text style={styles.description}>{option.description}</Text> : ""}
          </View>
        })}
      </View>
      <Pressable style={styles.button} onPress={handleSelectMood}>
        <Text style={styles.btnText}>Choose</Text>
      </Pressable>
    </View>
  )
}

export default MoodPicker

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: theme.colorPurple,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    height: 300,
  },
  greeting: {
    fontFamily: theme.fontFamilyBold,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: theme.colorWhite,
  },
  wrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  emojiGroup: {

    alignItems: 'center',
    justifyContent: 'center'

  },
  moodWrapper: {
    width: 50,
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  selectedMood: {
    backgroundColor: theme.colorPurple,
    borderWidth: 2,
    borderColor: theme.colorWhite
  },
  emoji: {
    fontSize: 30
  },
  description: {
    textAlign: 'center',
    color: theme.colorPurple,
    fontWeight: '500',
    fontSize: 13
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    backgroundColor: theme.colorPurple,
    borderRadius: 12,
  },
  btnText: {
    textAlign: 'center',
    fontFamily: theme.fontFamilyRegular,
    color: theme.colorWhite,
    fontWeight: '500',
    fontSize: 16,


  },
  image: {
    width: 300,
    height: 100,
    marginBottom: 40
  }
})