<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap>
      <template
        v-for="(item, index) in sectionLink"
      >
        <v-flex
          xs3
          :key="index"
        >
          <v-card
            color="light-blue lighten-2"
            class="py-4"
            dark
            :to="item.link"
            ripple
            height="100%"
          >
            <v-card-text>
              <div class="text-xs-center headline">{{ item.title }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </template>
    </v-layout>

    <h3 class="display-1 text-xs-center mt-4">Последние заявки</h3>

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

    <div class="text-xs-center">
      <v-btn
        color="light-blue lighten-2"
        dark
        to="/requests/list/"
        ripple
      >
        Посмотреть все
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Requests',
  data() {
    return {
      sectionLink: [
        {
          title: 'Заявка на ТП',
          link: '/requests/form/1',
        },
        {
          title: 'Снятие показаний расчетного прибора учета электрической энергии',
          link: '/requests/form/2',
        },
        {
          title: 'Допуск прибора учета электрической энергии в эксплуатацию',
          link: '/requests/form/3',
        },
        {
          title: 'Безучетное потребление',
          link: '/requests/form/4',
        },
        {
          title: 'Установка, замена, эксплуатация',
          link: '/requests/form/5',
        },
      ],
      requestList: [],
    };
  },
  methods: {
    getRequest() {
      const props = {
        type: 'statement/getList.php',
        offset: 0,
      };

      this.$store.dispatch('getListItems', props).then((response) => {
        this.requestList = response;
      }).catch((error) => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.getRequest();
  },
};
</script>
