<template>
  <v-container class="py-6" fluid>
    <div class="dashboard-container">
      <!-- Welcome Message -->
      <div class="welcome-message mb-6">
        <h2>Welcome, <span class="username">{{ userName }}</span>! 👋</h2>
      </div>

      <!-- Metrics Row -->
      <v-row dense>
        <v-col cols="12" sm="6" md="4">
          <v-card class="dashboard-card" elevation="2" color="surface">
            <div class="card-content">
              <v-icon size="36" color="green-darken-2" class="icon-animated">mdi-wallet</v-icon>
              <div>
                <div class="label">Balance</div>
                <div class="value">KES {{ account.balance.toLocaleString() }}</div>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-card class="dashboard-card" elevation="2" color="surface">
            <div class="card-content">
              <v-icon size="36" color="amber-darken-3" class="icon-animated">mdi-receipt</v-icon>
              <div>
                <div class="label">Current Bill</div>
                <div class="value">KES {{ account.currentBill.toLocaleString() }}</div>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-card class="dashboard-card" elevation="2" color="surface">
            <div class="card-content">
              <v-icon size="36" color="pink-darken-2" class="icon-animated">mdi-alert</v-icon>
              <div>
                <div class="label">Arrears</div>
                <div class="value">KES {{ account.arrears.toLocaleString() }}</div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Map Section -->
      <div class="map-section mt-10">
        <h3 class="map-title">Your Location</h3>
        <div id="map" class="dashboard-map"></div>
      </div>
    </div>
  </v-container>
</template>


<script setup>
const userName = "Sharon";
import { computed, onMounted } from 'vue'
import L from 'leaflet'
import { useAccountStore } from '@/stores/account'


const accountStore = useAccountStore()
const account = computed(() => accountStore.selectedAccount)

onMounted(() => {
  const map = L.map('map').setView([-1.2921, 36.8219], 13) // Nairobi coords

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  L.marker([-1.2921, 36.8219]).addTo(map)
    .bindPopup('You are here!')
    .openPopup()
})

</script>

<style scoped>
.dashboard-container {
  padding: 24px;
  background-color:var(--v-theme-on-surface) ;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.welcome-message h2 {
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 12px;
}

.username {
  color: #16ad4e; 
  font-weight: 600;
}

.dashboard-card {
  border-radius: 16px;
  padding: 20px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-weight: 500;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  .label,
  .value,
  .due-date,
  .amount{
   color: var(--v-theme-on-surface);
    background-color: var(--v-theme-surface);
  
  }

}
.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.card-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon {
  transition: transform 0.3s ease;
}

.label {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-bottom: 4px;
  color: var(--v-theme-on-surface);;
}

.value {
  font-size: 1.4rem;
  font-weight: 600;
  color: #222;
}

@media (max-width: 960px) {
  .value {
    font-size: 1.2rem;
  }
}

.icon-animated {
  transition: transform 0.3s ease;
}

.dashboard-card:hover .icon-animated {
  transform: scale(1.1) rotate(3deg);
}

.map-section {
  margin-top: 40px;
}

.map-title {
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 12px;
}

.dashboard-map {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
}
</style>



