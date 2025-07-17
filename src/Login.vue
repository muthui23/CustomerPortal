<template>
  <v-container class="login-container" fluid>
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="10" class="pa-6 login-card" rounded="xl">
          <v-card-title class="text-h5 font-weight-bold justify-center mb-4">
            {{ step === 1 ? 'Sign In with Mobile' : 'Verify OTP' }}
          </v-card-title>

          <v-form @submit.prevent="step === 1 ? requestOTP() : verifyOTP()">
            <v-text-field
              v-if="step === 1"
              v-model="phone"
              label="Phone Number"
              placeholder="e.g. 0712345678"
              prepend-inner-icon="mdi-cellphone"
              variant="outlined"
              hide-details
              class="mb-4"
              color="primary"
              density="comfortable"
              type="tel"
              required
            />

            <v-text-field
              v-else
              v-model="otp"
              label="Enter OTP"
              placeholder="6-digit code"
              prepend-inner-icon="mdi-shield-key"
              variant="outlined"
              hide-details
              maxlength="6"
              color="primary"
              class="mb-4"
              density="comfortable"
              required
            />

            <v-btn
              :loading="loading"
              block
              color="primary"
              size="large"
              class="mb-3"
              type="submit"
            >
              {{ step === 1 ? 'Send OTP' : 'Verify' }}
            </v-btn>

            <v-btn
              v-if="step === 2"
              variant="text"
              block
              size="small"
              @click="step = 1"
            >
              Change Number
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const phone = ref('')
const otp = ref('')
const step = ref(1)
const loading = ref(false)

const requestOTP = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    if (phone.value.startsWith('07')) {
      step.value = 2
    } else {
      alert('Enter a valid phone number.')
    }
  }, 1000)
}

const verifyOTP = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    if (otp.value === '123456') {
        localStorage.setItem('otp_verified', 'true')
      alert('Login successful!')
      router.push('/dashboard')
    } else {
      alert('Invalid OTP. Try again.')
    }
  }, 1000)
}
</script>

<style scoped>
.login-container {
  background: linear-gradient(135deg, #eceff1, #ffffff);
  min-height: 100vh;
  padding: 24px;
}

.login-card {
  background-color: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

@media (prefers-color-scheme: dark) {
  .login-container {
    background: linear-gradient(135deg, #121212, #1e1e1e);
  }

  .login-card {
    background-color: #1e1e1e;
    color: #e0e0e0;
  }
}
</style>
