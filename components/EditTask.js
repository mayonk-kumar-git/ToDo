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

export default function EditTask({
  isVisible,
  setIsVisible,
  tasks,
  setTasks,
  clickedTaskId,
  newDeadlineDate,
  setNewDeadlineDate,
  newDeadlineMonth,
  setNewDeadlineMonth,
  newDeadlineYear,
  setNewDeadlineYear,
  newTaskDesc,
  setNewTaskDesc,
  newTaskStatus,
  setNewTaskStatus,
}) {
  if (!clickedTaskId) return <></>;

  // the below code will check the radio button
  var initialRadioButtonState;
  for (let i = 0; i < statusTypes.length; ++i) {
    if (statusTypes[i].statusLabel === newTaskStatus) {
      initialRadioButtonState = i + 1;
      break;
    }
  }

  function saveTaskToList() {
    if (newTaskDesc === "") {
      alert("Task Field can't be empty");
      return;
    }
    if (newTaskStatus === "deadline") {
      if (newDeadlineDate === "") {
        alert("Date Fields can't be empty");
        return;
      }
      if (newDeadlineMonth === "") {
        alert("Month Fields can't be empty");
        return;
      }
      if (newDeadlineYear === "") {
        alert("Year Fields can't be empty");
        return;
      }
    }

    const index = tasks.findIndex((task) => task.id === clickedTaskId);

    var newTaskList = tasks;
    newTaskList[index] = {
      id: clickedTaskId,
      taskDescription: newTaskDesc,
      status: newTaskStatus,
      deadlineDate: newDeadlineDate,
      deadlineMonth: newDeadlineMonth,
      deadlineYear: newDeadlineYear,
    };
    setTasks(newTaskList);
    setIsVisible(false);
  }

  function deleteTask() {
    const newTaskList = tasks.filter((task) => {
      if (task.id !== clickedTaskId) return task;
    });
    setTasks(newTaskList);
    setIsVisible(false);
  }

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.editTaskContainer}>
          <Text style={styles.label}>Task</Text>
          <TextInput
            style={styles.taskInput}
            multiline={true}
            onChangeText={(text) => {
              setNewTaskDesc(text);
            }}
            value={newTaskDesc}
            placeholder="What do you plan to do..."
            keyboardType="default"
          />
          <Text style={styles.label}>Status</Text>
          <RadioButtonRN
            data={statusTypes}
            selectedBtn={(e) => {
              setNewTaskStatus(e.statusLabel);
            }}
            box={false}
            initial={initialRadioButtonState}
          />
          {newTaskStatus === "deadline" ? (
            <View style={styles.datePicker}>
              <TextInput
                style={{ ...styles.datePickerInput, flex: 1 }}
                maxLength={2}
                onChangeText={(date) => {
                  setNewDeadlineDate(date);
                }}
                value={newDeadlineDate}
                placeholder="Date"
                keyboardType="number-pad"
              />
              <TextInput
                style={{ ...styles.datePickerInput, flex: 4 }}
                maxLength={10}
                onChangeText={(month) => {
                  setNewDeadlineMonth(month);
                }}
                value={newDeadlineMonth}
                placeholder="Month"
                keyboardType="default"
              />
              <TextInput
                style={{ ...styles.datePickerInput, flex: 2 }}
                maxLength={4}
                onChangeText={(year) => {
                  setNewDeadlineYear(year);
                }}
                value={newDeadlineYear}
                placeholder="Year"
                keyboardType="number-pad"
              />
            </View>
          ) : (
            <></>
          )}
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={styles.actionButtonSave}
              onPress={() => {
                saveTaskToList();
              }}
            >
              <Text style={styles.actionButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButtonCancle}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Text style={styles.actionButtonText}>Cancle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButtonDelete}
              onPress={() => {
                deleteTask();
              }}
            >
              <Text style={styles.actionButtonText}>Delete</Text>
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
  editTaskContainer: {
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
  actionButtonSave: {
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
    marginHorizontal: 35,
  },
  actionButtonDelete: {
    backgroundColor: "#FF2E2E",
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
