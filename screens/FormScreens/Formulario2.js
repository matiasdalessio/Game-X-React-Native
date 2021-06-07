import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image
} from 'react-native'
import LottieView from 'lottie-react-native'
import CreditCardForm, { Button, FormModel } from 'rn-credit-card'

const Formulario2 = (props) => {
  const formMethods = useForm({
    // to trigger the validation on the blur event
    mode: 'onBlur',
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  })
  const { handleSubmit, formState } = formMethods

  function onSubmit(model=formMethods) {
    props.navigation.navigate('formulario3',{creditCard:model,newSell:props.route.params.newSell,totalPrice:props.route.params.totalPrice})
  }

  return (
    <FormProvider {...formMethods}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.avoider}
          behavior='height'
        >
          <CreditCardForm
          backgroundImage={<Image source={require('../../assets/fondoTarjeta.png')}style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 12,
          }}/>}
            LottieView={LottieView}
            horizontalStart
            overrides={{
              labelText: {
                marginTop: 16,
              },
            }}
            fonts={{
                regular: 'sans-serif',
                bold: 'sans-serif',
              }}
          />
        </KeyboardAvoidingView>
        {formState.isValid && (
          <Button
            style={styles.button}
            title={'CONFIRM PAYMENT'}
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </SafeAreaView>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:20
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
})

export default Formulario2