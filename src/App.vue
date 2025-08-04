<template>
  
  <v-app>

    <template v-if="isLoggedIn&&!isLoginPage">
      
      
    <!-- Sidebar Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="mini"
    
      permanent
      app
      class="sidebar"
      color="primary"
      dark
    >

      <div class="logo-container" v-if="!mini">
        <img src="/logo.png" alt="Logo" class="logo" />
      </div>
       <div v-else class="mini-logo-container">
    <img src="/logo.png" alt="Mini Logo" class="mini-logo" />
  </div>

      <v-list>
        <v-list-item
          v-for="item in userMenuItems"
          :key="item.title"
          :to="item.to"
          link
        >
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon> 
          </template>
          <v-list-item-title v-if="!mini">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

          <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

       <v-select
  v-model="accountStore.selectedAccountId"
  :items="accountStore.accounts"
  item-title="name"
  item-value="id"
  label="Select Account"
  hide-details
  density="compact"
  variant="underlined"
  style="max-width: 200px"
  @update:modelValue="accountStore.selectAccount"
/>

      <v-btn icon @click="toggleTheme">
      <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

      <!-- Account Dropdown -->
      <v-menu location="bottom end">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-account" color="secondary" v-bind="props"></v-btn>
        </template>
        <v-list width="240">
          <v-list-item>
            <v-list-item-title>Sharon Muthui</v-list-item-title>
            <v-list-item-subtitle>Admin</v-list-item-subtitle>
          </v-list-item>

          <v-divider></v-divider>

          <v-divider></v-divider>

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
   
    </template>
  

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script setup>
import { ref,computed, watch} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {useTheme} from 'vuetify'
import { useAccountStore } from '@/stores/account'

const theme = useTheme()

const router = useRouter()
const route = useRoute()

import { onMounted } from 'vue'
const accountStore = useAccountStore()

onMounted(() => {
  accountStore.loadSavedAccount()
})


 const isLoginPage = computed(() => route.name === 'login')

const isLoggedIn = computed(() => {
  return localStorage.getItem('otp_verified') === 'true'
})




const drawer = ref(true) 
const mini = ref(false)  

const user = ref({ firstname: 'Sharon' })

const toggleDrawer = () => {
  mini.value = !mini.value 
}

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const logout = () => {
   localStorage.removeItem('otp_verified')
  console.log('Logging out...')
   router.push({ name: 'login' })
}

const userMenuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
  { title: 'Statements', icon: 'mdi-file-document-outline', to: '/statements' },
  { title: 'Meter', icon: 'mdi-meter-electric', to: '/meter' },
  { title: 'Bills', icon: 'mdi-credit-card', to: '/bills' },
  { title: 'Payments', icon: 'mdi-cash-check', to: '/payments' },
]
const accountOptions = computed(() => accountStore.accounts)


</script>


<style scoped>
.logo-container,
.mini-logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
}

.logo {
  max-height: 60px;
  width: auto;
}
.mini-logo {
  max-height: 30px;
  width: auto;
}

.v-toolbar-title {
  padding-left: 12px;
}

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

