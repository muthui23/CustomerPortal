
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref([
    {
      id: 'acc1',
      name: 'Account 1',
      balance: 15000,
      currentBill: 4000,
      arrears: 1000,

      bills: [
        { id: 'BILL1', amount: 1200, dueDate: '2024-08-01', status: 'Pending' },
        { id: 'BILL2', amount: 800, dueDate: '2024-07-01', status: 'Paid' }
      ],
      statements: [
        { id: 'STMT1', date: '2024-06-15', description: 'Payment', amount: -500 },
        { id: 'STMT2', date: '2024-06-10', description: 'Bill Issued', amount: 1000 }
      ],
       meter: {
      id: 'MTR-2002',
      type: 'Electric Smart Meter',
      status: 'Active',
      installationDate: '2025-01-15',
      lastReading: 950,
      lastReadingDate: '2025-06-30'
    },

    consumptionHistory: [
      { period: 'Jun 2025', consumption: 20, amount: 50.0 },
      { period: 'May 2025', consumption: 400, amount: 305.0 },
      { period: 'Apr 2025', consumption: 190, amount: 302.0 },
      { period: 'Mar 2025', consumption: 180, amount: 200.10 },
      { period: 'Feb 2025', consumption: 165, amount: 380.25 },
      { period: 'Jan 2025', consumption: 140, amount: 150.00 }
    ]
      
    },
    {
      id: 'acc2',
      name: 'Account 2',
      balance: 8000,
      currentBill: 2500,
      arrears: 0,
         bills: [
        { id: 'BILL3', amount: 5000, dueDate: '2024-08-15', status: 'Pending' }
      ],
      statements: [
        { id: 'STMT3', date: '2024-06-20', description: 'Payment', amount: -2000 },
        { id: 'STMT4', date: '2024-06-18', description: 'Bill Issued', amount: 5000 }
      ],     
      
     meter: {
      id: 'MTR-1001',
      type: 'Electric Smart Meter',
      status: 'Active',
      installationDate: '2022-01-15',
      lastReading: 2450,
      lastReadingDate: '2024-06-30'
    },

    consumptionHistory: [
      { period: 'Jun 2024', consumption: 320, amount: 450.0 },
      { period: 'May 2024', consumption: 290, amount: 415.0 },
      { period: 'Apr 2024', consumption: 310, amount: 442.0 },
      { period: 'Mar 2024', consumption: 280, amount: 400.10 },
      { period: 'Feb 2024', consumption: 265, amount: 380.25 },
      { period: 'Jan 2024', consumption: 240, amount: 350.00 }
    ]
  },     
    
  ])

  const selectedAccountId = ref('acc1')

  const selectedAccount = computed(() =>
    accounts.value.find(acc => acc.id === selectedAccountId.value)
  )

  const selectAccount = (id) => {
    selectedAccountId.value = id
    localStorage.setItem('selectedAccountId', id)
  }

  const loadSavedAccount = () => {
    const savedId = localStorage.getItem('selectedAccountId')
    if (savedId) selectedAccountId.value = savedId
  }

  return { accounts, selectedAccountId, selectedAccount, selectAccount, loadSavedAccount }
})
