<template>
  <ShowProjects :projects="projects" @select="handleSelect" />
</template>

<script>
import { fetchProjects } from '../../composables/FetchProject';
import ShowProjects from './ShowProjects.vue';

export default {
  name: 'ProjectsWrapper',
  components: { ShowProjects },
  setup(props, { emit }) {
    const { projects } = fetchProjects();

    // 子コンポーネントから選択された言語を親に渡す
    const handleSelect = (selectedProject) => {
      emit('update:project', selectedProject); // ← 修正ポイント
    };
    return { projects, handleSelect };
  }
};
</script>
