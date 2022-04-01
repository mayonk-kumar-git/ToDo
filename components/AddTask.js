import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import RadioButtonRN from "radio-buttons-react-native";
const statusTypes = [
  {
    label: "To do",
    statusLabel: "todo",
  },
  {
    label: "Done",
    statusLabel: "done",
  },
  {
    label: "Pending task",
    statusLabel: "pending",
  },
  {
    label: "In Progress",
    statusLabel: "progress",
  },
  {
    label: "Cancelled",
    statusLabel: "cancelled",
  },
  {
    label: "DeadLine",
    statusLabel: "deadline",
  },
];

export default function AddTask({ isVisible, setIsVisible }) {
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStatus, setTaskStatus] = React.useState("todo");
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.addTaskContainer}>
          <Text style={styles.label}>Task</Text>
          <TextInput
            style={styles.taskInput}
            multiline={true}
            onChangeText={(text) => {
              setTaskDesc(text);
            }}
            value={taskDesc}
            placeholder="What do you plan to do..."
            keyboardType="default"
          />
          <Text style={styles.label}>Status</Text>
          <RadioButtonRN
            data={statusTypes}
            selectedBtn={(e) => {
              console.log(e.statusLabel);
              setTaskStatus(e.statusLabel);
            }}
            box={false}
            initial={1}
          />
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  addTaskContainer: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: 300,
    borderRadius: 20,
  },
  label: {
    fontSize: 30,
    fontWeight: "bold",
  },
  taskInput: {
    borderWidth: 1,
    borderColor: "#C8C8C8",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  checkbox: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});
