<template>
  <div class="statements-container">
    <h2>Account Statements</h2>
    
    <div class="statements-list">
      <div v-if="loading" class="loading-spinner">
        <div class="spinner"></div>
      </div>
      
      <div v-else-if="filteredStatements.length === 0" class="no-results">
        No statements found for the last 30 days.
      </div>
      
      <div v-else class="statement-card" v-for="statement in filteredStatements" :key="statement.id">
        <div class="statement-header">
          <h3>Statement #{{ statement.id }}</h3>
          <span class="date">{{ formatDate(statement.date) }}</span>
        </div>
        <div class="statement-details">
          <div class="detail">
            <span>Amount:</span>
            <span class="amount">{{ formatCurrency(statement.amount) }}</span>
          </div>
          <div class="detail">
            <span>Status:</span>
            <span :class="['status', statement.status.toLowerCase()]">
              {{ statement.status }}
            </span>
          </div>
        </div>
        <button @click="downloadStatement(statement)" class="download-btn">
          Download PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Mock data - only showing Account Statements for last 30 days
const mockStatements = [
  {
    id: 'ST2023-1001',
    date: '2023-06-15',
    amount: 125.75,
    status: 'Paid',
    type: 'Account Statement'
  },
  {
    id: 'ST2023-1002',
    date: '2023-06-01',
    amount: 118.50,
    status: 'Paid',
    type: 'Account Statement'
  },
  {
    id: 'ST2023-1003',
    date: '2023-05-28',
    amount: 135.20,
    status: 'Paid',
    type: 'Account Statement'
  }
]

const loading = ref(false)
const statements = ref([])

// Only show statements from last 30 days
const filteredStatements = computed(() => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - 30)
  
  return statements.value.filter(statement => {
    return new Date(statement.date) >= cutoffDate && 
           statement.type === 'Account Statement'
  })
})

const downloadStatement = (statement) => {
  console.log('Downloading statement:', statement.id)
  alert(`Mock download of statement ${statement.id}`)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

onMounted(() => {
  loading.value = true
  // Simulate API loading
  setTimeout(() => {
    statements.value = mockStatements
    loading.value = false
  }, 500)
})
</script>

<style scoped>
.statements-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.statements-list {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.statement-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.statement-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.statement-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.date {
  color: #666;
  font-size: 0.9rem;
}

.statement-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.detail {
  display: flex;
  justify-content: space-between;
}

.amount {
  font-weight: bold;
  color: #2c3e50;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status.paid {
  background-color: #e6f7ee;
  color: #00a854;
}

.download-btn {
  width: 100%;
  padding: 0.5rem;
  background: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.download-btn:hover {
  background: #e9e9e9;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(0,0,0,0.1);
  border-radius: 50%;
  border-top-color: #2c3e50;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #666;
  border: 1px dashed #ddd;
  border-radius: 8px;
}
</style>