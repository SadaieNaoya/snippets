<template>
  <div class="table-wrapper">
    <table v-if="results.length > 0">
      <thead>
        <tr>
          <th>タイトル</th>
          <th>コード</th>
          <th>言語</th>
          <th>プロジェクト</th>
          <th>概要</th>
          <th>タグ</th>
          <th>メモ</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in results" :key="item.id">
          <!-- タイトル -->
          <td v-if="isEditing(item.id)">
            <input v-model="editItem.title" />
          </td>
          <td v-else>{{ item.title }}</td>

          <!-- コード -->
          <td v-if="isEditing(item.id)">
            <textarea v-model="editItem.code" rows="4" cols="40"></textarea>
          </td>
          <td v-else class="code-cell">
            <pre class="code-content">{{ item.code }}</pre>
          </td>
          <!-- 言語（プルダウン） -->
          <td v-if="isEditing(item.id)">
            <select v-model="editItem.language_id">
              <option v-for="lang in languages" :key="lang.language_id" :value="lang.language_id">
                {{ lang.language_name }}
              </option>
            </select>
          </td>
          <td v-else>{{ item.language_name }}</td>

          <!-- プロジェクト（プルダウン） -->
          <td v-if="isEditing(item.id)">
            <select v-model="editItem.project_id">
              <option v-for="proj in projects" :key="proj.project_id" :value="proj.project_id">
                {{ proj.project_name }}
              </option>
            </select>
          </td>
          <td v-else>{{ item.project_name }}</td>

          <!-- 概要 -->
          <td v-if="isEditing(item.id)">
            <input v-model="editItem.description" />
          </td>
          <td v-else>{{ item.description }}</td>

          <!-- タグ -->
          <td v-if="isEditing(item.id)">
            <input v-model="editItem.tags" />
          </td>
          <td v-else>{{ item.tags }}</td>

          <!-- メモ -->
          <td v-if="isEditing(item.id)">
            <input v-model="editItem.memo" />
          </td>
          <td v-else>{{ item.memo }}</td>

          <!-- 操作 -->
          <td>
            <template v-if="isEditing(item.id)">
              <button class="btn-save" @click="saveEdit(item.id)">保存</button>
              <button class="btn-cancel" @click="cancelEdit">戻る</button>
            </template>
            <template v-else>
              <button class="btn-edit" @click="startEdit(item)">編集</button>
              <button class="btn-delete" @click="deleteItem(item.id)">削除</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SearchResultsTable",
  props: {
    results: {
      type: Array,
      required: true,
    },
    languages: {
      type: Array,
      default: () => [],
    },
    projects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      editingId: null,
      editItem: {},
    };
  },
  methods: {
    isEditing(id) {
      return this.editingId === id;
    },
    startEdit(item) {
      this.editingId = item.id;
      // 編集対象のデータをコピーして操作
      this.editItem = { ...item };
    },
    cancelEdit() {
      this.editingId = null;
      this.editItem = {};
    },
    async saveEdit() {
      try {
        this.saving = true;
        await this.$emit("update-item", { data: { ...this.editItem } });
        this.cancelEdit();
      } catch (e) {
        alert("保存中にエラーが発生しました: " + e.message);
      } finally {
        this.saving = false;
      }
    },
    deleteItem(id) {
      // 削除対象IDを親にemit
      this.$emit("delete-item", id);
      if (this.editingId === id) {
        this.cancelEdit();
      }
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
  /* 各セルを均等に扱う */
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  vertical-align: top;
  word-break: break-word;
  /* 長い文字を折り返し */
}

/* 編集時のinputやtextareaをセル幅に収める */
td input,
td select,
td textarea {
  width: 100%;
  box-sizing: border-box;
  /* padding込みで幅を合わせる */
  font-size: 0.9rem;
}

/* コードセル */
.code-cell {
  max-width: 250px;
  /* 適宜調整 */
  overflow-wrap: break-word;
}

.code-content {
  white-space: pre-wrap;
  /* 折り返して表示 */
  font-family: monospace;
  font-size: 0.85rem;
  margin: 0;
}

/* 編集と削除で色を区別したい場合 */
.btn-edit,
.btn-save {
  background-color: var(--color-primary);
  color: white;
  border: none;
}

.btn-edit:hover,
.btn-save:hover {
  background-color: var(--color-primary-hover);
}

.btn-delete,
.btn-cancel {
  margin-top: 15px;
  background-color: var(--color-primary-sub);
  color: white;
  border: none;
}

.btn-delete:hover,
.btn-cancel:hover {
  background-color: var(--color-primary-sub-hover);
}

.btn-edit,
.btn-delete,
.btn-cancel,
.btn-save {
  font-size: 0.85rem;
  padding: 4px 10px;
  min-width: 60px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 4px;
  display: block;
}
</style>