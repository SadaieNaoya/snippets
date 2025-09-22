// SearchSnippets.js

export async function searchSnippets({ keyword, keywordMode, language, project }) {
  const payload = {
    type: 'searchSnippets',
    data: {
      keyword,
      keywordMode, // 追加
      language_id: language,
      project_id: project
    }
  };

  const response = await fetch("/api", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  console.log(result)
  return result;
}

// updateSnippet用にAPI呼び出し関数を作成する例
export async function updateSnippetAPI(snippet) {
  const payload = {
    type: 'updateSnippet',
    data: snippet
  };
console.log(snippet)
  const response = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  console.log(result)

  // サーバー側でエラー応答が返る場合のハンドリング
  if (result.error) {
    throw new Error(result.error);
  }

  return result;
}