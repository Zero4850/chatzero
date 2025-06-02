import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input) return
    setLoading(true)
    const userMsg = { role: 'user', content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    try {
      const res = await axios.post('/api/chat', { messages: newMessages })
      setMessages([...newMessages, res.data])
    } catch (err) {
      alert('خطأ في الاتصال بـ OpenAI')
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>🔮 دردشة ذكاء اصطناعي</h1>
      <div style={{ minHeight: 300, border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}><b>{msg.role}:</b> {msg.content}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="اكتب سؤالك..."
        style={{ width: '80%', padding: 10 }}
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: 10 }}>
        {loading ? 'جاري الإرسال...' : 'إرسال'}
      </button>
    </div>
  )
}