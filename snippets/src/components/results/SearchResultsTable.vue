<template>
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

      </tr>
    </thead>
    <tbody>

      <tr v-for="item in results" :key="item.id">
        <td>{{ item.title }}</td>
        <td>
          <pre>{{ item.code }}</pre>
        </td>
        <td>{{ item.language_id }}</td>
        <td>{{ item.project_id }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.tags }}</td>
        <td>{{ item.memo }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'SearchResultsTable',
  props: {
    results: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
