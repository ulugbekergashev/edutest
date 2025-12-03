import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/mockDb';
import { User, Message } from '../types';
import { Icons } from '../components/Icons';

interface ChatProps {
  currentUser: User | null;
}

export const Chat: React.FC<ChatProps> = ({ currentUser }) => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [group, setGroup] = useState(db.getGroup(groupId || ''));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (groupId) {
      const g = db.getGroup(groupId);
      if (!g) {
        navigate(-1);
        return;
      }
      setGroup(g);
      // Simulate fetching
      const msgs = db.getMessages(groupId);
      setMessages(msgs);
    }
  }, [groupId, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !groupId) return;

    const msg = db.sendMessage(groupId, currentUser.id, newMessage);
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  if (!group || !currentUser) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            <Icons.Groups className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">{group.name}</h2>
            <p className="text-xs text-slate-500">{db.getGroupStudents(group.id).length} participants</p>
          </div>
        </div>
        <div className="flex space-x-2">
            <a href={group.zoomLink} target="_blank" rel="noreferrer" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Join Zoom">
                <Icons.Zoom className="w-5 h-5" />
            </a>
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
                <Icons.More className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isMe = msg.userId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              {!isMe && (
                <img 
                  src={msg.senderAvatar || `https://ui-avatars.com/api/?name=${msg.senderName}`} 
                  alt={msg.senderName} 
                  className="w-8 h-8 rounded-full mr-2 self-end mb-1"
                />
              )}
              <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                 {!isMe && <span className="text-xs text-slate-500 ml-1 mb-1">{msg.senderName}</span>}
                 <div className={`px-4 py-2 rounded-2xl shadow-sm text-sm ${
                    isMe 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                 }`}>
                    {msg.content}
                 </div>
                 <span className="text-[10px] text-slate-400 mt-1 mx-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};