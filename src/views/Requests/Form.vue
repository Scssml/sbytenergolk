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
                v-model="propsItem[prop.id]"
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
                v-model="propsItem[prop.id]"
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
                v-model="propsItem[prop.id]"
              ></v-textarea>
            </template>

            <template v-if="prop.type === 'radio'">
              <v-radio-group
                v-model="propsItem[prop.id]"
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
                :disabled="false"
                v-model="propsItem[prop.id]"
              >
              </input-type-file>
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
      propsItem: {
        UF_TEST_1: '',
        UF_TEST_2: '',
        UF_TEST_3: '',
        UF_TEST_4: null,
        UF_TEST_5: null,
        UF_TYPE: 29,
      },
      formProps: [
        {
          title: 'Поле 1',
          description: '',
          type: 'text',
          required: true,
          rules: [v => !!v || 'Заполните поле'],
          id: 'UF_TEST_1',
        },
        {
          title: 'Поле 2',
          description: '',
          type: 'text',
          required: true,
          rules: [v => !!v || 'Заполните поле'],
          id: 'UF_TEST_2',
        },
        {
          title: 'Поле 3',
          description: '',
          type: 'text',
          required: false,
          // rules: [v => !!v || 'Заполните поле'],
          id: 'UF_TEST_3',
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
        },
      ],
    };
  },
  methods: {
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

        const itemParams = {
          type: 'statement/add.php',
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
  },
};
</script>
