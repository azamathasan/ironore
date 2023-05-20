<template>
  <!-- <link rel="stylesheet" href="https://jspreadsheet.com/v8/jspreadsheet.css" type="text/css" />
  <link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" /> -->
  <!-- <style>
    @import 'https://jsuites.net/v4/jsuites.css';
  </style> -->
  <!-- @import 'https://jspreadsheet.com/v8/jspreadsheet.css' -->
  <!-- <div>JspreadsheetComponent  </div> -->
  <h6 class="text-center">Report</h6>
  <div class="q-ma-xl">
    <div class="row">
      <q-btn class="q-ma-sm" color="primary" text-color="black" label="Make report" @click="makeReport"/>
      <q-select rounded outlined v-model="month" :options="months" label="Month" style="width: 150px"/>
    </div>
    <div ref="reportSheetEl" />
  </div>
  <q-separator />
  <h6 class="text-center">Concentrates</h6>
  <div class="q-ma-xl">
    <div class="row">
      <q-btn class="q-ma-sm" color="primary" text-color="black" label="Save" @click="save"/>
    </div>
    <div ref="sheetEl" />
    <div class="row">
      <q-btn class="q-ma-sm" color="primary" text-color="black" label="Add row" @click="addRow"/>
    </div>
  </div>
  
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import jspreadsheet, { JspreadsheetInstance, JspreadsheetInstanceElement } from "jspreadsheet-ce";
// require('https://jsuites.net/v4/jsuites.css')
// require('https://jspreadsheet.com/v8/jspreadsheet.css')
// import 'https://jspreadsheet.com/v8/jspreadsheet.css'
// import 'https://jsuites.net/v4/jsuites.css';

  /**************************************************/
 /* jspreadsheet/jexcel css (excel for js-frontend)*/
/**************************************************/
import 'assets/css/jspreadsheet.css'
import 'assets/css/jsuites.css';
import 'assets/css/jexcel.css';
import { useConcentratesStore } from "src/stores/concentrates";
import { AxiosRequestConfig, all } from "axios";
import { RowReport } from "src/types/interfaces";
  /******************************************************/
 /* END jspreadsheet/jexcel css (excel for js-frontend)*/
/******************************************************/



// import "jspreadsheet/dist/jspreadsheet.css";
// import "jsuites/dist/jsuites.css";
// import "https://jsuites.net/v4/jsuites.css";
// import "https://jspreadsheet.com/v8/jspreadsheet.css";

  // name: "Jspreadsheet",
  // interface Props {
  //   options: {
  //     type: any,
  //     require: true,
  //   },
  // }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ]
const month = ref<null|string>(null)
const concentratesStore = useConcentratesStore();
// concentratesStore.fetch();
// console.log('concentratesStore.concentrates: '+JSON.stringify(concentratesStore.concentrates))

const columnsReport = [
  // {"title":"Ferrum","type":"numeric","width":100}
  {"title":"value","type":"numeric","width":100},
  {"title":"ferrum","type":"numeric","width":100},
  {"title":"silicium","type":"numeric","width":100},
  {"title":"aluminium","type":"numeric","width":100},
  {"title":"calcium","type":"numeric","width":100},
  {"title":"sulfur","type":"numeric","width":100},
  // { name: 'sulfur', label: 'Sulfur', field: 'sulfur', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
    ]
// const rowsReport = ref<(string | number)[][]>([])
const rowsReport = ref<(string | number)[][]>([])

