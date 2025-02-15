import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/lib/authContext';
import { MessageCircle, Send, ChevronLeft, ChevronRight } from 'lucide-react';

interface Message {
  id: number;
  userId: number;
  userName: string;
  avatarURL: string;
  text: string;
  mentions: string[];
  timestamp: string;
  isRead?: boolean;
}

interface User {
  id: number;
  userName: string;
  avatarURL: string;
  socketId: string;
}

interface ServerToClientEvents {
  newGroupMessage: (message: Message) => void;
  chatHistory: (messages: Message[]) => void;
  onlineUsers: (users: User[]) => void;
  userOnline: (user: User) => void;
  userOffline: (userId: number) => void;
  mentioned: (data: { from: string; message: string }) => void;
}

interface ClientToServerEvents {
  groupMessage: (message: { text: string }) => void;
  markAsRead: (messageIds: number[]) => void;
}

const ChatPanel: React.FC = () => {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionFilter, setMentionFilter] = useState('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [unreadMentions, setUnreadMentions] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [selectedMentionIndex, setSelectedMentionIndex] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { isAuthenticated, authData, isExpanded, setIsExpanded } = useAuth();

  // Functions
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newMessage !== "@" && newMessage.trim() && socket) {
      socket.emit('groupMessage', { text: newMessage });
      setNewMessage('');
      setShowMentions(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setNewMessage(value);

    const lastWord = value.split(' ').pop() || '';
    if (lastWord.startsWith('@')) {
      setShowMentions(true);
      setMentionFilter(lastWord.slice(1));
      setSelectedMentionIndex(0);
    } else {
      setShowMentions(false);
      setSelectedMentionIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!showMentions) return;

    const filteredUsers = onlineUsers.filter(user =>
      user.userName.toLowerCase().includes(mentionFilter.toLowerCase()) &&
      user.id !== authData.id
    );

    switch (e.key) {
      case 'Tab':
        e.preventDefault();
        if (filteredUsers.length > 0) {
          insertMention(filteredUsers[selectedMentionIndex].userName);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedMentionIndex(prev =>
          prev < filteredUsers.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedMentionIndex(prev =>
          prev > 0 ? prev - 1 : filteredUsers.length - 1
        );
        break;
    }
  };

  const insertMention = (userName: string): void => {
    const words = newMessage.split(' ');
    words[words.length - 1] = `@${userName} `;
    setNewMessage(words.join(' '));
    setShowMentions(false);
  };

  // Mobile detection and keyboard handling effect
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView && !isExpanded) {
        setIsExpanded(false);
      }
    };

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden && isMobile) {
        setIsKeyboardVisible(false);
      }
    };

    // Handle keyboard visibility
    const handleFocus = () => {
      if (isMobile) {
        setIsKeyboardVisible(true);
        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
          scrollToBottom();
        }, 100);
      }
    };

    const handleBlur = () => {
      if (isMobile) {
        setIsKeyboardVisible(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, [isMobile, isExpanded]);

  // Socket setup effect
  useEffect(() => {
    if (!isAuthenticated) return;

    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      withCredentials: true,
      transports: ['polling', 'websocket'],
      auth: { token: localStorage.getItem('authToken') }
    });

    newSocket.on('connect', () => console.log('Connected to socket server'));

    newSocket.on('chatHistory', (history: Message[]) => {
      setMessages(history);
      scrollToBottom();
    });

    newSocket.on('onlineUsers', setOnlineUsers);

    newSocket.on('userOnline', (user: User) => {
      setOnlineUsers(prev => [...prev, user]);
    });

    newSocket.on('userOffline', (userId: number) => {
      setOnlineUsers(prev => prev.filter(user => user.id !== userId));
    });

    newSocket.on('newGroupMessage', (message: Message) => {
      setMessages(prev => [...prev, message]);

      if (message.mentions.includes(authData?.userName || '') && message.userId !== authData?.id) {
        if (!isExpanded) {
          setUnreadMentions(prev => [...prev, message]);
        } else {
          newSocket.emit('markAsRead', [message.id]);
        }
      }
    });

    newSocket.on('mentioned', (data) => {
      if (!isExpanded && Notification.permission === 'granted') {
        new Notification(`@${data.from} mentioned you`, {
          body: data.message
        });
      }
    });

    setSocket(newSocket);
    return () => { newSocket.close(); };
  }, [isAuthenticated, authData?.userName, isExpanded]);

  // Scroll effect
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mark mentions as read effect
  useEffect(() => {
    if (isExpanded && unreadMentions.length > 0 && socket) {
      socket.emit('markAsRead', unreadMentions.map(msg => msg.id));
      setUnreadMentions([]);
    }
  }, [isExpanded, unreadMentions]);

  if (!isAuthenticated || !authData) return null;

  return (
    <div
      className={`fixed transition-all duration-300 ease-in-out z-50 
        ${isExpanded
          ? 'w-full md:w-[320px] right-0 bottom-0 md:top-0'
          : 'w-0 h-0 right-6 bottom-6 md:right-6 md:bottom-6'}`}
      style={{
        height: isExpanded ? (isKeyboardVisible || !isMobile ? '100%' : '80vh') : '48px'
      }}
    >
      {/* Hide expand button on mobile */}
      {isExpanded && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-primary 
            hover:bg-primary-accent p-1 rounded-full shadow-lg hidden md:block 
            transition-opacity duration-300 ease-in-out"
          aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      )}

      <div
        className={`relative w-full h-full transition-all duration-300 ease-in-out
          ${isExpanded
            ? 'bg-[#1F1635] rounded-t-lg md:rounded-none border-l border-gray-800'
            : 'bg-primary rounded-full hover:bg-primary-accent cursor-pointer'
          }`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {isExpanded && (
          <div className="h-full flex flex-col opacity-100 transition-opacity duration-300">
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="font-semibold text-lg">Player Chat</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  {onlineUsers.length + 20} online
                </span>
                {isMobile && (
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.userId === authData.id ? 'flex-row-reverse' : 'flex-row'} w-full`}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={message.avatarURL || '/images/users/default.jpg'}
                      alt={message.userName}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className={`rounded-lg p-2 ${message.userId === authData.id
                    ? 'bg-primary/20'
                    : message.mentions?.includes(authData?.userName)
                      ? 'bg-purple-900/30'
                      : 'bg-gray-800/50'
                    } max-w-[70%]`}>
                    <div className={`flex items-center gap-2 mb-1 ${message.userId === authData.id ? 'justify-end' : ''
                      }`}>
                      <p className="text-sm font-semibold text-primary">
                        {message.userName}
                      </p>
                    </div>
                    <p className={`text-sm whitespace-pre-wrap ${message.userId === authData.id ? 'text-right' : ''
                      }`}>
                      {message.text.split(/(@\w+)|(\s+)/).map((part, i) => {
                        if (!part) return null;
                        return part.startsWith('@') ? (
                          <span key={i} className="text-primary-accent font-semibold bg-primary/10 px-1 rounded">
                            {part}
                          </span>
                        ) : part;
                      })}
                    </p>
                    <p className={`text-xs text-gray-400 mt-1 ${message.userId === authData.id ? 'text-right' : ''
                      }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-2 md:p-4 border-t border-gray-800 bg-[#1F1635]"
            >
              <div className="relative flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="w-full bg-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {showMentions && onlineUsers.length > 0 && (
                    <div className="absolute bottom-full mb-2 w-full bg-gray-800 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {onlineUsers
                        .filter(user =>
                          user.userName.toLowerCase().includes(mentionFilter.toLowerCase()) &&
                          user.id !== authData.id
                        )
                        .map((user, index) => (
                          <div
                            key={user.id}
                            className={`flex items-center gap-2 p-2 cursor-pointer ${selectedMentionIndex === index ? 'bg-primary/20' : 'hover:bg-gray-700'
                              }`}
                            onClick={() => insertMention(user.userName)}
                          >
                            <img
                              src={user.avatarURL || '/images/users/default.jpg'}
                              alt={user.userName}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm">{user.userName}</span>
                            <span className="text-xs text-green-500 ml-auto">online</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-accent p-2 rounded-lg"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) /* : (
          <div className="w-full h-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white transition-transform duration-200 hover:scale-110" />
            {unreadMentions.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-200">
                {unreadMentions.length}
              </span>
            )}
          </div>
        ) */}
      </div>
    </div>
  );
};

export default ChatPanel;