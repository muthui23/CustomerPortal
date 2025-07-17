<template>
  <v-container class="meter-container">
    <v-btn to="/" variant="text" icon>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <h2>Meter Details</h2>

    <div class="meter-info" v-if="meter">
      <div class="meter-card">
        <div class="meter-header">
          <h3>Meter #{{ meter.id }}</h3>
          <span class="status" :class="meter.status.toLowerCase()">{{ meter.status }}</span>
        </div>

        <div class="meter-details">
          <div class="detail">
            <span>Type:</span>
            <span>{{ meter.type }}</span>
          </div>
          <div class="detail">
            <span>Installation Date:</span>
            <span>{{ formatDate(meter.installationDate) }}</span>
          </div>
          <div class="detail">
            <span>Last Reading:</span>
            <span>{{ meter.lastReading }} kWh</span>
          </div>
          <div class="detail">
            <span>Last Reading Date:</span>
            <span>{{ formatDate(meter.lastReadingDate) }}</span>
          </div>
        </div>
      </div>

      <div class="consumption-section">
        <h3>Consumption History</h3>
        <div class="consumption-table">
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Consumption (kWh)</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(reading, index) in consumptionHistory" :key="index">
                <td>{{ reading.period }}</td>
                <td>{{ reading.consumption }}</td>
                <td>{{ formatCurrency(reading.amount) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useAccountStore } from '@/stores/account'

const accountStore = useAccountStore()

// Dynamic meter data from selected account
const meter = computed(() => accountStore.selectedAccount?.meter)
const consumptionHistory = computed(() => accountStore.selectedAccount?.consumptionHistory || [])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(amount)
}
</script>

<style scoped>

.meter-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.meter-info {
  display: grid;
  gap: 2rem;
}

.meter-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: var(--v-theme-surface);
  color: var(--v-theme-on-surface);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.meter-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.meter-header h3 {
  margin: 0;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status.active {
  background-color: #e6f7ee;
  color: #00a854;
}

.status.inactive {
  background-color: #fff1f0;
  color: #f5222d;
}

.meter-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.detail {
  display: flex;
  justify-content: space-between;
}

.consumption-section {
   background-color: var(--v-theme-surface);
  color: var(--v-theme-on-surface);
  margin-top: 2rem;
}

.consumption-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 500;
}

tr:hover {
  background-color: #f8f9fa;
}
</style>
