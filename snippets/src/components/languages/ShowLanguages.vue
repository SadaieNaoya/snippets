<template>
<select v-model="selected" class="custom-select">
  <option value="">未選択</option>  <!-- 追加 -->
  <option v-for="lang in languages" :key="lang.language_id" :value="lang.language_id">
    {{ lang.language_name }}
  </option>
</select>
</template>

<script>
export default {
  props: {
    languages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: ''
    };
  },
  watch: {
    selected(newVal) {
      this.$emit('select', newVal); // 言語IDを親に渡す
    }
  }
};
</script>

<style scoped>
.custom-select {
  width: 250px;
}
</style>
