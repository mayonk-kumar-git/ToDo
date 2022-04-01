import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
// -------------------------------------------------
import TaskItems from "./components/TaskItems";
import AddTask from "./components/AddTask";
// -------------------------------------------------

export default function App() {
  const [addTaskVisibility, setAddTaskVisibility] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: "0",
      taskDescription: "Lorem Ipsum is simply dummy text of the printing",
      status: "pending",
      deadlineDate: "5",
      deadlineMonth: "February",
      deadlineYear: "2022",
    },
    {
      id: "1",
      taskDescription: "Lorem Ipsum is simply dummy text of the printing",
      status: "cancelled",
      deadlineDate: "5",
      deadlineMonth: "February",
      deadlineYear: "2022",
    },
    {
      id: "2",
      taskDescription: "Lorem Ipsum is simply dummy text of the printing",
      status: "done",
      deadlineDate: "5",
      deadlineMonth: "February",
      deadlineYear: "2022",
    },
    {
      id: "3",
      taskDescription: "Lorem Ipsum is simply dummy text of the printing",
      status: "todo",
      deadlineDate: "5",
      deadlineMonth: "February",
      deadlineYear: "2022",
    },
    {
      id: "4",
      taskDescription: "Lorem Ipsum is simply dummy text of the printing",
      status: "progress",
      deadlineDate: "5",
      deadlineMonth: "February",
      deadlineYear: "2022",
    },
    {
      id: "5",
      taskDescription: "Lorem Ipsum is simply dummy text of the printing",
      status: "deadline",
      deadlineDate: "5",
      deadlineMonth: "February",
      deadlineYear: "2022",
    },
    {
      id: "6",
      taskDescription: "Lorem Ipsum is simply dummy text of the printing",
      status: "deadline",
      deadlineDate: "5",
      deadlineMonth: "February",
      deadlineYear: "2022",
    },
  ]);
  return (
    <View style={styles.container}>
      <AddTask
        isVisible={addTaskVisibility}
        setIsVisible={setAddTaskVisibility}
      />
      <Text style={styles.heading}>To-do List</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItems task={item} />}
        keyExtractor={(task) => task.id}
      />
      <TouchableOpacity
        onPress={() => {
          console.log("Add button pressed");
          setAddTaskVisibility(true);
        }}
        style={styles.addTaskButton}
      >
        <View style={styles.addTaskButtonContainer}>
          <Text style={styles.addTaskButtonText}>+</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    padding: 20,
  },
  heading: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
  },
  addTaskButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addTaskButtonContainer: {
    backgroundColor: "#8A96FF",
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addTaskButtonText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
