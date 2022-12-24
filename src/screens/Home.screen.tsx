import React, { FC } from "react"
import { ImageBackground, StyleSheet, View } from 'react-native'
import MoodPicker from "../components/MoodPicker"
import { useGlobalContext } from "../App.Provider"


const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';
const Home: FC = () => {
  const { handleSelectedList } = useGlobalContext()
  return (
    <ImageBackground style={styles.container} source={{ uri: imageUrl }}>
      <MoodPicker onSelect={handleSelectedList} />
    </ ImageBackground >
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },

})