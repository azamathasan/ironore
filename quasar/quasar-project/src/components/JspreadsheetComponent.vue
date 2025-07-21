<template>
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

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ]
const month = ref<null|string>(null)
const concentratesStore = useConcentratesStore();
const columnsReport = [
  {"title":"value","type":"numeric","width":100},
  {"title":"ferrum","type":"numeric","width":100},
  {"title":"silicium","type":"numeric","width":100},
  {"title":"aluminium","type":"numeric","width":100},
  {"title":"calcium","type":"numeric","width":100},
  {"title":"sulfur","type":"numeric","width":100},
    ]
const rowsReport = ref<(string | number)[][]>([])
  
  const props = defineProps({
    options: {
      type: Object,
      require: true,
    },
  });

    const options = props.options ? { ...props.options } : {};
    const sheetEl = ref(null);
    const sheet = ref<JspreadsheetInstance|null>(null)
    const addedRowsNumbers = ref<number>(options.data.length)

    const reportSheetEl = ref(null);
    const reportSheet = ref<JspreadsheetInstance|null>(null)

    onMounted(() => {
      sheet.value = jspreadsheet(sheetEl.value, {
        data: props.options!.data,
        columns: props.options!.columns,
        onbeforedeleterow: deleteRow
      });
      
      
      reportSheet.value = jspreadsheet(reportSheetEl.value, {
        data: rowsReport.value,
        columns: columnsReport,
      });
    })

    function addRow(){
      sheet.value?.insertRow();
      addedRowsNumbers.value++;
      const lastRow = sheet.value?.getRowData(options.data.length-1)
      const lastAddedRow = sheet.value?.getRowData(addedRowsNumbers.value-1)
      const allData = sheet.value?.getData()
    }

    function deleteRow(el:HTMLElement, rowNumber:number, numOfRows:number, rowDOMElements:[], rowData:any, cellAttributes:[]){
      const allData = sheet.value?.getData()
      

      concentratesStore.delete(allData![rowNumber][0] as AxiosRequestConfig)
      .then(()=>{
        concentratesStore.fetch()
      })
    }

    function save(){
      const allData = sheet.value?.getData()
      concentratesStore.update(allData)
      .then((response)=>{
        concentratesStore.fetch()
      })
    }


    function makeReport(){
      const allData = sheet.value?.getData()
      let reportDataLength = 0

      const reportRowMax:((string | number)[]) = ['max',0,0,0,0,0]
      const reportRowMin = ['min',null,null,null,null,null]
      const reportRowAverage = ['average',0,0,0,0,0]
      const sum = [0,0,0,0,0]

      const sumComponents = []


      allData?.forEach((row)=>{
        if(row[2]===month.value){
          reportDataLength++;
          row.slice(3).forEach((item,index)=>{
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
         reportRowAverage[sumIndex+1]=sumItem/reportDataLength
      })

      rowsReport.value=[]
      rowsReport.value.push(reportRowMax, reportRowMin, reportRowAverage)
      reportSheet.value.setData(rowsReport.value)
    }

</script>
