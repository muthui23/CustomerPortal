<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="toggleRail"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-menu location="bottom end">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-account" v-bind="props"></v-btn>
        </template>
        <v-list width="200">
          <v-list-item>
            <v-list-item-title>Sharon Muthui</v-list-item-title>
            <v-list-item-subtitle>Admin</v-list-item-subtitle>
          </v-list-item>
          <v-card-actions class="justify-end">
            <v-btn
              variant="text"
              color="error"
              prepend-icon="mdi-logout"
              @click="logout"
            >
              Log out
            </v-btn>
          </v-card-actions>
        </v-list>
      </v-menu>
    </v-app-bar>
    
    <v-navigation-drawer 
      v-model="drawer"
      permanent
      :rail="rail"  
  
    >
      <v-list>
        <v-list-item
          v-for="item in userMenuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.to"
          :to="item.to"
        >
          <template v-slot:append v-if="item.badge && rail">
            <v-badge :content="item.badge" color="error"></v-badge>
          </template>
        </v-list-item>
      </v-list>
      
      
      <!-- <template v-slot:append>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-chevron-left"
          title="Collapse"
          @click.stop="rail = !rail"
        ></v-list-item>
      </template> -->
    </v-navigation-drawer>
    
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(false)  // Controls mini variant


const userMenuItems = [
  { title: 'Statements', icon: 'mdi-file-document-outline', to: '/statements' },
  { title: 'Meter', icon: 'mdi-meter-electric', to: '/meter', badge: 3 },
  { title: 'Bills', icon: 'mdi-credit-card', to: '/bills' },
  { title: 'Payments', icon: 'mdi-cash-check', to: '/payments' },
]

const logout = () => {
  console.log('Logging out...')
}
</script>

<style scoped>

.v-navigation-drawer--rail {
  width: 56px !important;
  overflow: hidden;
}

.v-navigation-drawer--rail .v-list-item {
  padding-left: 12px !important;
}

.v-navigation-drawer--rail .v-list-item__prepend {
  margin-right: 0;
}

.v-list-item--active {
  background-color: rgba(25, 118, 210, 0.1);
  border-left: 3px solid rgb(25, 118, 210);
}
</style>

<!-- <template>
  <v-app>
    <div class="app-container">
      <v-navigation-drawer permanent width="240" class="left-nav">
        <template #prepend>
          <v-list-item title="PORTAL" prepend-icon="mdi-application"></v-list-item>
          <v-divider></v-divider>
        </template>
        <v-list>
          <v-list-item
            v-for="item in navItems"
            :key="item.route"
            :to="item.route"
            :prepend-icon="item.icon"
            :title="item.text"
            active-class="active-nav-item"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="main-content">
        <router-view></router-view>
      </v-main>
    </div>
  </v-app>
</template>

<script setup>
const navItems = [
  { text: 'Statements', icon: ' mdi-file-document-outline', route: '/statements' },
  { text: 'Meter', icon: 'mdi-meter-electric ', route: '/meter', badge: 3 },
  { text: 'Bills', icon: 'mdi-credit-card', route: '/bills' },
  { text: 'Payments', icon: 'mdi-cash-check', route: '/payments' },
]
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.left-nav {
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
  position: fixed;
}

.main-content {
  margin-left: 240px;
  padding: 20px;
}
.active-nav-item {
  background-color: #e3f2fd;
  color: #1976d2;
  border-left: 4px solid #1976d2;
}

.v-list {
  padding: 0;
}
</style> -->
