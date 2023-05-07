import { defineStore } from 'pinia';
import { SessionStorage } from 'quasar';
import axios from 'src/boot/axios';
import { api, urls } from 'src/boot/axios';
import { useRouter } from 'vue-router';

const router = useRouter();

export const useConcentratesStore = defineStore('concentrates', {
  state: () => ({
    // concentrates: sessionStorage.getItem('concentrates')
    concentrates: null
  }),

  // getters: {
  //   doubleCount (state) {
  //     return state.counter * 2;
  //   }
  // },

  actions: {
    async fetch() {
      const concentrates = await api.get('getallconcentrates',)
      // .then(()=>{console.log('concentrates: '+JSON.stringify(concentrates))})
      console.log('concentrates in store: '+JSON.stringify(concentrates))
      this.concentrates = await concentrates.data
    }
    // increment () {
    //   this.counter++;
    // }
  }
});
