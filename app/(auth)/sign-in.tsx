import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(root)/(tabs)/home')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute text-4xl text-black font-JakartaSemiBold bottom-5 left-5">Welcome Back</Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            placeholderTextColor="#858585"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            placeholderTextColor="#858585"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />

          <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6" />

          <OAuth />

          <Link href="/sign-up" className="mt-10 text-lg text-center text-general-200">
            <Text className="font-Jakarta">
              Don't have an account? <Text className="text-primary-500">Sign Up</Text>
            </Text>
          </Link>
        </View>

        {/* Verification modal */}
      </View>
    </ScrollView>
  )
}

export default SignIn
