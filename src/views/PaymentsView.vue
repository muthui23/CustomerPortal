<template>
 <v-container class="py-6" fluid>
  <div class="payments-container">
    <div class="header">
      <h2>Payments</h2>
      <p>Track all your recent transactions and manage your payments here.</p>
    </div>
    <v-card class="payment-table-card" elevation="2">
      <v-table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Reference</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.id">
            <td>{{ formatDate(payment.date) }}</td>
            <td>{{ formatCurrency(payment.amount) }}</td>
            <td>{{ payment.reference }}</td>
            <td>
              <v-chip :color="statusColor(payment.status)" variant="flat" size="small">
                {{ payment.status }}
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
      <div class="payments-container">
    <v-btn color="deep-purple-accent-4" @click="dialog = true">
      Make Payment
    </v-btn>
     <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h6">Make a Payment</v-card-title>
        
        <v-card-text>
          <v-form @submit.prevent="submitPayment">
            <v-text-field
              v-model="mobile"
              label="Mobile Number"
              placeholder="e.g. 0712345678"
              required
            ></v-text-field>

            <v-text-field
              v-model="amount"
              label="Amount"
              type="number"
              placeholder="e.g. 500"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="submitPayment">Pay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </div>
 </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const payments = ref([
  { id: 1, date: '2024-06-20', amount: 3000, reference: 'PAY-001', status: 'Success' },
  { id: 2, date: '2024-05-15', amount: 2500, reference: 'PAY-002', status: 'Pending' },
  { id: 3, date: '2024-04-10', amount: 4000, reference: 'PAY-003', status: 'Failed' },
])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatCurrency = (amount) => {
  return `Ksh ${amount.toLocaleString()}`
}

const statusColor = (status) => {
  switch (status) {
    case 'Success': return 'green-lighten-2'
    case 'Pending': return 'orange-lighten-3'
    case 'Failed': return 'red-lighten-2'
    default: return 'grey-lighten-2'
  }
}


const submitPayment = async () => {
  if (!mobile.value || !amount.value) {
    alert('Please fill in all fields.')
    return
  }

  try {
    await axios.post('/api/payments', {
      mobile: mobile.value,
      amount: amount.value
    })

    alert('STK Push sent to ' + mobile.value)
    dialog.value = false
    mobile.value = ''
    amount.value = ''
  } catch (error) {
    alert('Payment failed. Please try again.')
  }
}

const dialog = ref(false)
const mobile = ref('')
const amount = ref('')

</script>

<style scoped>
.payments-container {
  padding: 24px;
  background-color:var(--v-theme-on-surface) ;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.header h2 {
  margin-bottom: 4px;
  font-weight: 600;
}

.header p {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.payment-table-card {
  border-radius: 12px;
  overflow-x: auto;
}

.actions {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}
</style>
