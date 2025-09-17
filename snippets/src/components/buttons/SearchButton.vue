<template>
  <button @click="onClick">検索</button>
</template>

<script>
export default {
  props: ["keyword", "language", "project"],
  methods: {
    onClick() {
      this.$emit("search", {
        keyword: this.keyword,
        language: this.language,
        project: this.project
      });
    }
  }
};
</script>