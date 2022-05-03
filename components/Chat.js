import React, {Component} from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import * as firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPgLC7Qyh1--wSN0BHpVnAobZMHIRHSRk",
  authDomain: "chatapp-78c69.firebaseapp.com",
  projectId: "chatapp-78c69",
  storageBucket: "chatapp-78c69.appspot.com",
  messagingSenderId: "183180350158",
  appId: "1:183180350158:web:260d16d0edc6501f7a769f",
  measurementId: "G-28XT9KBNF6"
};

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection("messages");

  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
  }

  componentDidMount() {
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name});

    his.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    if (this.state.isConnected) {
      // stop listening to authentication
      this.authUnsubscribe();
      // stop listening for changes
      this.unsubscribe();
    }
  }


  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || "",
      location: message.location || null,
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {
    //change background color
    let {bgColor} = this.props.route.params
    //using the name from start.js
    

    return (
      <View style={{backgroundColor: bgColor, flex: 1}}>
        <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  };
}