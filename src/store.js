import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: '/api/v1/user/',
  },
  mutations: {

  },
  actions: {
    addItem({ state }, item) {
      return new Promise((resolve, rejected) => {
        const url = `${state.apiUrl}${item.type}`;
        axios.post(
          url,
          item.props,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        ).then((response) => {
          resolve(response.data);
        }).catch((error) => {
          console.log(error);
          // if (error.response.status === 401) {
          //   dispatch('logout');
          //   router.push('/login');
          // }
          rejected();
        });
      });
    },
    getListItems({ state }, props) {
      return new Promise((resolve, reject) => {
        const url = `${state.apiUrl}${props.type}`;

        axios.get(url, {
          params: {
            filter: JSON.stringify(props.filter),
            offset: props.offset,
          },
        }).then((response) => {
          const items = response.data;
          resolve(items);
        }).catch((error) => {
          reject(error);
        });
      });
    },
  },
});
