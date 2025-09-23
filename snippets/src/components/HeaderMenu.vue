<template>
  <nav class="header-menu">
    <router-link to="/" exact-active-class="active" exact>検索</router-link>
    <router-link to="/addsnippet" active-class="active">スニペッド追加</router-link>
    <router-link to="/addpjlanguages" active-class="active">言語･PJ追加</router-link>
  </nav>
</template>

<script>
export default {
  name: 'HeaderMenu',
};
</script>

<style scoped>
.header-menu {
  display: flex;
  gap: 24px;
  padding: 16px 2.5rem; /* index.vueのcontainerの左右paddingに合わせる */
  background-color: var(--color-bg);
  font-size: 1.1rem;
  font-weight: bold;
  border-bottom: 1px solid var(--color-border);
}

.header-menu .active {
  color: var(--color-primary);
  border-bottom: 3px solid var(--color-primary);
}

.header-menu a {
  color: var(--color-text);
  text-decoration: none;
  padding: 0 8px 4px 8px;
  transition: color 0.3s;
  border-bottom: 3px solid transparent;
}

.header-menu a:hover {
  color: var(--color-primary-hover);
  border-bottom-color: var(--color-primary-hover);
}
</style>
