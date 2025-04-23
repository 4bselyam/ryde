import { Text, View } from 'react-native'
import { GoogleInputProps } from '@/types/type'

const GoogleTextInput = ({ icon, containerStyle, textInputBackgroundColor, handlePress }: GoogleInputProps) => {
  return (
    <View className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle}`}>
      <Text>Google Text Input</Text>
    </View>
  )
}

export default GoogleTextInput
