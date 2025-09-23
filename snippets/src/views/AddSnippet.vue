<template>
  <div>
    <div class="container">
      <h1 class="page-title">スニペッド追加</h1>
      <AddSnippetForm :languages="languages" :projects="projects" @add-snippet="handleAddSnippet" />
    </div>
    <footer class="footer">
      <a href="https://lordicon.com/">Icons by Lordicon.com</a>
    </footer>
  </div>
</template>

<script>
import AddSnippetForm from '@/components/snippets/AddSnippetForm.vue';
import { fetchLanguagesAPI } from '@/composables/Languages';
import { fetchProjectsAPI } from '@/composables/Projects';
import { addSnippetAPI } from '@/composables/Snippets';

export default {
  components: { AddSnippetForm },
  data() {
    return {
      languages: [],
      projects: [],
      error: null,
    };
  },
  async mounted() {
    this.languages = await fetchLanguagesAPI();
    this.projects = await fetchProjectsAPI();
  },
  methods: {
    async handleAddSnippet(newSnippet) {
      try {
        const added = await addSnippetAPI(newSnippet);
        alert('追加成功: ' + added.title);
        // 必要に応じて画面遷移やリスト更新
      } catch (e) {
        this.error = e.message || '追加に失敗しました。';
      }
    }
  }
};
</script>
