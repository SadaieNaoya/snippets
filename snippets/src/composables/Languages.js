import { ref, onMounted } from 'vue';

export function fetchLanguages() {
  const languages = ref([]);
  const error = ref(null);

  async function fetchLanguages() {
    try {
      const response = await fetch("/api", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'getAllLanguages' })
      });
      const data = await response.json();
      console.log(data)

      languages.value = data;
    } catch (e) {
      error.value = e;
    }
  }

  onMounted(fetchLanguages);

  return {
    languages,
    error,
    fetchLanguages
  };
}

// 既存のfetchLanguagesはそのまま活かせるので併用可能

export async function fetchLanguagesAPI() {
  const response = await fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "getAllLanguages" }),
  });
  if(!response.ok){
    throw new Error("Languages API fetch error");
  }
  return await response.json();
}

