<template>
  <q-page padding>
    <!-- <q-table
      title="Table Title"
      :rows="tableData"
      :columns="columns"
      row-key="name"
    /> -->
    <!-- <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
    /> -->
    <div class="q-pa-md q-gutter-sm row">
      <q-btn color="primary" text-color="black" label="Make report" @click="makeReport"/>
      <q-select rounded outlined v-model="month" :options="months" label="Month" style="width: 150px"/>
    </div>
    
    <q-table
      title="Summary report"
      :rows="reportRows||undefined"
      :columns="columnsReport"
      row-key="name"
    />
    <div>************************************</div>
    <q-table
      title="Concentrates"
      :rows="rowsc"
      :columns="columnsc"
      row-key="name"
    />
    <div>************************************</div>
    <!-- <div ref="sheetEl" /> -->
    <!-- <JspreadsheetComponent :options="sheetOptions" /> -->
    <JspreadsheetComponent :options="sheetOptions"></JspreadsheetComponent>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { QTableColumn } from 'quasar'
import { useConcentratesStore } from 'src/stores/concentrates'
import { Interface } from 'readline';
// import jspreadsheet from "jspreadsheet";

import jspreadsheet from "jspreadsheet-ce"
// import "jspreadsheet/dist/jspreadsheet.css";
// import "jsuites/dist/jsuites.css";
import JspreadsheetComponent from 'components/JspreadsheetComponent.vue';

