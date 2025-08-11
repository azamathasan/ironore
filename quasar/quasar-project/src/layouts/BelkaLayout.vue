<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-tabs>
        <q-toolbar>
        <q-toolbar-title>
          Header
        </q-toolbar-title>
      </q-toolbar>
        <q-route-tab
          icon="home"
          to="/index"
          replace
          label="Home"
        />
        <q-route-tab
          icon="person"
          to="/users"
          replace
          label="Users"
        />
        <q-route-tab
          icon="assignment"
          to="/tablemode"
          replace
          label="Table mode"
        />
        <q-route-tab
          icon="table"
          to="/excelmode"
          replace
          label="Excel mode"
        />
        <q-route-tab
          icon="close"
          @click="logout"
          replace
          label="Exit"
        />
      </q-tabs>
    </q-header>
    <q-drawer
      v-model="leftDrawer"
      side="left"
      bordered
      content-class="bg-grey-2"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { useAuthStore } from 'src/stores/auth'
import { defineComponent, ref } from 'vue'
export default defineComponent({

  setup() {
    const authStore = useAuthStore()
    const leftDrawer = ref(false)
    async function logout() {
      authStore.logout()
    }
    return { leftDrawer, logout }
  }
})
</script>
