<template>
  <!-- <link rel="stylesheet" href="https://jspreadsheet.com/v8/jspreadsheet.css" type="text/css" />
  <link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" /> -->
  <!-- <style>
    @import 'https://jsuites.net/v4/jsuites.css';
  </style> -->
  <!-- @import 'https://jspreadsheet.com/v8/jspreadsheet.css' -->
  <div>JspreadsheetComponent  </div>
  <div ref="sheetEl" />
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import jspreadsheet from "jspreadsheet-ce";
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

const jexceloptions = {data: [
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
        ]}
  
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
    const sheetEl = ref(null);
    onMounted(() => {
      console.log('*onmounted*')
      console.log('props.options: '+JSON.stringify(props.options))
      // jspreadsheet(sheetEl.value, props.options);
      // jspreadsheet(sheetEl.value, jexceloptions);
      jspreadsheet(sheetEl.value, props.options);
    })
    // return { sheetEl };

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
