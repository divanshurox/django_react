import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  TouchableHighlight,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../components/Header";
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const io = require("socket.io-client");
let socket;

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sentBy, setSentBy] = useState(false);
  const [members, setMembers] = useState([]);
  const [showModal, setModal] = useState(false);

  const ENDPOINT = "http://192.168.0.102:5000";
  const { username, room } = route.params;

  navigation.setOptions({
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Users"
            onPress={() => {
              setModal(true);
            }}
            iconName="user"
          />
        </HeaderButtons>
      );
    },
  });

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit(
      "join",
      {
        username,
        room,
      },
      ({ err }) => {
        console.log(err);
      }
    );

    return () => {
      socket.emit("disconnect", () => {
        console.log("User left");
      });
      socket.off();
    };
  }, [route.params]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("members", (roomInfo) => {
      setMembers(roomInfo.users);
    });
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit("send message", message, () => setMessage(""));
      setMessage("");
    }
  };

  console.log(members);

  const renderMessages = ({ item }) => {
    return (
      <View style={styles.row}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg",
          }}
        />
        <View style={styles.rowText}>
          <Text style={styles.sender}>{item.user}</Text>
          <Text style={styles.message}>{item.text}</Text>
        </View>
      </View>
    );
  };

  if (showModal) {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Users</Text>
              {members.map((ele, i) => {
                return (
                  <View style={styles.memberName} key={i}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      {i + 1}: {ele.username}{" "}
                      <Text style={{ color: "#ccc" }}>
                        #{ele.id.substring(0, 6)}
                      </Text>
                    </Text>
                  </View>
                );
              })}
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModal(!showModal);
                }}
              >
                <Text style={styles.textStyle}>Go Back</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModal(true);
          }}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View>
      <Header room={room} />
      <FlatList data={messages} renderItem={renderMessages} />
      <KeyboardAvoidingView behavior="height">
        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity style={styles.btn} onPress={sendMessage}>
            <FontAwesome name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    height: 50,
    width: "80%",
  },
  btn: {
    backgroundColor: "dodgerblue",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rowText: {
    flex: 1,
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: "bold",
    paddingRight: 10,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  memberName: {
    marginVertical: 20,
  },
});
