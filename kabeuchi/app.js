const { createApp } = Vue;
const CHAT_API_URL = window.CHAT_API_URL || '/api/chat';
const GAS_HISTORY_URL = window.GAS_HISTORY_URL || '';
const SESSION_ID = (() => {
  const storageKey = 'gemini-kabeuchi-session-id';
  const existingId = window.sessionStorage?.getItem(storageKey);
  if (existingId) {
    return existingId;
  }

  const newId = `session-${new Date().toISOString().replace(/[-:.TZ]/g, '')}-${Math.random().toString(36).slice(2, 8)}`;
  window.sessionStorage?.setItem(storageKey, newId);
  return newId;
})();

createApp({
  data() {
    const now = new Date();
    const jstFormatter = new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const parts = jstFormatter.formatToParts(now);
    const values = {};

    for (const part of parts) {
      if (part.type !== 'literal') {
        values[part.type] = part.value;
      }
    }

    return {
      appVersion: `v${values.year}.${values.month}.${values.day}-${values.hour}:${values.minute}JST`,
      draft: '',
      isLoading: false,
      connectionStatus: '準備中',
      messages: [
        {
          id: 1,
          role: 'assistant',
          text: 'こんにちは。アイデアの壁打ちをしませんか？何か考えていることや悩んでいることを一言だけでも教えてください。',
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
  methods: {
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
      await this.saveHistory(userMessage);

      try {
        this.connectionStatus = '接続確認中';
        const reply = await this.callGemini(this.messages);
        this.connectionStatus = '接続成功';
        this.messages.push({
          id: Date.now() + 1,
          role: 'assistant',
          text: reply,
        });
        await this.saveHistory(this.messages[this.messages.length - 1]);
      } catch (error) {
        this.connectionStatus = '接続エラー';
        const errorText = error?.message || '不明なエラー';
        const guidance = /high demand|429|temporarily/i.test(errorText)
          ? 'Gemini が一時的に混雑しています。少し待ってから、もう一度送信してください。'
          : 'Vercel の環境変数 GEMINI_API_KEY が設定されているか、利用制限や有効期限がないかを確認してください。';

        this.messages.push({
          id: Date.now() + 2,
          role: 'assistant',
          text: `Gemini API の呼び出しでエラーが発生しました。\n\n${errorText}\n\n${guidance}`,
        });
      } finally {
        this.isLoading = false;
        this.scrollToBottom();
      }
    },
    async loadHistory() {
      if (!GAS_HISTORY_URL) {
        return;
      }

      try {
        const response = await fetch(`${GAS_HISTORY_URL}?action=loadHistory`, {
          method: 'GET',
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        const messages = Array.isArray(data?.messages) ? data.messages : [];

        if (messages.length > 0) {
          this.messages = messages
            .filter((message) => message && message.text)
            .map((message) => ({
              id: Number(message.id) || Date.now() + Math.random(),
              role: message.role === 'assistant' ? 'assistant' : 'user',
              text: String(message.text),
            }));
          this.$nextTick(() => this.scrollToBottom());
        }
      } catch (error) {
        console.warn('履歴の読み込みに失敗しました:', error);
      }
    },
    async saveHistory(message) {
      if (!GAS_HISTORY_URL || !message) {
        return;
      }

      try {
        const payload = {
          action: 'saveHistory',
          sessionId: SESSION_ID,
          messages: [message],
        };

        await fetch(GAS_HISTORY_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.warn('履歴の保存に失敗しました:', error);
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
      const history = chatMessages.slice(0, -1).slice(-8);
      const lastUserMessage = chatMessages[chatMessages.length - 1]?.text || '';

      const response = await fetch(CHAT_API_URL, {
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
