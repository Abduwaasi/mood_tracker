export type MoodOptionProps = {
  emoji: string,
  description?: string

}

export type MoodOptionWithTimestamp = {
  mood: MoodOptionProps,
  timestamp: number
}

export type IconType = {
  color?: string,
  size?: number
}