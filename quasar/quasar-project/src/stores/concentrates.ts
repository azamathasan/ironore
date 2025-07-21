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
    concentrates: null
  }),
  actions: {
    async fetch() {
      const concentrates = await api.get('getallconcentrates',)
      this.concentrates = await concentrates.data
    },
    async add(concentrate:ConcentrateAdd) {
      const addedConcentrate = await api.post('addconcentrate', concentrate)
    },
    async update(concentrates:CellValue[][] | undefined) {
      const addedConcentrate = await api.post('updateconcentrates', concentrates)
    },
    async delete(id:AxiosRequestConfig) {
      const deleteInfo = await api.delete('deleteconcentrate',  {data: { id: id }})
    }
  }
});
