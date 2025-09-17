// SearchSnippets.js

export async function searchSnippets({ keyword, language, project }) {
  const payload = {
    type: 'searchSnippets',
    data: {
      keyword,
      language_id: language,
      project_id: project
    }
  };

  const response = await fetch("/api",{
method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  return result;
}