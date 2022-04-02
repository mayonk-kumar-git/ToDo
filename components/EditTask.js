import React, { useState, useLayoutEffect } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datepickerDate, setDatepickerDate] = useState(new Date());

  function onChangeDate(event, selectedDate) {
    //[IMPORTANT]: This setShowDatePicker should be the first line of this function, because the useState is a async function so if it is written at the end then it will asyncly update the value which will reasult in a glitchy effect when pressed the ok of the calender
    setShowDatePicker(false);
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const pickedDate = selectedDate || datepickerDate;
    setDatepickerDate(pickedDate);
    setNewDeadlineDate(pickedDate.getDate());
    setNewDeadlineMonth(month[pickedDate.getMonth()]);
    setNewDeadlineYear(pickedDate.getFullYear());
    // setShowDatePicker(false);
    // console.log("showDatePicker : ", showDatePicker);
  }
  // the below code is used to check the radio button option initially
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
      {showDatePicker ? (
        <DateTimePicker value={datepickerDate} onChange={onChangeDate} />
      ) : (
        <></>
      )}
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
            <TouchableOpacity
              onPress={() => {
                setShowDatePicker(true);
              }}
            >
              <View style={styles.datePicker}>
                <Text style={{ ...styles.datePickerDisplay, flex: 1 }}>
                  {newDeadlineDate}
                </Text>
                <Text style={{ ...styles.datePickerDisplay, flex: 3 }}>
                  {newDeadlineMonth}
                </Text>
                <Text style={{ ...styles.datePickerDisplay, flex: 2 }}>
                  {newDeadlineYear}
                </Text>
              </View>
            </TouchableOpacity>
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
  datePickerDisplay: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C8C8C8",
    backgroundColor: "#C8C8C8",
    borderRadius: 10,
    padding: 10,
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
