<template>
  <v-container class="py-6">
    <h2 class="text-h5 mb-4">Statement of Account</h2>

    <v-data-table
      :headers="statementHeaders"
      :items="statements"
      class="elevation-1"
      item-value="id"
      density="comfortable"
      hide-default-footer
    >
      <!-- Format Amounts -->
      <template #item.amount="{ item }">
        <span :class="item.amount < 0 ? 'text-error' : 'text-success'">
          {{ item.amount < 0 ? '-' : '' }}KES {{ Math.abs(item.amount).toLocaleString() }}
        </span>
      </template>

      <!-- No Data Message -->
      <template #no-data>
        <v-alert type="info" border="start" text>
          No statement records available.
        </v-alert>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'


const statements = ref([
  { id: 'STMT1', date: '2025-06-15', description: 'Payment Received', amount: -500 },
  { id: 'STMT2', date: '2025-06-10', description: 'Bill Issued', amount: 1000 },
  { id: 'STMT3', date: '2025-05-28', description: 'Arrears Payment', amount: -200 },
  { id: 'STMT4', date: '2025-05-01', description: 'Monthly Bill', amount: 950 },
])

const statementHeaders = [
  { title: 'Date', key: 'date' },
  { title: 'Description', key: 'description' },
  { title: 'Amount (KES)', key: 'amount', align: 'end' },
]
</script>

<style scoped>

.v-container {
  max-width: 100%;
  overflow-x: auto;
}
</style>
