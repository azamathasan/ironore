<template>
  <div>**********************************************************</div>
  <JspreadsheetComponent :options="Options"></JspreadsheetComponent>
  <div>***********************************************************</div>
</template>
 
<script lang="ts">
import jspreadsheet from "jspreadsheet-ce";
import { defineComponent, ref } from 'vue'

import JspreadsheetComponent from "components/JspreadsheetComponent.vue";
 
  // components: {
  //   // JspreadsheetComponent,
  // },
  export default defineComponent({
    setup() {
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
        };
        return { Options };
    },
    components: { JspreadsheetComponent }
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
