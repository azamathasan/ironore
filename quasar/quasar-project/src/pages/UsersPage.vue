<template>
  <q-page padding>
    <div><h5>Users</h5></div>
    <!-- <q-table
      title="Summary report"
      :rows="rowsReport||undefined"
      :columns="columnsReport"
      row-key="name"
    /> -->
    
    <!-- <div>{{ usersStore.users }}</div> -->

    <table>
      <tr>
        <th>Username</th>
        <th>Firstname</th>
      </tr>
      <tr v-for="user in usersStore.users" :key="user.id">
        <td style="">{{ user.username }}</td>
        <td style="">{{ user.firstname }}</td>
      </tr>
    </table>
    
    <!-- <li v-for="item in items">
      {{ item.message }}
    </li> -->

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUsersStore } from 'src/stores/users'
export default defineComponent({
  // name: 'PageName'
  setup(){
    const usersStore = useUsersStore()
    usersStore.fetchAllUsers()
    console.log('allUsers: '+JSON.stringify(usersStore.users))
    return {
      usersStore
    }
  }
})
</script>
<style>
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
</style>
