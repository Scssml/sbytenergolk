<template>
  <v-container grid-list-lg fluid>
    <h1 class="display-1 text-xs-center">{{ nameForm }}</h1>
    <v-form ref="form" lazy-validation>
      <v-layout row wrap>
        <template v-for="(prop, index) in formProps">
          <v-flex
            xs4
            :key="index"
          >
            <template v-if="prop.type === 'text'">
              <v-text-field
                :label="prop.title"
                :hint="prop.description"
                persistent-hint
                :required="prop.required"
                :rules="prop.rules"
                :value="(propsItem.hasOwnProperty(prop.id)) ? propsItem[prop.id] : prop.value"
                @input="changeProp(prop.id, $event)"
                :disabled="prop.disabled"
              ></v-text-field>
            </template>

            <template v-if="prop.type === 'select'">
              <v-select
                :label="prop.title"
                :hint="prop.description"
                persistent-hint
                :items="prop.items"
                :multiple="prop.multiple"
                :required="prop.required"
                :rules="prop.rules"
                :value="(propsItem.hasOwnProperty(prop.id)) ? propsItem[prop.id] : prop.value"
                @input="changeProp(prop.id, $event)"
                :disabled="prop.disabled"
              ></v-select>
            </template>

            <template v-if="prop.type === 'textarea'">
              <v-textarea
                :label="prop.title"
                :hint="prop.description"
                persistent-hint
                auto-grow
                :required="prop.required"
                :rules="prop.rules"
                :value="(propsItem.hasOwnProperty(prop.id)) ? propsItem[prop.id] : prop.value"
                @input="changeProp(prop.id, $event)"
                :disabled="prop.disabled"
              ></v-textarea>
            </template>

            <template v-if="prop.type === 'radio'">
              <v-radio-group
                :value="(propsItem.hasOwnProperty(prop.id)) ? propsItem[prop.id] : prop.value"
                @input="changeProp(prop.id, $event)"
                :hint="prop.description"
                persistent-hint
              >
                <v-radio
                  v-for="(item, n) in prop.items"
                  :key="n"
                  :label="item.label"
                  :value="item.value"
                  ripple
                  color="primary"
                  :disabled="prop.disabled"
                ></v-radio>
              </v-radio-group>
            </template>

            <template v-if="prop.type === 'checkbox'">
              <v-checkbox
                v-for="(item, n) in prop.items"
                :key="n"
                :label="item.label"
                :value="item.value"
                :hint="item.description"
                persistent-hint
                ripple
                color="primary"
                v-model="propsItem[prop.id]"
                :disabled="prop.disabled"
              ></v-checkbox>
            </template>

            <template v-if="prop.type === 'file'">
              <input-type-file
                :label="prop.title"
                :hint="prop.description"
                :required="prop.required"
                :rules="prop.rules"
                :accept="prop.accept"
                :multiple="prop.multiple"
                :disabled="prop.disabled"
                v-model="propsItem[prop.id]"
                v-if="propsItem.hasOwnProperty(prop.id)"
              >
              </input-type-file>
              <div v-else>
                {{ prop.title }}
                <br>
                <v-btn
                  small
                  :href="prop.value"
                  target="_blank"
                  class="mx-0"
                >Файл</v-btn>
              </div>
            </template>
          </v-flex>
        </template>
      </v-layout>

      <v-divider class="my-4"></v-divider>

      <v-btn
        color="primary"
        ripple
        @click="submitForm"
        :loading="loadingBtn"
      >
        Отправить
      </v-btn>
      <v-btn
        to="/requests/"
        color="grey lighten-3"
        ripple
      >Отмена</v-btn>
    </v-form>

    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      top
      :color="(error) ? 'red' : 'primary'"
    >
      <v-flex
        class="text-xs-center"
        xs12
      >
        {{ message }}
      </v-flex>
    </v-snackbar>
  </v-container>
</template>

