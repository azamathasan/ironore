<template>
  <!-- <div>**********************************************************</div> -->
  <!-- <JspreadsheetComponent :options="Options"></JspreadsheetComponent>
  <div>***********************************************************</div>
  <JspreadsheetComponent :options="jexceloptions"></JspreadsheetComponent>
  <div>***********************************************************</div>
  <JspreadsheetComponent v-if="renderFlag" :options="tableOptions"></JspreadsheetComponent>
  <div>***********************************************************</div>
  <JspreadsheetComponent v-if="tableOptions.data!==null" :options="tableOptions"></JspreadsheetComponent>
  <div>***********************************************************</div>
  <JspreadsheetComponent v-if="concentratesStore.concentrates" :options="tableOptions!"></JspreadsheetComponent>
  <div>***********************************************************</div> -->
  <JspreadsheetComponent v-if="tableOptions" :options="tableOptions!"></JspreadsheetComponent>
  <!-- <div>***********************************************************</div> -->
</template>
 
<script lang="ts">
import jspreadsheet from "jspreadsheet-ce";
import { defineAsyncComponent, defineComponent, markRaw, ref } from 'vue' 

import JspreadsheetComponent from "components/JspreadsheetComponent.vue";
import { QTableColumn } from "quasar";
import { useConcentratesStore } from "src/stores/concentrates"; 
import { table } from "console";
 
  // components: {
  //   // JspreadsheetComponent,
  // },
  export default defineComponent({
    setup() {
      const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
      ]
      const columnsc = [
        { title: "ID", type: "numeric", width: 100 },
        { title: "User id", type: "numeric", width: 100 },
        { title: "Month", type: "dropdown", width: 100, source: months },
        { title: "Ferrum", type: "numeric", width: 100 },
        { title: "Silicium", type: "numeric", width: 100 },
        { title: "Aluminium", type: "numeric", width: 100 },
        { title: "Calcium", type: "numeric", width: 100 },
        { title: "Sulfur", type: "numeric", width: 100 } 
      ]
      const tableOptions = ref<object|null>(null)
      // const renderFlag = ref<string|null>(null)
      // const renderFlag = ref<null|object>(null)
      const renderFlag = ref<boolean|null>(null)
      const concentratesStore = useConcentratesStore();
      concentratesStore.fetch()
      .then(()=>{
        console.log('concentratesStore.concentrates: '+JSON.stringify(concentratesStore.concentrates))
        // renderFlag.value = '1'
        // tab.value = markRaw(comp)
        // renderFlag.value = markRaw(concentratesStore)
        // renderFlag.value=true
        tableOptions.value = {
          data: concentratesStore.concentrates,
          columns: columnsc
        }
        console.log('tableOptions.value: '+JSON.stringify(tableOptions.value)) 
      })

      // const columnsc:QTableColumn[] = [
      //   { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
      //   {
      //     name: 'userid',
      //     required: true,
      //     label: 'User id',
      //     align: 'left',
      //     field: row => row.user_id,
      //     // format: val => `${val}`,
      //     sortable: true
      //   },
      //   { name: 'month', align: 'center', label: 'Month', field: 'month', sortable: true },
      //   { name: 'ferrum', label: 'Ferrum', field: 'ferrum', sortable: true },
      //   { name: 'silicium', label: 'Silicium', field: 'silicium' },
      //   { name: 'aluminium', label: 'Aluminium', field: 'aluminium' },
      //   { name: 'calcium', label: 'Calcium', field: 'calcium' },
      //   { name: 'sulfur', label: 'Sulfur', field: 'sulfur', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      //   // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      // ]
        const Options = {
            worksheets: [
                {
                    search: true,
                    data: [
                        [42, 42, 42, 42],
                        [42, 42, 42, 42],
                    ],
                    columns: [
                        { title: "First Column", width: 100 },
                        { title: "Second Column", width: 150 },
                        { title: "Third Column", width: 200 },
                        { title: "Fourth Column", width: 250 },
                    ],
                },
            ],
            license: "ZmQ4NWYyYjVmYTBjMDQwMDA3NjUwZjUwNTA4MDkwYWYzNWQ4OWE3MjQyZjJiZDU1YzM1MjA4OTI5OTEwZDlkMTNiMThkNzQ3YzNjZWI2ZGNjM2MyZGIwNDBmMzZmYzQwYWU1Y2EwOTEyMGE4MzU2M2Q2MjMzMTQ2MTUwNWEzOTIsZXlKdVlXMWxJam9pY0dGMWJDNW9iMlJsYkNJc0ltUmhkR1VpT2pFMk5qQTFNVGd3TURBc0ltUnZiV0ZwYmlJNld5SnFjMmhsYkd3dWJtVjBJaXdpYW5Od2NtVmhaSE5vWldWMExtTnZiU0lzSW1OellpNWhjSEFpTENKMVpTNWpiMjB1WW5JaUxDSjFibWwwWldRdVpXUjFZMkYwYVc5dUlpd2liRzlqWVd4b2IzTjBJbDBzSW5Cc1lXNGlPaUl6SWl3aWMyTnZjR1VpT2xzaWRqY2lMQ0oyT0NJc0luQmhjbk5sY2lJc0luTm9aV1YwY3lJc0ltWnZjbTF6SWl3aWNtVnVaR1Z5SWl3aVptOXliWFZzWVNKZGZRPT0=",
        }

        // const tableOptions = ref({
        //   data: concentratesStore.concentrates,
        //   columns: columnsc
        // })
        // const tableOptions = ref<object|null>(null)
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

        return { 
          Options,
          jexceloptions,
          tableOptions,
          concentratesStore,
          renderFlag
        };
    },
  //   components: {
  //   AsyncComponent: defineAsyncComponent(() =>
  //     import('./components/AsyncComponent.vue')
  //   )
  // }
    components: { 
      JspreadsheetComponent 
      // JspreadsheetComponent: defineAsyncComponent(() => import('components/JspreadsheetComponent.vue'))
    }
})
</script>

<!-- <template>
  <q-page padding>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  // name: 'PageName'
})
</script> -->
