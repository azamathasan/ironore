import { defineStore } from 'pinia';
import { LocalStorage, SessionStorage } from 'quasar';
import { api } from 'src/boot/axios';

export const useUsersStore = defineStore('users', {
  state: () => ({
    user: LocalStorage.getItem('user'),
    users: null
  }),
  actions: {
    async fetchAllUsers() {
      const users = await api.get('getallusers')
      this.users = await users.data
    }
  }
});
