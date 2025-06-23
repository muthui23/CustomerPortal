<template>
  <div class="dashboard-container">
    <div class="welcome-message text-center mb-6">
      <h2>Welcome, <span class="username">{{ userName }}</span>! 👋</h2>
    </div>

    <v-row dense>
      <v-col cols="12" sm="6" md="3" v-for="card in cards" :key="card.title">
        <v-card :color="card.bg" class="dashboard-card" elevation="2">
          <div class="d-flex align-center">
            <v-icon :color="card.iconColor" size="36" class="mr-4">{{ card.icon }}</v-icon>
            <div>
              <div class="label">{{ card.title }}</div>
              <div class="value">{{ card.value }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const userName = "Sharon";

const cards = [
  { title: "Balance", value: "Ksh 15,000", icon: "mdi-wallet", iconColor: "blue-darken-2", bg: "blue-lighten-5" },
  { title: "Current Bill", value: "Ksh 4,000", icon: "mdi-receipt", iconColor: "green-darken-2", bg: "green-lighten-5" },
  { title: "Payments", value: "Ksh 3,000", icon: "mdi-cash", iconColor: "orange-darken-2", bg: "orange-lighten-5" },
  { title: "Arrears", value: "Ksh 1,000", icon: "mdi-alert", iconColor: "red-darken-2", bg: "red-lighten-5" }
];
</script>

<style scoped>
.dashboard-container {
  padding: 24px;
}

.welcome-message h2 {
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 12px;
}

.username {
  color: #1976d2;
  font-weight: 600;
}

.dashboard-card {
  background-color: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  align-items: center;
  min-height: 120px;
}

.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.label {
  font-size: 0.85rem;
  color: #6b7280; /* soft gray */
  margin-bottom: 4px;
  letter-spacing: 0.02em;
}

.value {
  font-size: 1.4rem;
  font-weight: 600;
  color: #111827; /* dark neutral */
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
  transform: scale(1.2) rotate(2deg);
}

</style>
