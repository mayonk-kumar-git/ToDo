import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
// -------------------------------------------------
import RadioButtonRN from "radio-buttons-react-native";
// -------------------------------------------------
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

export default function AddTask({ isVisible, setIsVisible, tasks, setTasks }) {
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineMonth, setDeadlineMonth] = useState("");
  const [deadlineYear, setDeadlineYear] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStatus, setTaskStatus] = React.useState("todo");

  function addTaskToList() {
    if (taskDesc === "") {
      alert("Task Field can't be empty");
      return;
    }
    if (taskStatus === "deadline") {
      if (deadlineDate === "") {
        alert("Date Fields can't be empty");
        return;
      }
      if (deadlineMonth === "") {
        alert("Month Fields can't be empty");
        return;
      }
      if (deadlineYear === "") {
        alert("Year Fields can't be empty");
        return;
      }
    }
    // since all the tasks must have a unique id
    const curdate = new Date();
    const id = curdate.toString();
    const newTaskList = [
      ...tasks,
      {
        id: id,
        taskDescription: taskDesc,
        status: taskStatus,
        deadlineDate: deadlineDate,
        deadlineMonth: deadlineMonth,
        deadlineYear: deadlineYear,
      },
    ];
    setDeadlineDate("");
    setDeadlineMonth("");
    setDeadlineYear("");
    setTaskDesc("");
    setTaskStatus("todo");

    setTasks(newTaskList);
    setIsVisible(false);
  }
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
              // console.log(e.statusLabel);
              setTaskStatus(e.statusLabel);
            }}
            box={false}
            initial={1}
          />
          {taskStatus === "deadline" ? (
            <View style={styles.datePicker}>
              <TextInput
                style={{ ...styles.datePickerInput, flex: 1 }}
                maxLength={2}
                onChangeText={(date) => {
                  setDeadlineDate(date);
                }}
                value={deadlineDate}
                placeholder="Date"
                keyboardType="number-pad"
              />
              <TextInput
                style={{ ...styles.datePickerInput, flex: 4 }}
                maxLength={10}
                onChangeText={(month) => {
                  setDeadlineMonth(month);
                }}
                value={deadlineMonth}
                placeholder="Month"
                keyboardType="default"
              />
              <TextInput
                style={{ ...styles.datePickerInput, flex: 2 }}
                maxLength={4}
                onChangeText={(year) => {
                  setDeadlineYear(year);
                }}
                value={deadlineYear}
                placeholder="Year"
                keyboardType="number-pad"
              />
            </View>
          ) : (
            <></>
          )}
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={styles.actionButtonAdd}
              onPress={() => {
                addTaskToList();
              }}
            >
              <Text style={styles.actionButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButtonCancle}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Text style={styles.actionButtonText}>Cancle</Text>
            </TouchableOpacity>
          </View>
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
  datePicker: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#C8C8C8",
    borderRadius: 10,
    marginVertical: 10,
  },
  datePickerInput: {
    borderWidth: 1,
    borderColor: "#C8C8C8",
    backgroundColor: "#C8C8C8",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  actionButtonContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButtonAdd: {
    backgroundColor: "#2AD400",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  actionButtonCancle: {
    backgroundColor: "#8A96FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
