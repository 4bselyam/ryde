import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const { user } = useUser()

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Text>Please sign in</Text>
      </SignedOut>
    </View>
  )
}

export default Home
