import React, { useState, useContext, PropsWithChildren, createContext, FC, useCallback, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { MoodOptionProps, MoodOptionWithTimestamp } from "./type"
type AppContextType = {
    moodList: MoodOptionWithTimestamp[],
    handleSelectedList: (mood: MoodOptionProps) => void,
    handleDeleteMood: (mood: MoodOptionWithTimestamp) => void

}
const initialValue = {
    moodList: [],
    handleSelectedList: () => { },
    handleDeleteMood: () => { }

}

// Async Storage
const storageKey = "mood-tracker"
type AppData = {
    moods: MoodOptionWithTimestamp[]
}
const AppContext = createContext<AppContextType>(initialValue)

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([])

    const getAppData = async (): Promise<AppData | null> => {
        try {
            const data = await AsyncStorage.getItem(storageKey)
            if (data) {
                return JSON.parse(data)
            }
            return null
        } catch (error) {
            throw (error)
        }

    }
    const setAppData = async (newData: AppData) => {
        try {
            await AsyncStorage.setItem(storageKey, JSON.stringify(newData))
        } catch (error) {
            throw (error)
        }
    }

    const getDataFromStorage = async () => {
        try {
            const data = await getAppData()
            if (data) {
                setMoodList(data.moods)
            }

        } catch (error) {
            throw (error)
        }
    }
    useEffect(() => {
        getDataFromStorage()
    }, [])
    const handleSelectedList = useCallback((mood: MoodOptionProps) => {
        setMoodList(current => {
            const newValue = [...current, { mood, timestamp: Date.now() }]
            setAppData({ moods: newValue })
            return newValue
        })

    }, [])

    const handleDeleteMood = useCallback((mood: MoodOptionWithTimestamp) => {
        setMoodList(current => {
            const newList = current.filter(item => item.timestamp !== mood.timestamp)
            setAppData({ moods: newList })
            return newList
        })
    }, [])

    return <AppContext.Provider value={{ moodList, handleSelectedList, handleDeleteMood }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => useContext(AppContext)