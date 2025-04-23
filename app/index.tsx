import { Redirect } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Text } from 'react-native'
import '../global.css'

const Home = () => {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <Text>Loading...</Text>
  }

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />
  }

  return <Redirect href="/(auth)/welcome" />
}

export default Home
