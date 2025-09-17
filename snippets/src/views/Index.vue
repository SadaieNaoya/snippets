Index.vue<template>
  <div>
    <h1>検索</h1>
    <LanguagesWrapper @update:language="selectedLanguage = $event" />
    <ProjectsWrapper @update:project="selectedProject = $event" />
    <TextInput v-model="keyword" placeholder="キーワードを入力" />
    <SearchButton :keyword="keyword" :language="selectedLanguage" :project="selectedProject" @search="sendToGAS" />
  </div>

</template>

<script>
import { searchSnippets } from '../composables/SearchSnippets';
import SearchButton from '../components/buttons/SearchButton.vue';
import TextInput from '../components/common/TextInput.vue';
import LanguagesWrapper from '../components/languages/LanguagesWrapper.vue';
import ProjectsWrapper from '../components/projects/ProjectsWrapper.vue';

export default {
  name: 'Index',
  components: {
    LanguagesWrapper,
    ProjectsWrapper,
    TextInput,
    SearchButton
  },
  data() {
    return {
      keyword: '',
      selectedLanguage: '',
      selectedProject: ''
    };
  },
  methods: {
    async sendToGAS(payload) {
      console.log("送信前の keyword:", this.keyword); // ← ここで確認
      console.log("送信する payload:", payload);

      try {
        const result = await searchSnippets(payload);
        // 必要ならここで結果を使って何か処理
        console.log(result)
      } catch (error) {
        console.log("エラーです、result:" + result)
      }
    }
  }
};
</script>