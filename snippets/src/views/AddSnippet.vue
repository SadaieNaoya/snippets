<template>
  <div class="font">
    <div class="container">
      <h1 class="page-title">スニペッド追加</h1>
      <div v-if="loading" class="loading-overlay">
        <CatLoading/>
      </div>

      <AddSnippetForm :languages="languages" :projects="projects" @add-snippet="handleAddSnippet" />
    </div>
    <footer class="footer">
      <a href="https://lordicon.com/">Icons by Lordicon.com</a>
    </footer>
  </div>
</template>
<script>
import AddSnippetForm from '@/components/snippets/AddSnippetForm.vue';
import CatLoading from '@/components/CatLoading.vue';
import { fetchLanguagesAPI } from '@/composables/Languages';
import { fetchProjectsAPI } from '@/composables/Projects';
import { addSnippetAPI } from '@/composables/Snippets';

export default {
  components: { AddSnippetForm ,CatLoading},
  data() {
    return {
      languages: [],
      projects: [],
      error: null,
      loading: false,
    };
  },
  async mounted() {
    this.languages = await fetchLanguagesAPI();
    this.projects = await fetchProjectsAPI();
  },
    methods: {
      async handleAddSnippet(newSnippet) {
        this.loading = true;
        this.error = null;
        try {
          const added = await addSnippetAPI(newSnippet);
          //alert('追加成功: ' + added.title);
        } catch (e) {
          this.error = e.message || '追加に失敗しました。';
        } finally {
          this.loading = false;
        }
      },
    },
}
</script>

