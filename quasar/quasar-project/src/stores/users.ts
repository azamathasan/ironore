import { defineStore } from 'pinia';
import { LocalStorage, SessionStorage } from 'quasar';
import { api } from 'src/boot/axios';

export const useUsersStore = defineStore('users', {
  state: () => ({
    // counter: 0
    // user: (LocalStorage.getItem('user') || {}) as CreateMutable<User>,
    user: LocalStorage.getItem('user'),
    users: null
  }),

  // getters: {
  //   doubleCount (state) {
  //     return state.counter * 2;
  //   }
  // },

  actions: {
    async fetchAllUsers() {
      const users = await api.get('getallusers')
      console.log('all users: '+JSON.stringify(users))
      this.users = await users.data
      console.log('this all users: '+JSON.stringify(this.users))
    }
    // increment () {
    //   this.counter++;
    // }
  }
});
