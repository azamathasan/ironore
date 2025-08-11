<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm row">
      <q-btn color="primary" text-color="black" label="Make report" @click="makeReport"/>
      <q-select rounded outlined v-model="month" :options="months" label="Month" style="width: 150px"/>
    </div>
    
    <q-table
      class="q-ma-xl"
      title="Summary report"
      :rows="rowsReport||undefined"
      :columns="columnsReport"
      row-key="name"
    />
    <q-separator />
    <q-table v-if="concentratesStore.concentrates"
      class="q-ma-xl"
      title="Concentrates"
      :rows="concentratesStore.concentrates"
      :columns="columnsc"
      row-key="name"
    />
    <div class="q-gutter-md row rounded-borders q-ma-xl">
      <q-select outlined v-model="concentrateAdd.month" :options="months" label="Month" style="width: 150px"/>
      <q-input outlined v-model="concentrateAdd.ferrum" label="Ferrum" />
      <q-input outlined v-model="concentrateAdd.silicium" label="Silicium" />
      <q-input outlined v-model="concentrateAdd.aluminium" label="Aluminium" />
      <q-input outlined v-model="concentrateAdd.calcium" label="Calcium" />
      <q-input outlined v-model="concentrateAdd.sulfur" label="Sulfur" />
      <q-btn color="primary" text-color="black" label="Add" @click="addConcentrate"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { QTableColumn } from 'quasar'
import { useConcentratesStore } from 'src/stores/concentrates'
import JspreadsheetComponent from 'components/JspreadsheetComponent.vue'
import {  Substances, Concentrate, RowReport, ConcentrateAdd } from 'src/types/interfaces'

export default defineComponent({
  setup(){
    const concentratesStore = useConcentratesStore();
    concentratesStore.fetch()
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
      ]
    
    const columnsc:QTableColumn[] = [
      { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
      {
        name: 'userid',
        required: true,
        label: 'User id',
        align: 'left',
        field: row => row.user_id,
        sortable: true
      },
      { name: 'month', align: 'center', label: 'Month', field: 'month', sortable: true },
      { name: 'ferrum', label: 'Ferrum', field: 'ferrum', sortable: true },
      { name: 'silicium', label: 'Silicium', field: 'silicium' },
      { name: 'aluminium', label: 'Aluminium', field: 'aluminium' },
      { name: 'calcium', label: 'Calcium', field: 'calcium' },
      { name: 'sulfur', label: 'Sulfur', field: 'sulfur', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
    ]
    const rowsc = [
      {
        id:1,
        user_id:61,
        month:'january',
        ferrum:1,
        silicium:2,
        aluminium:3,
        calcium:4,
        sulfur:5
      },
      {
        id:2,
        user_id:61,
        month:'january',
        ferrum:1,
        silicium:2,
        aluminium:3,
        calcium:4,
        sulfur:5
      }
    ]
    
    const columnsReport:QTableColumn[] = [
      { name: 'value', align: 'center', label: 'Value', field: 'value', sortable: true },
      { name: 'ferrum', label: 'Ferrum', field: 'ferrum', sortable: true },
      { name: 'silicium', label: 'Silicium', field: 'silicium' },
      { name: 'aluminium', label: 'Aluminium', field: 'aluminium' },
      { name: 'calcium', label: 'Calcium', field: 'calcium' },
      { name: 'sulfur', label: 'Sulfur', field: 'sulfur', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
    ]

    const month = ref<null|string>(null)
    const rowsReport = ref<undefined|RowReport[]>(undefined)
    const concentrateAdd = ref<ConcentrateAdd>({
      month: null,
      ferrum: undefined,
      silicium: undefined,
      aluminium: undefined,
      calcium: undefined,
      sulfur: undefined
    })

      return {
        months,
        month,
        columnsc,
        rowsc,
        columnsReport,
        rowsReport,
        concentratesStore,
        concentrateAdd,

        makeReport() {
          const reportRowMax:RowReport = {
            value: 'max',
            ferrum: undefined,
            silicium: undefined,
            aluminium: undefined,
            calcium: undefined,
            sulfur: undefined
          }
          const reportRowMin:RowReport = {
            value: 'min',
            ferrum: undefined,
            silicium: undefined,
            aluminium: undefined,
            calcium: undefined,
            sulfur: undefined
          }
          const reportRowAverage:any = {value: 'average'}
          columnsReport.slice(1).forEach((column:QTableColumn, index) => {
            const oreComponent:number[] = (concentratesStore.concentrates! as [])
            .filter((concentrateRow:Concentrate)=>{
              if(concentrateRow.month===month.value){
                return true
              }
              return false
            })
            .map(
              (concentrateRow:Concentrate)=>{
                return concentrateRow[column.name as keyof Concentrate] as number
              }
              );
            reportRowMax[column.name as keyof Substances]=Math.max.apply(null, oreComponent)
            reportRowMin[column.name as keyof Substances]=Math.min.apply(null, oreComponent)
            const sum = oreComponent.reduce((accum, current) => {
              return (accum+current)
            }, 0);
            reportRowAverage[column.name]=(sum/oreComponent.length)
          })
          reportRowMax.value = 'max'
          reportRowMin.value = 'min'
          reportRowAverage.value = 'average'
          rowsReport.value = []
          rowsReport.value.push(...[reportRowMax, reportRowMin, reportRowAverage])
        },

        addConcentrate() {
          concentratesStore.add(concentrateAdd.value)
          .then(()=>{concentratesStore.fetch()})
        }
      }
  }
})
</script>
