<template>
  <v-app>
    <v-toolbar
      app
      color="blue-grey lighten-4"
    >
      <v-toolbar-items>
        <template
          v-for="(item, index) in menuTop"
        >
          <v-btn
            :to="item.link"
            :key="index"
            flat
          >
            {{ item.title }}
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <transition name="fade">
        <router-view/>
      </transition>
    </v-content>
    <v-footer
      :fixed="false"
      height="auto"
      color="blue-grey darken-3"
      app
      dark
    >
      <v-layout
        justify-center
        row
      >
        <v-flex
          text-xs-center
          xs12
        >
          &copy; {{ yearNow }}
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menuTop: [
        {
          title: 'Главная',
          link: '/',
        },
        {
          title: 'Заявки',
          link: '/requests/',
        },
        {
          title: 'Данные счетчиков',
          link: '/counter-data/',
        },
        {
          title: 'Обращения',
          link: '/appeals/',
        },
        {
          title: 'Настройки',
          link: '/setting/',
        },
        {
          title: 'Выход',
          link: '/logout/',
        },
      ],
      yearNow: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="sass">
  .fade-enter, .fade-leave-to { opacity: 0; }
  .fade-enter-active { transition: opacity .5s ease-in-out .5s; }
  .fade-leave-active { transition: opacity .5s ease-in-out; }
</style>
