import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Fab,
  useTheme,
} from '@mui/material';
import {
  Send as SendIcon,
  Mic as MicIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { sendExpenseData } from '../services/api';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const theme = useTheme();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    try {
      await sendExpenseData({
        message: inputText,
        type: 'text',
        timestamp: new Date().toISOString(),
      });

      const systemMessage: Message = {
        id: Date.now(),
        text: 'Đã lưu chi tiêu của bạn!',
        sender: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now(),
        text: 'Có lỗi xảy ra khi lưu chi tiêu. Vui lòng thử lại!',
        sender: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleVoiceInput = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói');
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      setIsRecording(false);
      setInputText(transcript);
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsRecording(true);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64Image = e.target?.result as string;
          await sendExpenseData({
            message: base64Image,
            type: 'image',
            timestamp: new Date().toISOString(),
          });

          const systemMessage: Message = {
            id: Date.now(),
            text: 'Đã lưu hóa đơn của bạn!',
            sender: 'system',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, systemMessage]);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        const errorMessage: Message = {
          id: Date.now(),
          text: 'Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại!',
          sender: 'system',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h1" sx={{ mb: 4, textAlign: 'center' }}>
        Quản lý chi tiêu - Gia đình Hêu
      </Typography>

      <Paper
        elevation={3}
        sx={{
          flex: 1,
          mb: 2,
          p: 2,
          overflow: 'auto',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: '70%',
                backgroundColor:
                  message.sender === 'user'
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
                color:
                  message.sender === 'user'
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                borderRadius: 2,
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {message.timestamp.toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Nhập chi tiêu của bạn..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton
          color={isRecording ? 'error' : 'primary'}
          onClick={handleVoiceInput}
        >
          <MicIcon />
        </IconButton>
        <IconButton
          component="label"
          color="primary"
        >
          <ImageIcon />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </IconButton>
        <Fab
          color="primary"
          size="small"
          onClick={handleSend}
          disabled={!inputText.trim()}
        >
          <SendIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default ChatInterface; 