<script>
import InputTypeFile from '../../components/InputTypeFile.vue';

export default {
  name: 'Form',
  components: {
    'input-type-file': InputTypeFile,
  },
  data() {
    return {
      loadingBtn: false,
      snackbar: false,
      error: false,
      message: '',
      nameForm: 'Заявка на ТП',
      propsItem: {},
      formProps: [
        {
          title: 'Поле 1',
          description: '',
          type: 'text',
          required: true,
          rules: [v => !!v || 'Заполните поле'],
          id: 'UF_TEST_1',
          disabled: true,
          value: '',
        },
        {
          title: 'Поле 2',
          description: '',
          type: 'text',
          required: true,
          rules: [v => !!v || 'Заполните поле'],
          id: 'UF_TEST_2',
          disabled: true,
          value: '',
        },
        {
          title: 'Поле 3',
          description: '',
          type: 'text',
          required: false,
          // rules: [v => !!v || 'Заполните поле'],
          id: 'UF_TEST_3',
          disabled: true,
          value: '',
        },
        {
          title: 'Поле 4',
          description: '',
          type: 'file',
          required: true,
          rules: [v => !!v || 'Заполните поле'],
          multiple: true,
          accept: '*',
          id: 'UF_TEST_4',
          disabled: true,
          value: '',
        },
        {
          title: 'Поле 5',
          description: '',
          type: 'file',
          required: false,
          // rules: [v => !!v || 'Заполните поле'],
          multiple: true,
          accept: '*',
          id: 'UF_TEST_5',
          disabled: true,
          value: '',
        },
      ],
    };
  },
  methods: {
    changeProp: function changeProp(propId, value) {
      if (Object.prototype.hasOwnProperty.call(this.propsItem, propId)) {
        this.propsItem[propId] = value;
      }
    },
    submitForm: function submitForm() {
      const validate = this.$refs.form.validate();

      if (validate) {
        const formData = new FormData();
        this.loadingBtn = true;
        this.snackbar = false;
        this.error = false;
        this.message = '';

        Object.keys(this.propsItem).forEach((key) => {
          if (Array.isArray(this.propsItem[key])) {
            this.propsItem[key].forEach((item) => {
              formData.append(`PROPS[${key}]`, item);
            });
          } else {
            formData.append(`PROPS[${key}]`, this.propsItem[key]);
          }
        });

        formData.append('ID', this.$route.params.id);

        const itemParams = {
          type: 'statement/update.php',
          props: formData,
        };

        this.$store.dispatch('addItem', itemParams).then(() => {
          this.snackbar = true;
          this.message = 'Сохранено';

          setTimeout(() => {
            this.$router.push('/requests/');
          }, 1500);
          this.loadingBtn = true;
        }).catch(() => {
          this.snackbar = true;
          this.error = true;
          this.loadingBtn = false;
          this.message = 'Ошибка';
        });
      }
    },
    uploadFile: function uploadFile(index, e) {
      const files = e.target.files || e.dataTransfer.files;

      this.formProps[index].value = [];
      this.formProps[index].files = [];

      this.formProps[index].value = [...files].map(file => file.name).join(', ');

      for (let i = 0; files[i]; i += 1) {
        this.formProps[index].files.push(files[i]);
      }
    },
    onFocus: function onFocus(refInput) {
      if (!this.disabled) {
        this.$refs[refInput][0].click();
      }
    },
    getRequest() {
      const props = {
        type: 'statement/getItem.php',
        filter: {
          ID: this.$route.params.id,
        },
      };

      this.$store.dispatch('getListItems', props).then((response) => {
        this.formProps.forEach((item, key) => {
          if (response[item.id].length > 0) {
            this.formProps[key].value = response[item.id];
            this.formProps[key].disabled = true;
          } else {
            this.formProps[key].value = '';
            this.formProps[key].disabled = false;

            this.propsItem[item.id] = '';
          }
        });
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
