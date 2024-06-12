import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ChatPage = ({ route }) => {
  const { userId } = route.params;
  const [recipientId, setRecipientId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const fetchRecipientId = async () => {
      // Replace with your logic to get the last logged-in user
      const user = auth().currentUser;
      if (user) {
        setRecipientId(user.uid);
      } else {
        Alert.alert('Error', 'No recipient found. Please log in.');
      }
    };

    fetchRecipientId();
  }, []);

  useEffect(() => {
    console.log('recipients', recipientId);
    console.log('user',userId);
    if (recipientId) {
      const unsubscribe = firestore()
        .collection('chats')
        .doc(getChatId(userId, recipientId))
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            senderId: doc.data().senderId,
          }));
          setMessages(messages);
        });

      return () => unsubscribe();
    }
  }, [userId, recipientId]);

  const getChatId = (userId, recipientId) => {
    return userId > recipientId
      ? `${userId}_${recipientId}`
      : `${recipientId}_${userId}`;
  };

  async function handleSendMessage() {
    if (inputMessage.trim() && recipientId) {
      const newMessage = {
        text: inputMessage,
        timestamp: firestore.FieldValue.serverTimestamp(),
        senderId: userId,
        recipientId: recipientId,
        status: 'sent',
      };
  
      try {
        const chatId = getChatId(userId, recipientId);
  
        // Add message to the chat collection
        await firestore()
          .collection('chats')
          .doc(chatId)
          .collection('messages')
          .add(newMessage);
  
        // Clear the input box after message is sent
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
        Alert.alert('Error', 'Failed to send message. Please try again.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((item) => (
          <View
            key={item.id}
            style={[
              styles.messageContainer,
              item.senderId === userId
                ? styles.myMessage
                : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#e60000',
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatPage;
