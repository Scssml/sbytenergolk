<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap>
      <template
        v-for="(item, index) in sectionLink"
      >
        <v-flex
          xs4
          :key="index"
        >
          <v-card
            :color="item.color"
            class="py-4"
            dark
            :to="item.link"
            ripple
          >
            <v-card-text>
              <div class="text-xs-center headline">{{ item.title }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </template>
    </v-layout>

    <v-layout row wrap>
      <v-flex
        xs4
      >
        <template
          v-for="(item, index) in requestList"
        >
          <v-card
            :key="index"
            class="my-4"
          >
            <v-card-title class="light-blue lighten-2 white--text">
              <div>Заявка №{{ item.id }}</div>
              <v-spacer></v-spacer>
              <div>{{ item.date }}</div>
            </v-card-title>
            <v-list two-line>
              <v-list-tile
                avatar
              >
                <v-list-tile-content>
                  <v-list-tile-title class="mb-2">{{ item.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>Статус: {{ item.status }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </template>
      </v-flex>

      <v-flex
        xs4
      >
        <template
          v-for="(item, index) in countersDataList"
        >
          <v-card
            :key="index"
            class="my-4"
          >
            <v-card-title class="green lighten-2 white--text">
              <v-spacer></v-spacer>
              <div>{{ item.date }}</div>
            </v-card-title>
            <v-list two-line>
              <v-list-tile
                avatar
              >
                <v-list-tile-content>
                  <v-list-tile-title class="mb-2">{{ item.value }} кВт</v-list-tile-title>
                  <v-list-tile-sub-title>Счетчик: {{ item.counter }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </template>
      </v-flex>

      <v-flex
        xs4
      >
        <template
          v-for="(item, index) in appealsList"
        >
          <v-card
            :key="index"
            class="my-4"
          >
            <v-card-title class="orange lighten-2 white--text">
              <div>Обращение №{{ item.id }}</div>
              <v-spacer></v-spacer>
              <div>{{ item.date }}</div>
            </v-card-title>
            <v-list two-line>
              <v-list-tile
                avatar
              >
                <v-list-tile-content>
                  <v-list-tile-title class="mb-2">{{ item.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>Статус: {{ item.status }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </template>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <template
        v-for="(item, index) in elemMoreLink"
      >
        <v-flex
          xs4
          :key="index"
          class="text-xs-center"
        >
          <v-btn
            :color="item.color"
            dark
            :to="item.link"
            ripple
          >
            {{ item.title }}
          </v-btn>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      sectionLink: [
        {
          title: 'Заявки',
          link: '/requests/',
          color: 'light-blue lighten-2',
        },
        {
          title: 'Данные счетчиков',
          link: '/counter-data/',
          color: 'green lighten-2',
        },
        {
          title: 'Обращения',
          link: '/appeals/',
          color: 'orange lighten-2',
        },
      ],
      elemMoreLink: [
        {
          title: 'Посмотреть все',
          link: '/requests/list/',
          color: 'light-blue lighten-2',
        },
        {
          title: 'Посмотреть все',
          link: '/counter-data/list/',
          color: 'green lighten-2',
        },
        {
          title: 'Посмотреть все',
          link: '/appeals/list/',
          color: 'orange lighten-2',
        },
      ],
      requestList: [
        {
          title: 'Подача заявки на ТП',
          status: 'Принята',
          date: '04.08.2018',
          id: 5,
        },
        {
          title: 'Подача заявки на ТП',
          status: 'Принята',
          date: '04.08.2018',
          id: 5,
        },
        {
          title: 'Подача заявки на ТП',
          status: 'Принята',
          date: '04.08.2018',
          id: 5,
        },
        {
          title: 'Подача заявки на ТП',
          status: 'Принята',
          date: '04.08.2018',
          id: 5,
        },
        {
          title: 'Подача заявки на ТП',
          status: 'Принята',
          date: '04.08.2018',
          id: 5,
        },
      ],
      countersDataList: [
        {
          value: '0125,52',
          date: '04.08.2018',
          counter: 1243681,
        },
        {
          value: '0125,52',
          date: '04.08.2018',
          counter: 1243681,
        },
        {
          value: '0125,52',
          date: '04.08.2018',
          counter: 1243681,
        },
        {
          value: '0125,52',
          date: '04.08.2018',
          counter: 1243681,
        },
        {
          value: '0125,52',
          date: '04.08.2018',
          counter: 1243681,
        },
      ],
      appealsList: [
        {
          title: 'Жалоба',
          status: 'В рассмотрении',
          date: '04.08.2018',
          id: 7,
        },
        {
          title: 'Жалоба',
          status: 'В рассмотрении',
          date: '04.08.2018',
          id: 7,
        },
        {
          title: 'Жалоба',
          status: 'В рассмотрении',
          date: '04.08.2018',
          id: 7,
        },
        {
          title: 'Жалоба',
          status: 'В рассмотрении',
          date: '04.08.2018',
          id: 7,
        },
        {
          title: 'Жалоба',
          status: 'В рассмотрении',
          date: '04.08.2018',
          id: 7,
        },
      ],
    };
  },
};
</script>
