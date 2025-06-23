<template>
  <div class="bills-container">
    <h2>Your Bills</h2>
    
    <div class="bills-list">
      <div class="bill-card" v-for="bill in bills" :key="bill.id">
        <div class="bill-header">
          <h3>Bill #{{ bill.id }}</h3>
          <span class="due-date" :class="{ 'overdue': isOverdue(bill.dueDate) }">
            Due {{ formatDate(bill.dueDate) }}
          </span>
        </div>
        
        <div class="bill-details">
          <div class="detail">
            <span>Amount Due:</span>
            <span class="amount">{{ formatCurrency(bill.amount) }}</span>
          </div>
          <div class="detail">
            <span>Billing Period:</span>
            <span>{{ formatPeriod(bill.startDate, bill.endDate) }}</span>
          </div>
        </div>
        
        <div class="bill-actions">
          <button @click="viewBillDetails(bill)" class="view-btn">
            View Details
          </button>
          <button @click="payBill(bill)" class="pay-btn">
            Pay Bill
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock data
const bills = ref([
  {
    id: 'BL2023-1001',
    amount: 145.75,
    dueDate: '2023-07-15',
    startDate: '2023-06-01',
    endDate: '2023-06-30',
    status: 'Pending'
  },
  {
    id: 'BL2023-1002',
    amount: 132.50,
    dueDate: '2023-06-15',
    startDate: '2023-05-01',
    endDate: '2023-05-31',
    status: 'Overdue'
  },
  {
    id: 'BL2023-1003',
    amount: 128.90,
    dueDate: '2023-05-15',
    startDate: '2023-04-01',
    endDate: '2023-04-30',
    status: 'Paid'
  }
])

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

const isOverdue = (dueDate) => {
  return new Date(dueDate) < new Date()
}

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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ksh'
  }).format(amount)
}
</script>

<style scoped>
/* Same styles as previous implementation */
</style>