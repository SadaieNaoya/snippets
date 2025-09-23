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
              <button class="btn-cancel" @click="cancelEdit">キャンセル</button>
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
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
}

button {
  margin-right: 5px;
}

textarea {
  font-family: monospace;
  white-space: pre-wrap;
}
</style>
