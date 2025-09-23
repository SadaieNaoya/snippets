<template>
  <form @submit.prevent="submit">
    <label>プロジェクト名<input v-model="projectName" required maxlength="50" /></label>
    <button type="submit">追加</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      projectName: '',  // ← ここで初期化してください
    };
  },
  methods: {
    submit() {
      this.$emit('add-project', this.projectName);
      this.projectName = '';  // 送信後リセット
    }
  }
};
</script>
