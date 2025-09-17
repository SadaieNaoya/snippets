<!-- Button.vue -->
<template>
  <button @click="handleClick">
    <slot>{{ label }}</slot> <!-- slotがない場合はlabelを表示 -->
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    }
  }
}
</script>