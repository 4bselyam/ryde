import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'

const SignUp = () => {
  const { signUp, setActive, isLoaded } = useSignUp()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  })

  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({ ...verification, state: 'pending' })
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage)
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (signUpAttempt.status === 'complete') {
        // TODO: Create a record in database!
        await setActive({ session: signUpAttempt.createdSessionId })
        setVerification({ ...verification, state: 'success' })
      } else {
        setVerification({ ...verification, state: 'failed', error: 'Verification failed' })
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err: any) {
      setVerification({ ...verification, state: 'failed', error: err.errors[0].longMessage })
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute text-4xl text-black font-JakartaSemiBold bottom-5 left-5">Create Your Account</Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            placeholderTextColor="#858585"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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

          <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6" />

          <OAuth />

          <Link href="/sign-in" className="mt-10 text-lg text-center text-general-200">
            <Text className="font-Jakarta">
              Already have an account? <Text className="text-primary-500">Sign In</Text>
            </Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === 'pending'}
          onModalHide={() => {
            if (verification.state === 'success') {
              setShowSuccessModal(true)
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl">
            <Text className="mb-2 text-3xl font-JakartaExtraBold">Verification</Text>

            <Text className="mb-5 text-lg font-Jakarta">We've sent a verification code to {form.email}</Text>

            <InputField
              label="Verification Code"
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) => setVerification({ ...verification, code })}
            />

            {verification.error && <Text className="mt-1 text-sm text-red-500 font-Jakarta">{verification.error}</Text>}

            <CustomButton title="Verify E-Mail" onPress={onVerifyPress} className="mt-5 bg-success-500" />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl">
            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />

            <Text className="text-3xl text-center font-JakartaBold">Verified</Text>

            <Text className="mt-5 text-lg text-center text-gray-400 font-Jakarta">
              Your account has been verified successfully.
            </Text>

            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowSuccessModal(false)
                router.push('/(root)/(tabs)/home')
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  )
}

export default SignUp
