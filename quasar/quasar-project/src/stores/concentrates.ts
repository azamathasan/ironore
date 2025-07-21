import { defineStore } from 'pinia';
import { SessionStorage } from 'quasar';
import axios from 'src/boot/axios';
import { api, urls } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import {  Substances, Concentrate, RowReport, ConcentrateAdd } from 'src/types/interfaces'
import { CellValue } from 'jspreadsheet-ce';
import { AxiosRequestConfig } from 'axios';

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
    },
    async add(concentrate:ConcentrateAdd) {
      // const token:string|null =  await api.post('auth/', {username: username, password: password}, {
      const addedConcentrate = await api.post('addconcentrate', concentrate)
      console.log('addedConcentrate: '+JSON.stringify(addedConcentrate))
    },
    async update(concentrates:CellValue[][] | undefined) {
      // const token:string|null =  await api.post('auth/', {username: username, password: password}, {
      const addedConcentrate = await api.post('updateconcentrates', concentrates)
      console.log('addedConcentrate: '+JSON.stringify(addedConcentrate))
    },
    async delete(id:AxiosRequestConfig) {
      console.log('id in delete in store: '+id)
      // const token:string|null =  await api.post('auth/', {username: username, password: password}, {
      const deleteInfo = await api.delete('deleteconcentrate',  {data: { id: id }})
      console.log('deleteInfo: '+JSON.stringify(deleteInfo))
      // console.log('addedConcentrate: '+JSON.stringify(addedConcentrate))
    }
    // increment () {
    //   this.counter++;
    // }
  }
});
