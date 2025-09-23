<template>
  <div class="font">
    <div class="container">

      <h1 class="page-title">言語・プロジェクト追加</h1>
      <AddLanguageForm @add-language="handleAddLanguage" />
      <hr class="divider" />
      <AddProjectForm @add-project="handleAddProject" />
    </div>
    <div v-if="loading" class="loading-overlay">
      <CatLoading />
    </div>

    <footer class="footer">
      <a href="https://lordicon.com/">Icons by Lordicon.com</a>
    </footer>
  </div>
</template>

<script>
import CatLoading from '@/components/CatLoading.vue';
import AddLanguageForm from '@/components/languages/AddLanguageForm.vue';
import AddProjectForm from '@/components/projects/AddProjectForm.vue';
import { addLanguageAPI } from '@/composables/Languages.js';
import { addProjectAPI } from '@/composables/Projects.js';

export default {
  components: { AddLanguageForm, AddProjectForm, CatLoading },
  data() {
    return {
      loading: false,
      error: null
    };
  },
  methods: {
    async handleAddLanguage(language_name) {
      this.loading = true;
      this.error = null;
      try {
        const added = await addLanguageAPI(language_name);
        //alert(`言語「${added.language_name}」を追加しました`);
      } catch (e) {
        this.error = e.message || '言語の追加に失敗しました';
        //alert(this.error);
      } finally {
        this.loading = false;
      }
    },
    async handleAddProject(project_name) {
      this.loading = true;
      this.error = null;
      try {
        const added = await addProjectAPI(project_name);
        //alert(`プロジェクト「${added.project_name}」を追加しました`);
      } catch (e) {
        this.error = e.message || 'プロジェクトの追加に失敗しました';
        //alert(this.error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
<style scoped>
.divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 1.5rem 0;
  /* 前後の余白 */
  width: 100%;
  opacity: 0.6;
}

.forms-wrapper {
  display: flex;
  flex-direction: column;
  /* 縦に並べる */
  align-items: center;
  /* 横方向に中央寄せ */
  gap: 2rem;
  /* フォーム間に余白 */
}
</style>