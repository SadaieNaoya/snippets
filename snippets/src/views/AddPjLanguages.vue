<template>
  <div>
    <h2>言語・プロジェクト追加</h2>
    <AddLanguageForm @add-language="handleAddLanguage" />
    <AddProjectForm @add-project="handleAddProject" />
  </div>
</template>

<script>
import AddLanguageForm from '@/components/languages/AddLanguageForm.vue';
import AddProjectForm from '@/components/projects/AddProjectForm.vue';
import { addLanguageAPI } from '@/composables/Languages.js';
import { addProjectAPI } from '@/composables/Projects.js';

export default {
  components: { AddLanguageForm, AddProjectForm },
  methods: {
    async handleAddLanguage(language_name) {
      try {
        const added = await addLanguageAPI(language_name);
        alert(`言語「${added.language_name}」を追加しました`);
        // 必要に応じ画面更新処理を追加
      } catch (e) {
        alert(e.message || '言語の追加に失敗しました');
      }
    },
    async handleAddProject(project_name) {
      try {
        const added = await addProjectAPI(project_name);
        alert(`プロジェクト「${added.project_name}」を追加しました`);
        // 必要に応じ画面更新処理を追加
      } catch (e) {
        alert(e.message || 'プロジェクトの追加に失敗しました');
      }
    }
  }
};
</script>
