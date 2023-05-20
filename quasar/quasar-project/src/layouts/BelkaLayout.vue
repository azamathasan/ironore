<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <!-- <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Header
        </q-toolbar-title>
      </q-toolbar> -->

      <q-tabs>
        <q-toolbar>
        <!-- <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        /> -->
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
        <!-- <q-route-tab
          icon="close"
          to="/users"
          replace
          label="Exit"
        /> -->
        <q-route-tab
          icon="close"
          @click="logout"
          replace
          label="Exit"
        />
        <!-- <q-route-tab
          icon="map"
          to="/your/route"
          replace
          label="One Tab"
        /> -->
      </q-tabs>
    </q-header>

    <!-- (Optional) The Footer -->
    <!-- <q-footer>
      <q-tabs switch-indicator>
        <q-route-tab
          icon="map"
          to="/your/route"
          replace
          label="One Tab"
        />
        <q-route-tab
          icon="assignment"
          to="/some/other/route"
          replace
          label="Other Tab"
        />
      </q-tabs>

      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
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
  // name: 'LayoutName',

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
