<template>
  <form @submit.prevent="submit">
    <label>言語名<input v-model="languageName" required maxlength="50" /></label>
    <button type="submit">追加</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      languageName: ''
    };
  },
  methods: {
    submit() {
      this.$emit('add-language', this.languageName);
      this.languageName = '';
    }
  }
};
</script>