export default defineComponent({
  // mounted(){
  //   console.log('mounted')
  //   concentratesStore.fetch()
  //   // console.log('concentrates: '+JSON.stringify(concentratesStore.concentrates))
  // },
  // created(){},
  setup () {
    const concentratesStore = useConcentratesStore();
    concentratesStore.fetch()
    console.log('concentratesStore.concentrates in setup: '+JSON.stringify(concentratesStore.concentrates))
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
      ]
    const columns:QTableColumn[] = [
      {
        name: 'name',
        required: true,
        label: 'Dessert (100g serving)',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
      { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
      { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
      { name: 'protein', label: 'Protein (g)', field: 'protein' },
      { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
      { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
    ]
    const columnsc:QTableColumn[] = [
      { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
      {
        name: 'userid',
        required: true,
        label: 'User id',
        align: 'left',
        field: row => row.user_id,
        // format: val => `${val}`,
        sortable: true
      },
      { name: 'month', align: 'center', label: 'Month', field: 'month', sortable: true },
      { name: 'ferrum', label: 'Ferrum', field: 'ferrum', sortable: true },
      { name: 'silicium', label: 'Silicium', field: 'silicium' },
      { name: 'aluminium', label: 'Aluminium', field: 'aluminium' },
      { name: 'calcium', label: 'Calcium', field: 'calcium' },
      { name: 'sulfur', label: 'Sulfur', field: 'sulfur', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
    ]
    const columnsReport:QTableColumn[] = [
      { name: 'value', align: 'center', label: 'Value', field: 'value', sortable: true },
      { name: 'ferrum', label: 'Ferrum', field: 'ferrum', sortable: true },
      { name: 'silicium', label: 'Silicium', field: 'silicium' },
      { name: 'aluminium', label: 'Aluminium', field: 'aluminium' },
      { name: 'calcium', label: 'Calcium', field: 'calcium' },
      { name: 'sulfur', label: 'Sulfur', field: 'sulfur', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
    ]
    // const reportRows = [{}]
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
    const rows = [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: '8%',
        iron: '1%'
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: '6%',
        iron: '7%'
      }
    ]

    

    // interface Column {
    //   name: string|null,
    //   align: string|null,
    //   label: string|null,
    //   field: string|null,
    //   sortable: boolean|null
    // }
    // interface Concentrate {
    //   id: number|undefined,
    //   user_id: number|undefined,
    //   month: string|null,
    //   ferrum: number|undefined,
    //   silicium: number|undefined,
    //   aluminium: number|undefined,
    //   calcium: number|undefined,
    //   sulfur: number|undefined
    // }

    // interface ReportRows
    // {
    //   value: string|null,
    //   ferrum: number|undefined,
    //   silicium: number|undefined,
    //   aluminium: number|undefined,
    //   calcium: number|undefined,
    //   sulfur: number|undefined
    // } 


      /*****************/
     /* ts interfaces */
    /*****************/
    // interface QTableColumn {} // embeded columns type

    interface Substances {
        ferrum: number|undefined,
        silicium: number|undefined,
        aluminium: number|undefined,
        calcium: number|undefined,
        sulfur: number|undefined
    }

    interface Concentrate extends Substances {
        id: number|undefined,
        user_id: number|undefined,
        month: string|null,
    }
    
    // interface AddConcentrate extends Substances {
    //     month: string|null,
    // }
    interface AddConcentrate extends Substances {
        month: string|null,
        ferrum: number|undefined,
        silicium: number|undefined,
        aluminium: number|undefined,
        calcium: number|undefined,
        sulfur: number|undefined
    }

    interface ReportRow extends Substances {
        value: string|null // max, min, average
    }
      /*********************/
     /* END ts interfaces */
    /*********************/


    
    const month = ref<null|string>(null)
    // const reportRows = ref<null|[]>(null)
    // const reportRows = ref<null|[{}]>(null)
    // const reportRows = ref<[null]|[ReportRow]>([null])
    // const reportRows = ref<[null]|[ReportRow]>([null])
    // const reportRows = ref<[null]|ReportRow[]>([null])
    const reportRows = ref<undefined|ReportRow[]>(undefined)

    const addConcentrate = ref([])

    // const sheetEl = ref<HTMLDivElement|HTMLTableElement|null>(null);

    // onMounted(() => {
    //   jspreadsheet(sheetEl.value as HTMLDivElement, sheetOptions);
    // });


    const sheetOptions = {
      data: addConcentrate/* [
        [
          "Jazz123",
          "Honda123",
          "2019-02-12",
          'imageExample',
          true,
          "$ 2.000,00",
          "#777700"
        ],
        ["Civic123", "Honda123", "2018-07-11", "", true, "$ 4.000,01", "#007777"],
        ["Z4", "BMW", "2017-11-24", "", false, "$ 324.072,58", "#700d0d"],
        [
          "Boxter S123",
          "Porshe123",
          "2019-08-24",
          "",
          true,
          "$ 307.839,45",
          "#0e0438"
        ]
      ] */,
      columns: [
          // { type: "text", title: "User", width: "120px" },
          {
            type: "dropdown",
            title: "Month",
            width: "250px",
            // source: ["Alfa Romeo", "Audi", "BMW", "Honda", "Porshe"]
            source: months
          },
          { type: "number", title: "Ferrum", width: "50" },
          { type: "number", title: "Silicium", width: "50" },
          { type: "number", title: "Aluminium", width: "50" },
          { type: "number", title: "Calcium", width: "50" },
          { type: "number", title: "Sulfur", width: "50" },
          // { type: "checkbox", title: "Stock", width: "80px" },
          // {
          //   type: "numeric",
          //   title: "Price",
          //   width: "120px",
          //   mask: "$ #.##,00",
          //   decimal: ","
          // },
          // { type: "color", width: "100px", render: "square" }
      ]
      // columns: [
      //     { type: "text", title: "Car", width: "120px" },
      //     {
      //       type: "dropdown",
      //       title: "Make",
      //       width: "250px",
      //       source: ["Alfa Romeo", "Audi", "BMW", "Honda", "Porshe"]
      //     },
      //     { type: "calendar", title: "Available", width: "250px" },
      //     { type: "image", title: "Photo", width: "120px" },
      //     { type: "checkbox", title: "Stock", width: "80px" },
      //     {
      //       type: "numeric",
      //       title: "Price",
      //       width: "120px",
      //       mask: "$ #.##,00",
      //       decimal: ","
      //     },
      //     { type: "color", width: "100px", render: "square" }
      // ]
    }

    

    return {
      months,
      month,

      
      // { name: 'values', align: 'center', label: 'Values', field: 'values', sortable: true },
      // { name: 'ferrum', label: 'Ferrum', field: 'ferrum', sortable: true },
      // { name: 'cilicium', label: 'Cilicium', field: 'cilicium' },
      // { name: 'aluminium', label: 'Aluminium', field: 'aluminium' },
      // { name: 'calcium', label: 'Calcium', field: 'calcium' },
      // { name: 'sulfur', label: 'Sulfur', field: 'sulfur', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }

      columns,
      columnsc,
      rows,
      rowsc,
      concentratesStore,
      reportRows,
      columnsReport,

      // sheetEl,
      sheetOptions,

      addConcentrate,

      makeReport() {
        console.log('makeReport')
        console.log('month: '+month.value)

        // const reportRowMax:ReportRows
        // const reportRowMax = {} as const
        // const reportRowMax:ReportRows = {value: 'max'}
        // const reportRowMax:ReportRow = {
        const reportRowMax:ReportRow = {
          value: 'max',
          ferrum: undefined,
          silicium: undefined,
          aluminium: undefined,
          calcium: undefined,
          sulfur: undefined
        }
        const reportRowMin:ReportRow = {
          value: 'min',
          ferrum: undefined,
          silicium: undefined,
          aluminium: undefined,
          calcium: undefined,
          sulfur: undefined
        }
        const reportRowAverage:any = {value: 'average'}
        // Math.max(...array.map(o => o.y))
        // reportRows.value = columnsReport.map((column, index)=>{if()})
        columnsReport.slice(1).forEach((column:QTableColumn, index) => {
          // const component = reportRows.value!.map()
          // console.log('concentratesStore.concentrates: '+JSON.stringify(concentratesStore.concentrates))
          const oreComponent:number[] = (concentratesStore.concentrates! as []).map(
            (concentrateRow:Concentrate)=>{
              // return concentrateRow[column.name]
              /* console.log('column: '+JSON.stringify(column))
              console.log('column.name: '+JSON.stringify(column.name))
              console.log('concentrateRow JSON: '+JSON.stringify(concentrateRow))
              console.log('concentrateRow[column.name]: '+concentrateRow[column.name]) */
              // return concentrateRow[column.name as keyof typeof Object]
              
              // if(typeof concentrateRow[column.name as keyof Concentrate] == "number")
              return concentrateRow[column.name as keyof Concentrate] as number
            }
            );
          console.log('oreComponent: '+JSON.stringify(oreComponent));

          // reportRows={[]}
          // const max = Math.max.apply(null, numbers);
          // reportRowMax[column.name]=Math.max(...oreComponent.map(o))
          // reportRowMax[column.name]=Math.max.apply(null, oreComponent)


          // if(reportRowMax) reportRowMax ={}

          reportRowMax[column.name as keyof Substances]=Math.max.apply(null, oreComponent)
          reportRowMin[column.name as keyof Substances]=Math.max.apply(null, oreComponent)
          // reportRowMin[column.name]=Math.min.apply(null, oreComponent)
          const sum = oreComponent.reduce((accum, current) => {
            return (accum+current)
          }, 0);
          reportRowAverage[column.name]=(sum/oreComponent.length)
          
          // console.log('reportRowMax: '+JSON.stringify(reportRowMax))
          // console.log('reportRowMin: '+JSON.stringify(reportRowMin))
          // console.log('reportRowMean: '+JSON.stringify(reportRowAverage))

          // reportRows.value = []
          // reportRows.value[0][column.name] = 'Max (oreComponent)'
          // reportRows[1][column.name] = Min (oreComponent)
          // reportRows[2][column.name] = Average (oreComponent)
        })

        reportRowMax.value = 'max'
        reportRowMin.value = 'min'
        reportRowAverage.value = 'average'

        console.log('reportRowMax: '+JSON.stringify(reportRowMax))
        console.log('reportRowMin: '+JSON.stringify(reportRowMin))
        console.log('reportRowMean: '+JSON.stringify(reportRowAverage))

        // reportRows.value?.push(reportRowMax, reportRowMin)
        // if(!reportRows.value[0]) reportRows.value.push({} as ReportRow)
        reportRows.value = []
        reportRows.value.push(...[reportRowMax, reportRowMin, reportRowAverage])

        console.log('reportRows: '+JSON.stringify(reportRows.value))
        // reportRows.value.push(reportRowMin, reportRowAverage)

        // Object.assign(reportRows.value[0], )
      }
      
    }
  },
  components: { JspreadsheetComponent }

  
})
</script>
