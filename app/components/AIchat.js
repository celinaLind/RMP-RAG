import React, { useState } from 'react';
import { Grid, Typography, Box, Button, TextField, Stack } from '@mui/material'


export default function Home() {
    const [messages, setMessages] = useState([
      {
        role: "assistant",
        content: "Hi! I'm the Rate My Professionals support assistant. How can I help you today?"
      }
    ]);
  
    const [message, setMessage] = useState('');
  
    const sendMessage = async () => {
      setMessages((messages) => [
        ...messages,
        { role: "user", content: message },
        { role: "assistant", content: '' },
      ]);
      setMessage('');
  
      const response = fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      }).then(async (res) => {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let result = '';
  
        return reader.read().then(function processText({ done, value }) {
          if (done) {
            return result;
          }
          const text = decoder.decode(value || new Uint8Array(), { stream: true });
          setMessages((messages) => {
            let lastMessage = messages[messages.length - 1];
            let otherMessages = messages.slice(0, messages.length - 1);
            return [
              ...otherMessages,
              { ...lastMessage, content: lastMessage.content + text },
            ];
          });
          return reader.read().then(processText);
        });
      });
    };
  
    return (
      <div>
  
        <Box
          width="700px"
          height="500px"
          margin="0 -10%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom="300px"
    
        >
          <Stack
            direction="column"
            width="100%"
            height="90%"
            
            p={2}
            spacing={3}
            bgcolor="#005744"
          >
            <Stack
              direction="column"
              spacing={2}
              flexGrow={1}
              overflow="auto"
              maxHeight="100%"
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={message.role === "assistant" ? 'flex-start' : 'flex-end'}
                >
                  <Box
                    bgcolor={message.role === 'assistant' ? "#fff" : "#662c90"}
                    borderRadius={4}
                    color="#000"
                    p={3}
                  >
                    {message.content}
                  </Box>
                </Box>
              ))}
            </Stack>
            <Stack
              direction="row"
              spacing={2}
            >
              <TextField
                label="Message"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ bgcolor: '#fff', borderRadius: '5px' }}
              />
              <Button
                variant="contained"
                onClick={sendMessage}
                sx={{ bgcolor: '#ff5722', color: '#fff' }}
              >
                Send
              </Button>
            </Stack>
          </Stack>
        </Box>
      </div>
    );
  }