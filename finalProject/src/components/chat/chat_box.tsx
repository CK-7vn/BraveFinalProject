import { useState, useEffect, useRef } from 'react';
import styles from './chat_box.module.css';

function ChatBox() {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatLogsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scrollTop = chatLogsRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'self' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "llama3",
          prompt: input,
          stream: true
        }),
      });

      let fullResponse = '';
      let jsonBuffer = '';
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        jsonBuffer += chunk;

        let newlineIndex;
        while ((newlineIndex = jsonBuffer.indexOf('\n')) !== -1) {
          const line = jsonBuffer.slice(0, newlineIndex);
          jsonBuffer = jsonBuffer.slice(newlineIndex + 1);

          try {
            const data = JSON.parse(line);
            if (data.response) {
              fullResponse += data.response;
              setMessages(prevMessages => {
                const updatedMessages = [...prevMessages];
                if (updatedMessages[updatedMessages.length - 1].sender === 'user') {
                  updatedMessages.push({ text: fullResponse, sender: 'user' });
                } else {
                  updatedMessages[updatedMessages.length - 1].text = fullResponse;
                }
                return updatedMessages;
              });
            }
            if (data.done) break;
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    console.log("Chat toggled", !isOpen)
  };

  return (
    <>
      {!isOpen && (
        <div className={styles.chatCircle} onClick={toggleChat}>
          <i className="fa fa-comments"></i>
        </div>
      )}
      {isOpen && (
        <div className={`${styles.chatBox} ${styles.chatBoxOpen}`}>
          <div className={styles.chatBoxHeader} >
            Questions?
            <span className={styles.chatBoxToggle} onClick={toggleChat}>
              <i className="fa fa-minus">Close</i>
            </span>
          </div>
          <div className={styles.chatBoxBody}>
            <div className={styles.chatLogs} ref={chatLogsRef}>
              {messages.map((message, index) => (
                <div key={index} className={`${styles.chatMsg} ${styles[message.sender]}`}>
                  <div className={styles.cmMsgText}>{message.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.chatInput}>
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <input
                type="text"
                className={styles.chatInput}
                placeholder="Send a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className={styles.chatSubmit}>
                <i className="fa fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;
