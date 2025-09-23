<template>
  <div class="font">
    <div class="container">
      <h1 class="page-title">検索</h1>
      <div class="search-section">
        <!-- 1行目 -->
        <div class="search-row">
          <TextInput v-model="keyword" placeholder="キーワードを入力" class="keyword-input" />
        </div>

        <!-- 2行目 -->
        <div class="search-row">
          <LanguagesWrapper @update:language="selectedLanguage = $event" />
          <ProjectsWrapper @update:project="selectedProject = $event" />
        </div>

        <!-- 3行目 -->
        <div class="search-row">
          <select v-model="keywordMode" class="small-select">
            <option value="AND">AND検索</option>
            <option value="OR">OR検索</option>
          </select>

          <select v-model="sortOrder" class="small-select">
            <option value="asc">タイトル昇順</option>
            <option value="desc">タイトル降順</option>
          </select>

          <SearchButton :keyword="keyword" :language="selectedLanguage" :project="selectedProject" @search="sendToGAS"
            class="search-button" />
        </div>
      </div>

      <SearchResultsTable :results="sortedResults" :languages="languages" :projects="projects"
        @update-item="handleUpdateItem" @delete-item="handleDeleteItem" />

      <div v-if="loading" class="loading-overlay">
        <CatLoading />
      </div>

      <div v-if="error" class="error">{{ error }}</div>
    </div>

    <footer class="footer">
      <a href="https://lordicon.com/">Icons by Lordicon.com</a>
    </footer>
  </div>
</template>

<script>
import { searchSnippets, updateSnippetAPI } from '../composables/Snippets';
import SearchButton from '../components/buttons/SearchButton.vue';
import TextInput from '../components/common/TextInput.vue';
import LanguagesWrapper from '../components/languages/LanguagesWrapper.vue';
import ProjectsWrapper from '../components/projects/ProjectsWrapper.vue';
import SearchResultsTable from '../components/results/SearchResultsTable.vue';
import { fetchLanguagesAPI } from '../composables/Languages.js';
import { fetchProjectsAPI } from '../composables/Projects.js';
import { deleteSnippetAPI } from '../composables/Snippets';

// ここでSVGコンポーネントをインポート
import CatLoading from '@/components/CatLoading.vue';

export default {
  name: 'Index',
  components: {
    LanguagesWrapper,
    ProjectsWrapper,
    TextInput,
    SearchButton,
    SearchResultsTable,
    CatLoading,  // 登録
  },
  data() {
    return {
      keyword: '',
      keywordMode: 'AND',
      selectedLanguage: '',
      selectedProject: '',
      results: [],
      loading: false,
      error: null,
      sortOrder: 'asc',
      languages: [],
      projects: [],
    };
  },
  computed: {
    sortedResults() {
      if (!this.results || !this.results.length) return [];
      let arr = [...this.results];
      arr.sort((a, b) => {
        const cmp = a.title.localeCompare(b.title);
        return this.sortOrder === 'asc' ? cmp : -cmp;
      });
      return arr;
    },
  },
  async mounted() {
    this.languages = await fetchLanguagesAPI();
    this.projects = await fetchProjectsAPI();
  },
  methods: {
    async sendToGAS(payload) {
      this.loading = true;
      this.error = null;
      this.results = [];
      try {
        const searchPayload = {
          keyword: this.keyword,
          keywordMode: this.keywordMode,
          language_id: this.selectedLanguage,
          project_id: this.selectedProject,
          limit: 50,
          offset: 0,
          ...payload,
        };
        const result = await searchSnippets(searchPayload);
        if (result.error) {
          this.error = result.message || 'エラーが発生しました。';
        } else {
          this.results = result;
        }
      } catch (e) {
        this.error = e.message || 'エラーが発生しました。';
      } finally {
        this.loading = false;
      }
    },
    async handleUpdateItem({ data }) {
      if (!data.id) {
        this.error = "更新失敗: スニペットIDがありません。";
        return;
      }
      try {
        this.loading = true;
        this.error = null;
        const updated = await updateSnippetAPI(data); // そのまま渡す
        const index = this.results.findIndex(item => item.id === data.id);
        if (index !== -1) {
          this.$set(this.results, index, updated);
        }
      } catch (e) {
        this.error = e.message || "更新中にエラーが発生しました。";
      }
      finally {
        this.loading = false;
      }
    },
    async handleDeleteItem(id) {
      if (!confirm("このスニペットを削除します。よろしいですか？")) {
        return;
      }
      try {
        this.loading = true;
        this.error = null;
        await deleteSnippetAPI(id);
        // 画面上の配列から該当スニペットを削除
        this.results = this.results.filter(item => item.id !== id);
      } catch (e) {
        this.error = e.message || "削除処理に失敗しました。";
      }
      finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.search-section {
  display: flex;
  flex-direction: column;
  /* 縦に積む */
  gap: 1rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

/* 各行は横並び */
.search-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
}

/* プルダウン */
.search-row select {
  border-radius: 7px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  color: var(--color-text);
  padding: 0.4rem 8px;
  font-size: 1rem;
}

/* キーワード入力を広めに */
.keyword-input {
  flex: 1 1 40%;
  min-width: 250px;
  max-width: 500px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
}

.select-group {
  display: flex;
  gap: 0.8rem;
  flex: 1 1 300px;
  min-width: 280px;
  margin-bottom: 0;
}

.select-group.secondary {
  /* 2行目として改行 */
  justify-content: flex-start;
  /* 左寄せ */
  margin-top: 0.7rem;
  /* 上に少し間隔をつける */
}

/* 共通のプルダウンスタイル */
.select-group select,
.select-group .wrapper select {
  flex: 1 1 auto;
  border-radius: 7px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  color: var(--color-text);
  padding: 0.4rem 8px;
  font-size: 1rem;
  max-width: 280px;
}

/* AND/OR 検索・ソート用プルダウンの小さいサイズ */
.small-select {
  flex: 0 0 120px;
  font-size: 0.9rem;
}

/* 検索ボタン */
.search-button {
  flex: 0 0 auto;
  font-size: 1rem;
  padding: 0.7rem 1rem;
}

/* テーブルを包むラッパーに横スクロールを付ける */
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
}

/* テーブル全体の幅は固定レイアウト */
table {
  width: 100%;
  table-layout: fixed;
  /* 列幅を比率で調整可能にする */
  border-collapse: collapse;
}

/* 基本のセルスタイル */
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  vertical-align: top;
  white-space: normal;
  /* 1行に収めず、折り返しを許可 */
  word-break: break-word;
  /* 単語途中でも改行 */
  overflow-wrap: anywhere;
  /* どこでも折り返し */
}

/* コード列は幅を広めに確保（他列の約2倍） */
th:nth-child(2),
/* コード列 */
td.code-cell {
  width: 30%;
  /* 他列より広め */
  vertical-align: top;
}

/* コード表示部分 */
pre.code-content {
  white-space: pre-wrap;
  /* 改行尊重しつつ自動折り返し */
  word-break: break-word;
  /* 長い単語も折り返し */
  overflow-wrap: anywhere;
  /* どこでも改行可能 */
  margin: 0;
  font-family: monospace;
}
</style>