const jexceloptions = {
  data: [
    [
      "Jazz1",
      "Honda2",
      "2019-02-12",
      'imageExample',
      true,
      "$ 2.000,00",
      "#777700"
    ],
    ["Civic3", "Honda4", "2018-07-11", "", true, "$ 4.000,01", "#007777"],
    ["Z4", "BMW", "2017-11-24", "", false, "$ 324.072,58", "#700d0d"],
    [
      "Boxter S",
      "Porshe",
      "2019-08-24",
      "",
      true,
      "$ 307.839,45",
      "#0e0438"
    ]
  ],
  columns: [
    { type: "text", title: "Car", width: "120px" },
    {
      type: "dropdown",
      title: "Make",
      width: "250px",
      source: ["Alfa Romeo", "Audi", "BMW", "Honda", "Porshe"]
    },
    { type: "calendar", title: "Available", width: "250px" },
    { type: "image", title: "Photo", width: "120px" },
    { type: "checkbox", title: "Stock", width: "80px" },
    {
      type: "numeric",
      title: "Price",
      width: "120px",
      mask: "$ #.##,00",
      decimal: ","
    },
    { type: "color", width: "100px", render: "square" }
  ]
}


  
  const props = defineProps({
    options: {
      type: Object,
      require: true,
    },
  });

    // const options = props.options ? { ...props.options } : {};
    // const options = withDefaults(defineProps<Props>(), {
    //   props.options ? { ...props.options } : {};
    // }
    // const props = withDefaults(defineProps<Props>(), {
    //   options: () => {},
    // });
    const options = props.options ? { ...props.options } : {};
    // const options = props.options
    const sheetEl = ref(null);
    const sheet = ref<JspreadsheetInstance|null>(null)
    const addedRowsNumbers = ref<number>(options.data.length)

    const reportSheetEl = ref(null);
    const reportSheet = ref<JspreadsheetInstance|null>(null)

    onMounted(() => {
      console.log('*onmounted*')
      console.log('props.options: '+JSON.stringify(props.options))
      // jspreadsheet(sheetEl.value, props.options);
      // sheet.value = jspreadsheet(sheetEl.value, jexceloptions);
      sheet.value = jspreadsheet(sheetEl.value, {
        data: props.options!.data,
        columns: props.options!.columns,
        // ondeleterow: deleteRow
        onbeforedeleterow: deleteRow
      });
      
      
      reportSheet.value = jspreadsheet(reportSheetEl.value, {
        data: rowsReport.value,
        columns: columnsReport,
        // ondeleterow: deleteRow
        // onbeforedeleterow: deleteRow
      });
      // jspreadsheet(sheetEl.value, props.options);
    })

    function addRow(){
      // sheet.value?.insertRow
      // sheet?.insertRow
      sheet.value?.insertRow();
      console.log('row added')
      

      addedRowsNumbers.value++;
      console.log('addedRowsNumbers: '+addedRowsNumbers.value)
      
      const lastRow = sheet.value?.getRowData(options.data.length-1)
      console.log('lastRow: '+JSON.stringify(lastRow))
      
      const lastAddedRow = sheet.value?.getRowData(addedRowsNumbers.value-1)
      console.log('lastAddedRow: '+JSON.stringify(lastAddedRow))
      
      const allData = sheet.value?.getData()
      console.log('allData: '+JSON.stringify(allData))

      // const getJsonData = sheet.value?.getJson(true)  // Get only highlighted cells
      // console.log('getJsonData: '+JSON.stringify(getJsonData))

    }

    // function deleteRow(el:any, rowNumber:any, numOfRows: any, rowDOMElements: any, rowData: any){
    function deleteRow(el:HTMLElement, rowNumber:number, numOfRows:number, rowDOMElements:[], rowData:any, cellAttributes:[]){
      // console.log('instance: '+JSON.stringify(instance))
      // console.log('el: '+el)
      console.log('deleteRow')
      console.log('rowNumber: '+rowNumber)
      const allData = sheet.value?.getData()
      
      // console.log('allData![rowNumber-1]: '+allData![rowNumber-1])
      // console.log('allData![rowNumber]: '+allData![rowNumber])
      // console.log('allData![rowNumber+1]: '+allData![rowNumber+1])
      // const id = allData![rowNumber-1] as AxiosRequestConfig;
      // console.log('rowDOMElements: '+JSON.stringify(rowDOMElements))
      // console.log('rowData: '+rowData)
      

      concentratesStore.delete(allData![rowNumber][0] as AxiosRequestConfig)
      .then(()=>{
        concentratesStore.fetch()
      })
    }

    function save(){
      const allData = sheet.value?.getData()
      console.log('allData: '+JSON.stringify(allData))

      // const concentratesStore = useConcentratesStore();
      concentratesStore.update(allData)
      .then((response)=>{
        console.log('response: '+response)
        concentratesStore.fetch()
        // console.log('concentratesStore.concentrates: '+JSON.stringify(concentratesStore.concentrates))
        // tableOptions.value = {
        //   data: concentratesStore.concentrates,
        //   columns: columnsc
        // }
        // console.log('tableOptions.value: '+JSON.stringify(tableOptions.value)) 
      })
    }
    // return { sheetEl };


    function makeReport(){
      console.log('selected month: '+month.value)
      const allData = sheet.value?.getData()
      const allDataLength = (allData?.length)?allData.length:1
      console.log('allData: '+JSON.stringify(allData))

      const reportRowMax:((string | number)[]) = ['max',0,0,0,0,0]
      // const reportRowMax:RowReport =
      // {
      //   value: 'max',
      //   ferrum: undefined,
      //   silicium: undefined,
      //   aluminium: undefined,
      //   calcium: undefined,
      //   sulfur: undefined
      // }
      const reportRowMin = ['min',null,null,null,null,null]
      // const reportRowMin:RowReport = {
      //   value: 'min',
      //   ferrum: undefined,
      //   silicium: undefined,
      //   aluminium: undefined,
      //   calcium: undefined,
      //   sulfur: undefined
      // }
      const reportRowAverage = ['average',0,0,0,0,0]
      // const reportRowAverage:RowReport = {
      //   value: 'average',
      //   ferrum: undefined,
      //   silicium: undefined,
      //   aluminium: undefined,
      //   calcium: undefined,
      //   sulfur: undefined
      // }
      // const sum = ['sum',0,0,0,0,0]
      const sum = [0,0,0,0,0]

      const sumComponents = []

      // columnsReport.slice(1).forEach((currentColumn, index)=>{})

      allData?.forEach((row)=>{
        // row.slice(3).forEach((oreComponent)=>{
          // row.slice(3).map((item,index)=>{})
        // console.log('row[2] - month: '+row[2])
        if(row[2]===month.value){
          row.slice(3).forEach((item,index)=>{
            console.log('item: '+item)
            console.log('reportRowMax[index]: '+reportRowMax[index])
            console.log('index: '+index)
            if((item)>reportRowMax[index+1]){
              reportRowMax[index+1]=+item
            } 
            if(item<reportRowMin[index+1]||reportRowMin[index+1]===null){
              reportRowMin[index+1]=+item
            }
            sum[index]=sum[index]+Number(item)
          })
        }
        
      })
      sum.forEach((sumItem, sumIndex)=>{
         reportRowAverage[sumIndex+1]=sumItem/allDataLength
      })

      rowsReport.value=[]
      rowsReport.value.push(reportRowMax, reportRowMin, reportRowAverage)
      console.log('rowsReport: '+JSON.stringify(rowsReport.value))
      // })

      // const concentratesStore = useConcentratesStore();
      // concentratesStore.update(allData)
      // .then((response)=>{
      //   console.log('response: '+response)
      //   concentratesStore.fetch()
      // })

      // myTable.setData([json]);
      reportSheet.value.setData(rowsReport.value)
    }

</script>

<!-- <template>
  <div>My component</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  // name: 'ComponentName'
})
</script> -->
