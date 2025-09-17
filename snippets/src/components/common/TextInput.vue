<template>
  <input
    :type="type"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
    :disabled="disabled"
    class="form-input"
  />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: { type: String, default: '' }, // ← Vue 2.x では 'value'
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    disabled: { type: Boolean, default: false },
  }
};
</script>

<style scoped>
.form-input {
  width: 250px;
  padding: 4px;
  font-size: 16px;
}
</style>