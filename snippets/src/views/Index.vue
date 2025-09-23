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
    <SearchResultsTable :results="sortedResults" :languages="languages" :projects="projects"
      @update-item="handleUpdateItem" @delete-item="handleDeleteItem" />
    <div v-if="loading">検索中...</div>
    <div v-if="error" class="error">{{ error }}</div>
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

export default {
  name: 'Index',
  components: {
    LanguagesWrapper,
    ProjectsWrapper,
    TextInput,
    SearchButton,
    SearchResultsTable,
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
}
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
