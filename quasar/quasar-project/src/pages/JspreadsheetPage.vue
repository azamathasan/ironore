<template>
  <JspreadsheetComponent v-if="tableOptions" :options="tableOptions!"></JspreadsheetComponent>
</template>
 
<script lang="ts">
import jspreadsheet from "jspreadsheet-ce";
import { defineAsyncComponent, defineComponent, markRaw, ref } from 'vue' 

import JspreadsheetComponent from "components/JspreadsheetComponent.vue";
import { QTableColumn } from "quasar";
import { useConcentratesStore } from "src/stores/concentrates"; 
import { table } from "console";
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
      const renderFlag = ref<boolean|null>(null)
      const concentratesStore = useConcentratesStore();
      concentratesStore.fetch()
      .then(()=>{
        tableOptions.value = {
          data: concentratesStore.concentrates,
          columns: columnsc
        }
      })
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

        return { 
          Options,
          tableOptions,
          concentratesStore,
          renderFlag
        };
    },
    components: { 
      JspreadsheetComponent 
    }
})
</script>
