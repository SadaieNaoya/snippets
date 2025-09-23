<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>タイトル（必須）</label>
      <input type="text" v-model="form.title" required maxlength="100" />
    </div>
    
    <div>
      <label>言語</label>
      <select v-model="form.language_id">
        <option value="">選択してください</option>
        <option v-for="lang in languages" :key="lang.language_id" :value="lang.language_id">
          {{ lang.language_name }}
        </option>
      </select>
    </div>
    
    <div>
      <label>プロジェクト</label>
      <select v-model="form.project_id">
        <option value="">選択してください</option>
        <option v-for="proj in projects" :key="proj.project_id" :value="proj.project_id">
          {{ proj.project_name }}
        </option>
      </select>
    </div>
    
    <div>
      <label>コード</label>
      <textarea v-model="form.code" rows="6"></textarea>
    </div>
    
    <div>
      <label>概要</label>
      <input type="text" v-model="form.description" />
    </div>
    
    <div>
      <label>タグ</label>
      <input type="text" v-model="form.tags" />
    </div>
    
    <div>
      <label>メモ</label>
      <input type="text" v-model="form.memo" />
    </div>
    
    <button type="submit">追加</button>
  </form>
</template>

<script>
export default {
  name: 'AddSnippetForm',
  props: {
    languages: Array,
    projects: Array
  },
  data() {
    return {
      form: {
        title: '',
        language_id: '',
        project_id: '',
        code: '',
        description: '',
        tags: '',
        memo: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('add-snippet', { ...this.form });
      // フォームをリセットも可能
      this.form = {
        title: '',
        language_id: '',
        project_id: '',
        code: '',
        description: '',
        tags: '',
        memo: ''
      };
    }
  }
};
</script>
