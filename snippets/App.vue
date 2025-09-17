  <template>
    <div id="app">
      <router-view :key="$route.fullPath"></router-view>
      <loading></loading>
    </div>
  </template>

<script>
import loading from '@/components/CompLoading'
export default {
  name: 'app',
  components: {
    loading,
  },
  mounted() { },
  methods: {
    windowResize: function () {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight - 100;
      this.setWindowHeight();
    },
    setWindowHeight() {
      document.documentElement.style.setProperty('--window-height', this.windowHeight);
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.windowResize)
    this.setWindowHeight();
  },
}
</script>

<style>
#app {
  font-family: 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo, メイリオ, Osaka, 'MS PGothic', arial, helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
