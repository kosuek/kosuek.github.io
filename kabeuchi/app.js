const { createApp } = Vue;

createApp({
  data() {
    return {
      appVersion: `v${new Date().toISOString().slice(0, 10)}-${new Date().toISOString().slice(11, 19).replace(/:/g, '')}`,
      showSettings: false,
      showHowTo: false,
      apiKeyInput: '',
      apiKey: '',
      draft: '',
      isLoading: false,
      connectionStatus: '未接続',
      messages: [
        {
          id: 1,
          role: 'assistant',
          text: 'こんにちは。アイデアの壁打ちをしませんか？何か考えていることや悩んでいることを一言だけでも教えてください。',
        },
      ],
    };
  },
  computed: {
    isApiReady() {
      return Boolean(this.apiKey && this.apiKey.trim().length > 0);
    },
  },
  mounted() {
    const storedKey = localStorage.getItem('gemini-api-key') || '';
    this.apiKey = storedKey;
    this.apiKeyInput = storedKey;
    this.connectionStatus = storedKey ? 'APIキー保存済み' : 'APIキー未設定';
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    toggleHowTo() {
      this.showHowTo = !this.showHowTo;
    },
    saveApiKey() {
      const value = this.apiKeyInput.trim();
      this.apiKey = value;
      if (value) {
        localStorage.setItem('gemini-api-key', value);
        this.connectionStatus = 'APIキー保存済み';
      } else {
        localStorage.removeItem('gemini-api-key');
        this.connectionStatus = 'APIキー未設定';
      }
      this.showSettings = false;
    },
    clearApiKey() {
      this.apiKeyInput = '';
      this.apiKey = '';
      this.connectionStatus = 'APIキー未設定';
      localStorage.removeItem('gemini-api-key');
    },
    appendNewLine(event) {
      const textarea = event.target;
      const cursorPos = textarea.selectionStart;
      const text = this.draft;
      const before = text.slice(0, cursorPos);
      const after = text.slice(cursorPos);
      this.draft = `${before}\n${after}`;
      this.$nextTick(() => {
        textarea.selectionStart = cursorPos + 1;
        textarea.selectionEnd = cursorPos + 1;
      });
    },
    handleTextareaEnter(event) {
      if (event.shiftKey) {
        return;
      }
      event.preventDefault();
      this.sendMessage();
    },
    async sendMessage() {
      const input = this.draft.trim();
      if (!input || this.isLoading) {
        return;
      }

      const userMessage = {
        id: Date.now(),
        role: 'user',
        text: input,
      };

      this.messages.push(userMessage);
      this.draft = '';
      this.isLoading = true;
      this.scrollToBottom();

      try {
        if (this.isApiReady) {
          this.connectionStatus = '接続確認中';
          const reply = await this.callGemini(this.messages);
          this.connectionStatus = '接続成功';
          this.messages.push({
            id: Date.now() + 1,
            role: 'assistant',
            text: reply,
          });
        } else {
          this.connectionStatus = 'モックモード';
          this.messages.push({
            id: Date.now() + 1,
            role: 'assistant',
            text: this.createMockReply(input),
          });
        }
      } catch (error) {
        this.connectionStatus = '接続エラー';
        const errorText = error?.message || '不明なエラー';

        this.messages.push({
          id: Date.now() + 2,
          role: 'assistant',
          text: this.isApiReady
            ? `Gemini API の呼び出しでエラーが発生しました。\n\n${errorText}\n\n原因としては、APIキーが無効・未有効化・請求未設定・ネットワーク制限のどれかが考えられます。\n\nもしキーを入れ直した直後なら、数分待ってから再度試してください。`
            : 'Geminiへの接続でエラーが発生しました。APIキーが正しいか、ネットワーク接続を確認してください。\n\nモックモードとして、考えの整理の例を返します。\n\n' + this.createMockReply(input),
        });
      } finally {
        this.isLoading = false;
        this.scrollToBottom();
      }
    },
    createMockReply(input) {
      const lower = input.toLowerCase();

      if (lower.includes('アイデア') || lower.includes('idea')) {
        return '良いテーマですね。まずは「誰のどんな悩みを解決したいか」をひとつ明確にしてみましょう。\n\n例えば、対象ユーザー・課題・価値の3点で整理すると、アイデアがかなり具体化します。';
      }

      if (lower.includes('作る') || lower.includes('開発') || lower.includes('サービス')) {
        return 'その方向性はかなり良いです。\n\nまずは「一番小さいユースケース」を決めて、3〜5人に使ってもらう形で検証すると、手間がかかりません。小さく始めると改善の軸が見えやすくなります。';
      }

      if (lower.includes('悩み') || lower.includes('不安') || lower.includes('迷')) {
        return '迷うのは自然なことです。壁打ちでは「今の自分が感じている違和感」を言語化するだけで十分です。\n\n一歩ずつ分解して、現状・目標・障害の3つを整理してみると、次の一手が見えやすくなります。';
      }

      return 'なるほど、それは素敵なテーマです。\n\n自分の言葉で「なぜそれをやりたいのか」を1文にまとめると、方向性がかなり定まります。\n\n次に、具体的な一手を一つ決めて、試してみるのがおすすめです。';
    },
    buildGeminiContents(messages) {
      return messages
        .filter((message) => message && message.text && message.text.trim())
        .map((message) => ({
          role: message.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: message.text }],
        }));
    },
    async callGemini(chatMessages) {
      const history = chatMessages.slice(-8);
      const lastUserMessage = history[history.length - 1]?.text || '';

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: lastUserMessage,
          history,
        }),
      });

      if (!response.ok) {
        const rawText = await response.text();
        let message = rawText;

        try {
          const parsed = JSON.parse(rawText);
          message = parsed?.error || rawText;
        } catch (e) {
          // ignore
        }

        throw new Error(message || 'Gemini API request failed.');
      }

      const data = await response.json();
      const text = data?.text || '';

      if (!text) {
        throw new Error('Gemini API returned no response text.');
      }

      return text;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatScroll;
        if (!container) return;
        container.scrollTop = container.scrollHeight;
      });
    },
  },
}).mount('#app');
