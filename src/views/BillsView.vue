<template>
   <v-container class="pa-4">
 <v-container class="py-6" fluid>
  <div class="bills-container">
    <h2 class="page-title">Your Bills</h2>

    <!-- Date Filters -->
    <v-row dense class="mb-4">
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          v-model="startDate"
          label="Start Date"
          type="date"
          variant="outlined"
          density="comfortable"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          v-model="endDate"
          label="End Date"
          type="date"
          variant="outlined"
          density="comfortable"
        />
      </v-col>
    </v-row>

    <!-- Filtered Bills -->
    <v-row class="bills-list" dense>
     <v-col
  v-for="bill in bills"
  :key="bill.id"
  cols="12"
  sm="6"
  md="4"
>  
  <v-card>
    <v-card-title>Bill #{{ bill.id }}</v-card-title>
    <v-card-text>
            <div class="label">Amount Due</div>
            <div class="value">KES {{ bill.amount.toLocaleString() }}</div>

            <div class="label">Billing Period</div>
            <div class="value">{{ formatPeriod(bill.startDate, bill.endDate) }}</div>
          </v-card-text>
 <v-card-actions class="bill-actions">
            <v-btn color="black" variant="outlined" @click="viewBillDetails(bill)">
              View Details
            </v-btn>
          </v-card-actions>
  </v-card>
</v-col>
    </v-row>
  </div>
   </v-container>
   </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAccountStore } from '@/stores/account'
import { useRouter } from 'vue-router'

const router = useRouter()
const startDate = ref('')
const endDate = ref('')


const accountStore = useAccountStore()
const bills = computed(() => accountStore.selectedAccount?.bills || [])



const viewBillDetails = (bill) => {
  router.push({
    name: 'bill-details',
    params: { id: bill.id },
    state: { bill }
  })
}

const payBill = (bill) => {
  router.push({
    name: 'payment',
    query: { billId: bill.id }
  })
}

const isOverdue = (dueDate) => new Date(dueDate) < new Date()

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatPeriod = (startDate, endDate) => {
  const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${start} - ${end}`
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(amount)
}
</script>

<style scoped>
.bills-container {
  padding: 24px;
  background-color: var(--v-theme-background);
  color: var(--v-theme-on-background);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 24px;
}

.bill-card {
  border-radius: 14px;
  background-color: var(--v-theme-surface);
  color: var(--v-theme-on-surface);
  transition: 0.3s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.due-date {
  font-size: 0.9rem;
  color: var(--v-theme-on-surface);
}

.due-date.overdue {
  color: red;
  font-weight: bold;
}

.amount {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--v-theme-on-surface);
}

.bill-actions {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  color: var(--v-theme-on-surface);

}
</style>

