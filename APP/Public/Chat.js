import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ChatPage = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

//   useEffect(() => {
//     const unsubscribe = firestore()
//       .collection('chats')
//       .doc(userId)
//       .collection('messages')
//       .orderBy('timestamp', 'asc')
//       .onSnapshot(querySnapshot => {
//         const messages = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           text: doc.data().text,
//           timestamp: doc.data().timestamp,
//         }));
//         setMessages(messages);
//       });

//     return () => unsubscribe();
//   }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = {
        text: inputMessage,
        timestamp: firestore.FieldValue.serverTimestamp(),
      };
      await firestore()
        .collection('chats')
        .doc(userId)
        .collection('messages')
        .add(newMessage);
      setInputMessage('');
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        <View
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
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
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
    maxWidth: '80%',
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
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default ChatPage;
