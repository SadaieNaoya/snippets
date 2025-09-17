<template>
  <select v-model="selected" class="custom-select">
    <option v-for="project in projects" :key="project.project_id" :value="project.project_id">
      {{ project.project_name }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    projects: {
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
