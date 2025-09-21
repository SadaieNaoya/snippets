<template>
  <div>
    <h1>検索</h1>
    <LanguagesWrapper @update:language="selectedLanguage = $event" />
    <ProjectsWrapper @update:project="selectedProject = $event" />
    <TextInput v-model="keyword" placeholder="キーワードを入力" />
    <select v-model="keywordMode">
      <option value="AND">AND検索</option>
      <option value="OR">OR検索</option>
    </select>

    <select v-model="sortOrder">
      <option value="asc">タイトル昇順</option>
      <option value="desc">タイトル降順</option>
    </select>
    <SearchButton :keyword="keyword" :language="selectedLanguage" :project="selectedProject" @search="sendToGAS" />
    <SearchResultsTable :results="sortedResults" />

    <div v-if="loading">検索中...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>


</template>

<script>
import { searchSnippets } from '../composables/Snippets';
import SearchButton from '../components/buttons/SearchButton.vue';
import TextInput from '../components/common/TextInput.vue';
import LanguagesWrapper from '../components/languages/LanguagesWrapper.vue';
import ProjectsWrapper from '../components/projects/ProjectsWrapper.vue';
import SearchResultsTable from '../components/results/SearchResultsTable.vue';

export default {
  name: 'Index',
  components: {
    LanguagesWrapper,
    ProjectsWrapper,
    TextInput,
    SearchButton,
    SearchResultsTable
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
      sortOrder: 'asc',    // ←初期値を"asc"（昇順）に
    };
  },
  computed: {
    // これが「ソート済み配列」を返すcomputed
    sortedResults() {
      if (!this.results || !this.results.length) return [];
      // results配列をコピー（元データを破壊しない）
      let arr = [...this.results];
      arr.sort((a, b) => {
        // titleの文字列を比較
        const cmp = a.title.localeCompare(b.title);
        return this.sortOrder === 'asc' ? cmp : -cmp;
      });
      return arr;
    }
  },
  methods: {
    async sendToGAS(payload) {
      this.loading = true;
      this.error = null;
      this.results = [];

      try {
        // 受け取ったpayloadにkeyword,language,projectを補完
        const searchPayload = {
          keyword: this.keyword,
          keywordMode: this.keywordMode, // AND/ORを渡す
          language_id: this.selectedLanguage,
          project_id: this.selectedProject,
          limit: 50,
          offset: 0,
          ...payload, // もしpayloadに含まれている場合上書きされる
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
    }
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
  font-family: 'Courier New', monospace;
  background-color: #fdfdfd;
  color: #333;
}

th {
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: left;
}

td {
  padding: 10px;
  border: 1px solid #ccc;
}

tr:nth-child(even) {
  background-color: #f5f5f5;
}

tr:hover {
  background-color: #eaeaea;
}

pre {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>