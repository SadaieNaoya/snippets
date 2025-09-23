<template>
    <form class="add-snippet-form" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label>タイトル（必須）</label>
            <input type="text" v-model="form.title" required maxlength="100" />
        </div>

        <div class="form-group">
            <label>概要</label>
            <input type="text" v-model="form.description" />
        </div>


        <div class="form-group">
            <label>言語</label>
            <select v-model="form.language_id">
                <option value="">未選択</option>
                <option v-for="lang in languages" :key="lang.language_id" :value="lang.language_id">
                    {{ lang.language_name }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label>プロジェクト</label>
            <select v-model="form.project_id">
                <option value="">未選択</option>
                <option v-for="proj in projects" :key="proj.project_id" :value="proj.project_id">
                    {{ proj.project_name }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label>タグ</label>
            <input type="text" v-model="form.tags" />
        </div>

        <div class="form-group">
            <label>メモ</label>
            <input type="text" v-model="form.memo" />
        </div>
        <div class="form-group full-width">
            <label>コード</label>
            <textarea v-model="form.code" rows="4"></textarea>
        </div>

        <div class="form-group full-width">
            <button type="submit" class="add-button">追加</button>
        </div>

    </form>
</template>

<script>
export default {
    name: 'AddSnippetForm',
    props: {
        languages: Array,
        projects: Array,
    },
    data() {
        return {
            form: {
                title: '',
                language_id: '',
                project_id: '',
                code: '',
                description: '',
                tags: '',
                memo: '',
            },
        };
    },
    methods: {
        handleSubmit() {
            this.$emit('add-snippet', { ...this.form });
            this.form = {
                title: '',
                language_id: '',
                project_id: '',
                code: '',
                description: '',
                tags: '',
                memo: '',
            };
        },
    },
};
</script>

<style scoped>
.add-snippet-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* 2列に分割 */
    gap: 1rem 2rem;
    /* 行と列の間隔 */
    margin-top: 1rem;
    max-width: 1000px;
}

/* 1列にしたい項目は span させる */
.form-group.full-width {
    grid-column: 1 / -1;
    /* 両列にまたがる */
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    color: var(--color-text);
    font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background-color: var(--color-bg);
    color: var(--color-text);
    font-size: 1rem;
    font-family: inherit;
    box-sizing: border-box;
    resize: vertical;
}

.form-group textarea {
    height: 60px;
}

.add-button {
    align-self: flex-start;
    margin-top: 1.2rem;
    padding: 0.8rem 2rem;
    background-color: var(--color-primary);
    color: #fafaf1;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-button:hover {
    background-color: var(--color-primary-hover);
}
</style>
