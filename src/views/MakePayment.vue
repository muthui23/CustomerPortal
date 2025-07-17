<template>
  <v-container>
    <v-form @submit.prevent="submitPayment">
      <v-text-field
        v-model="phoneNumber"
        label="Phone Number"
        placeholder="e.g. 254712345678"
        required
      />
      <v-text-field
        v-model="amount"
        label="Amount"
        type="number"
        required
      />
      <v-btn color="primary" type="submit">Make Payment</v-btn>
    </v-form>
    <v-alert v-if="message" :type="alertType" class="mt-4">
      {{ message }}
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const phoneNumber = ref('')
const amount = ref('')
const message = ref('')
const alertType = ref('info')

const submitPayment = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/stk-push', {
      phone: phoneNumber.value,
      amount: amount.value
    })

    message.value = 'STK Push sent! Check your phone to complete payment.'
    alertType.value = 'success'
  } catch (err) {
    console.error(err)
    message.value = 'Failed to send STK Push. Please try again.'
    alertType.value = 'error'
  }
}
</script>


