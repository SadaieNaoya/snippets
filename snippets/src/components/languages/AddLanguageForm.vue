<template>
  <form class="add-form" @submit.prevent="submit">
    <label>
      言語名
      <input v-model="languageName" required maxlength="50" />
    </label>
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

<style scoped>
.add-form {
  margin-bottom: 1.5rem;
  max-width: 600px;
}

.add-form label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.add-form input {
  width: 100%;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
}

.add-form button {
  margin-top: 0.5rem;
  background-color: var(--color-primary);
  color: #fafaf1;
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-form button:hover {
  background-color: var(--color-primary-hover);
}
</style>
