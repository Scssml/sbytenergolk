<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap>
      <template v-for="(prop, index) in filterProps">
        <v-flex
          xs2
          :key="index"
        >
          <template v-if="prop.type === 'date'">
            <v-menu
              :close-on-content-click="false"
              v-model="prop.datepickerShow"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="filterValues[prop.id]"
                :label="prop.title"
                prepend-icon="event"
                readonly
                color="light-blue"
              ></v-text-field>
              <v-date-picker
                v-model="filterValues[prop.id]"
                no-title
                locale="ru-ru"
                @input="prop.datepickerShow = false"
                @change="changeFilter()"
              ></v-date-picker>
            </v-menu>
          </template>

          <template v-if="prop.type === 'select'">
            <v-select
              :items="statusList"
              item-text="value"
              item-value="id"
              v-model="filterValues[prop.id]"
              :label="prop.title"
              color="light-blue"
              @change="changeFilter()"
            ></v-select>
          </template>
        </v-flex>
      </template>
    </v-layout>

    <v-layout row wrap>
      <template
        v-for="(item, index) in requestList"
      >
        <v-flex
          xs4
          :key="index"
        >
          <v-card
            class="my-4"
          >
            <v-card-title class="light-blue lighten-2 white--text">
              <div>Заявка №{{ item.ID }}</div>
              <v-spacer></v-spacer>
              <div>{{ item.UF_DATA }}</div>
            </v-card-title>
            <v-list two-line>
              <v-list-tile
                avatar
              >
                <v-list-tile-content>
                  <v-list-tile-title class="mb-2">{{ item.UF_TYPE }}</v-list-tile-title>
                  <v-list-tile-sub-title>Статус: {{ item.UF_STATUS }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-layout>

    <div
      class="text-xs-center"
      v-if="showBtnMore"
    >
      <v-btn
        color="light-blue lighten-2"
        dark
        ripple
        @click="getRequest()"
      >
        Показать еще
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'RequestsList',
  data() {
    return {
      limit: 50,
      showBtnMore: true,
      offset: 0,
      filterValues: {
        UF_DATA_START: '',
        UF_DATA_END: '',
        UF_STATUS: '',
      },
      filterProps: [
        {
          title: 'Начальная дата',
          datepickerShow: false,
          type: 'date',
          id: 'UF_DATA_START',
        },
        {
          title: 'Конечная дата',
          datepickerShow: false,
          type: 'date',
          id: 'UF_DATA_END',
        },
        {
          title: 'Статус',
          type: 'select',
          id: 'UF_STATUS',
        },
      ],
      menuDateStart: false,
      menuDateEnd: false,
      requestList: [],
      statusList: [],
    };
  },
  methods: {
    changeFilter() {
      this.offset = 0;
      this.requestList = [];
      this.getRequest();
    },
    getRequest() {
      const props = {
        type: 'statement/getList.php',
        filter: this.filterValues,
        offset: this.offset,
      };

      this.$store.dispatch('getListItems', props).then((response) => {
        const arItem = this.requestList;
        this.requestList = (arItem.length > 0) ? arItem.concat(response) : response;

        this.offset += this.limit;

        if (response.length < this.limit) {
          this.showBtnMore = false;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getStatusList() {
      const props = {
        type: 'statement/getStatusList.php',
      };

      this.$store.dispatch('getListItems', props).then((response) => {
        this.statusList = response;
      }).catch((error) => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.getStatusList();
    this.getRequest();
  },
};
</script>
