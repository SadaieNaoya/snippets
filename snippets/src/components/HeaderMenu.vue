<template>
  <nav class="header-menu">
    <router-link to="/" exact-active-class="active" exact>検索</router-link>
    <router-link to="/addsnippet" active-class="active">スニペッド追加</router-link>
    <router-link to="/addpjlanguages" active-class="active">PJ･言語追加</router-link>
  </nav>
</template>
<script>
export default { name: 'HeaderMenu' }
</script>
<style scoped>
.header-menu {
  display: flex;
  gap: 24px;
  padding: 16px 0;
  background: #f5f8fa;
  font-size: 1.1em;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}
.header-menu .active {
  color: #1976d2;
  border-bottom: 2px solid #1976d2;
}
.header-menu a {
  color: #555;
  text-decoration: none;
  padding: 0 8px 4px 8px;
  transition: color 0.2s;
}
.header-menu a:hover {
  color: #2196f3;
}
</style>
