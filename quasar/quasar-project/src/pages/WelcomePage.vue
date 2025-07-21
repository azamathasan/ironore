<template>
  <q-page padding>
    <!-- content -->
    <section>
      <div class="full-height full-width flex flex-center text-center"
          style="background-color: rgba(0, 0, 0, 0.68) !important;z-index:0;height: 100vh !important;">
      <div class="">
        <!-- <div class="text-h6 text-grey-5">DEMO SPA</div> -->
        <div class="text-h6" style="color: #f4b825;">DEMO SPA</div>
        <div class="text-h2 text-white q-py-sm q-my-md"
              style="border-top:3px solid #1595de;border-bottom: 3px solid #2faa64;">КАЧЕСТВЕННЫЕ ПОКАЗАТЕЛИ ЖЕЛЕЗНОРУДНОГО КОНЦЕНТРАТА
        </div>
        <!-- <div class="text-h6" style="color: #f4b825;"> -->
        <div class="text-h6" style="color: #1495de;">
          REST API | Docker | Docker-compose | Vue 3 | Quasar | Jspreadsheet | Node.js | Express.js | MySQL 
        </div>
        <!-- <div style="color: #1495de !important;" class="text-h4 q-mt-md text-grey-2 my-font">
          AzamHas
        </div> -->
      </div>
    </div>
    </section>
    <div style="background-color:#33495e" id="id_about_me">
      <div class="row flex flex-center">
        <div class="col-8 q-px-md q-pt-sm">
          <div class="text-h4 text-center text-white q-py-xs q-my-xs"
               style="border-top:3px solid #f4b825;border-bottom: 3px solid #f4b825;">ОПИСАНИЕ
          </div>
          <h5 class="q-my-none" style="color: #fff;">
            Система добавления данных о качественных показателях железорудного концентрата и просмотра сводной информации по всем концентратам.
            <br>
            <br>
            Качественные показатели железорудного концентрата:
            <ul>
              <li>
                содержание железа
              </li>
              <li>
                содержание кремния
              </li>
              <li>
                содержание алюминия
              </li>
              <li>
                содержание кальция
              </li>
              <li>
                содержание серы
              </li>
            </ul>
            Данные вносятся ежемесячно
            <br>
            <br>
            Форма для вноса данных должна поддерживает копирование\вставку из Excel (Excel mode)
            <br>
            <br>
            Форма отчета выводит среднее, минимальное и максимальные значения по всем концентратам за выбранный месяц.
            <br>
            <br>
            <q-icon name="person" size="xl"/>USERS - Список пользователей
            <br>
            <br>
            <q-icon name="assignment" size="xl"/>TABLE MODE - Данные в режиме таблицы
            <br>
            <br>
            <q-icon name="table" size="xl" style="  margin-right: -40px; margin-left: 40px;"/>EXCEL MODE - Данные в режиме Excel (с использованием библиотеки Jspreadsheet)
            <br>
            <br>
            <q-icon name="close" size="xl"/>EXIT - Выход из учетной записи
            <br>
            <br>

          </h5>
        </div>
      </div>
    </div>
    
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  // name: 'PageName'
})
</script>
