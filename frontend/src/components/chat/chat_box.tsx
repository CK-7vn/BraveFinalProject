import { useState, useEffect, useRef } from 'react';
import styles from './chat_box.module.css';


let messageIdCounter = 0;

function ChatBox() {
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: string }>>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatLogsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scrollTop = chatLogsRef.current.scrollHeight;
    }
  }, [messages]);

  const generateMessageId = () => {
    return messageIdCounter++;
  }

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const messageId = generateMessageId();
    const newMessage = { id: messageId, text: input, sender: 'self' };

    console.log('Before sending message: ', Array.from(messages.entries()));

    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage];
      console.log("updated messages after self messages", updatedMessages)
      return updatedMessages;
    })

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "tinyllama",
          prompt: input,
          stream: true
        }),
      });

      let fullResponse = '';
      let buffer = '';
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        buffer += chunk;

        let newlineIndex;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          try {
            const data = JSON.parse(line);
            if (data.response) {
              fullResponse += data.response;
            }
            if (data.done) break;
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }

        }
      }
      if (fullResponse) {
        const aiMessageId = generateMessageId();
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages, { id: aiMessageId, text: fullResponse, sender: 'ai' }]
          return updatedMessages;
        })
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
