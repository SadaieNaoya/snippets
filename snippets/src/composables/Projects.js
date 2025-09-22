import { ref, onMounted } from 'vue';

export function fetchProjects() {
  const projects = ref([]);
  const error = ref(null);

  async function fetchProjects() {
    try {
      const response = await fetch("/api", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'getAllProjects' })
      });
      const data = await response.json();
      projects.value = data;
    } catch (e) {
      error.value = e;
    }
  }

  onMounted(fetchProjects);

  return {
    projects,
    error,
    fetchProjects
  };
}

export async function fetchProjectsAPI() {
  const response = await fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "getAllProjects" }),
  });
  if (!response.ok) {
    throw new Error("Projects API fetch error");
  }
  return await response.json();
}
