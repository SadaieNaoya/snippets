<template>
  <div>
    <div class="container">
      <h1 class="page-title">検索</h1>
      <div class="search-section">
        <TextInput v-model="keyword" placeholder="キーワードを入力" class="keyword-input" />

        <div class="select-group secondary">
          <LanguagesWrapper @update:language="selectedLanguage = $event" />
          <ProjectsWrapper @update:project="selectedProject = $event" />
        </div>

        <div class="select-group">
          <select v-model="keywordMode" class="small-select">
            <option value="AND">AND検索</option>
            <option value="OR">OR検索</option>
          </select>

          <select v-model="sortOrder" class="small-select">
            <option value="asc">タイトル昇順</option>
            <option value="desc">タイトル降順</option>
          </select>
        </div>

        <SearchButton :keyword="keyword" :language="selectedLanguage" :project="selectedProject" @search="sendToGAS"
          class="search-button" />
      </div>

      <SearchResultsTable :results="sortedResults" :languages="languages" :projects="projects"
        @update-item="handleUpdateItem" @delete-item="handleDeleteItem" />

      <div v-if="loading" class="loading">
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
        const updated = await updateSnippetAPI(data); // そのまま渡す
        const index = this.results.findIndex(item => item.id === data.id);
        if (index !== -1) {
          this.$set(this.results, index, updated);
        }
      } catch (e) {
        this.error = e.message || "更新中にエラーが発生しました。";
      }
    },
    async handleDeleteItem(id) {
      if (!confirm("このスニペットを削除します。よろしいですか？")) {
        return;
      }
      try {
        await deleteSnippetAPI(id);
        // 画面上の配列から該当スニペットを削除
        this.results = this.results.filter(item => item.id !== id);
      } catch (e) {
        this.error = e.message || "削除処理に失敗しました。";
      }
    }
  }
};
</script>

<style>
.search-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.keyword-input {
  flex: 1 1 40%;
  min-width: 250px;
  max-width: 500px;
  border-radius: 7px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  color: var(--color-text);
  padding: 0.65rem 14px;
  font-size: 1rem;
}

.select-group {
  display: flex;
  gap: 0.8rem;
  flex: 1 1 300px;
  min-width: 280px;
  margin-bottom: 0;
  padding-right: 500px;
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
.select-group select.small-select {
  flex: 0 0 90px;
  font-size: 0.9rem;
  padding: 0.4rem 6px;
}

/* 検索ボタン調整 */
.search-button {
  flex: 0 0 130px;
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

.btn-edit,
.btn-delete {
  font-size: 0.85rem;
  /* 少し小さく */
  padding: 4px 10px;
  /* タテヨコのパディング調節 */
  min-width: 60px;
  /* 最小幅確保 */
  border-radius: 6px;
  /* 角丸 */
  cursor: pointer;
  margin-bottom: 4px;
  /* ボタン間の縦間隔 */
  display: block;
  /* 重ならないように改行 */
}

/* 編集と削除で色を区別したい場合 */
.btn-edit {
  background-color: var(--color-primary);
  color: white;
  border: none;
}

.btn-edit:hover {
  background-color: var(--color-primary-hover);
}

.btn-delete {
  background-color: var(--color-primary-sub);
  color: white;
  border: none;
}

.btn-delete:hover {
  background-color: var(--color-primary-sub-hover);
}


.page-title {
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 3px solid var(--color-primary);
  width: fit-content;
  /* 線の長さをテキスト幅に */
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
</style>
