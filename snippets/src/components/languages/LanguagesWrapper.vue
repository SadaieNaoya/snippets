<template>
  <ShowLanguages :languages="languages" @select="handleSelect" />
</template>

<script>
import { fetchLanguages } from '../../composables/Languages.js';
import ShowLanguages from './ShowLanguages.vue';

export default {
  name: 'LanguagesWrapper',
  components: { ShowLanguages },
  setup(props, { emit }) {
    const { languages } = fetchLanguages();

    // 子コンポーネントから選択された言語を親に渡す
    const handleSelect = (selectedLang) => {
      emit('update:language', selectedLang);
    };

    return { languages, handleSelect };
  }
};
</script>