<script>
export default {
  methods: {
    /**
     * Google Apps Script の API にスニペット追加リクエストを送る非同期メソッド
     * @param {Object} data - 追加するスニペットのデータ
     * @returns {Promise<Object>} APIから返されたJSONレスポンス
     */
    async callAddSnippet(data) { //async 非同期処理でデータを取得する際に使用される関数
      try {
        // Vueの環境変数からGASのAPIエンドポイントURLを取得
        const apiUrl = process.env.VUE_APP_GAS_API_URL;

        // fetchを使ってPOSTリクエストを送信
        const response = await fetch(apiUrl, {
          method: 'POST', // HTTPメソッドはPOSTを指定
          headers: {
            'Content-Type': 'application/json' // JSON形式で送信する指定
          },
          // リクエストボディにはtype指定と送信データをJSON文字列に変換してセット 変換はstringifyで行われている
          body: JSON.stringify({ type: 'addSnippet', data })
        });

        // レスポンスのHTTPステータスをチェックし、失敗なら例外を投げる
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // レスポンスボディをJSONとして解析し呼び出し元に返す
        const result = await response.json();
        return result;

      } catch (error) {
        // エラーをコンソールに表示し、呼び出し元に再スロー
        console.error('API call failed:', error);
        throw error;
      }
    }
  }
}

</script>
