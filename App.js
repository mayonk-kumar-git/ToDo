import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
// -------------------------------------------------
import AsyncStorage from "@react-native-async-storage/async-storage";
// -------------------------------------------------
import TaskItems from "./components/TaskItems";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask.js";
// -------------------------------------------------

export default function App() {
  useEffect(() => {
    AsyncStorage.getItem("taskList").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("taskList", "[]");
        setTasks([]);
      } else {
        setTasks(JSON.parse(value));
      }
    });
  }, []);
  useEffect(() => {
    // console.log("storing the data : ", JSON.stringify(tasks));
    AsyncStorage.setItem("taskList", JSON.stringify(tasks));
  });

  const [newDeadlineDate, setNewDeadlineDate] = useState("Date");
  const [newDeadlineMonth, setNewDeadlineMonth] = useState("Month");
  const [newDeadlineYear, setNewDeadlineYear] = useState("Year");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskStatus, setNewTaskStatus] = React.useState("todo");
  const [addTaskVisibility, setAddTaskVisibility] = useState(false);
  const [editTaskVisibility, setEditTaskVisibility] = useState(false);
  const [clickedTaskId, setClickedTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("./assets/backgroundImage.jpg")}
        blurRadius={50}
        resizeMode="contain"
      />
      <AddTask
        isVisible={addTaskVisibility}
        setIsVisible={setAddTaskVisibility}
        tasks={tasks}
        setTasks={setTasks}
      />
      <EditTask
        isVisible={editTaskVisibility}
        setIsVisible={setEditTaskVisibility}
        tasks={tasks}
        setTasks={setTasks}
        clickedTaskId={clickedTaskId}
        newDeadlineDate={newDeadlineDate}
        setNewDeadlineDate={setNewDeadlineDate}
        newDeadlineMonth={newDeadlineMonth}
        setNewDeadlineMonth={setNewDeadlineMonth}
        newDeadlineYear={newDeadlineYear}
        setNewDeadlineYear={setNewDeadlineYear}
        newTaskDesc={newTaskDesc}
        setNewTaskDesc={setNewTaskDesc}
        newTaskStatus={newTaskStatus}
        setNewTaskStatus={setNewTaskStatus}
      />
      <Text style={styles.heading}>To-do List</Text>
      {tasks.length === 0 ? (
        <Text style={styles.noTaskWatermark}>No Task to complete!!</Text>
      ) : (
        <></>
      )}
      <FlatList
        data={tasks}
        contentContainerStyle={{ padding: 10 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TaskItems
            task={item}
            isVisible={editTaskVisibility}
            setIsVisible={setEditTaskVisibility}
            tasks={tasks}
            setTasks={setTasks}
            setClickedTaskId={setClickedTaskId}
            setNewDeadlineDate={setNewDeadlineDate}
            setNewDeadlineMonth={setNewDeadlineMonth}
            setNewDeadlineYear={setNewDeadlineYear}
            setNewTaskDesc={setNewTaskDesc}
            setNewTaskStatus={setNewTaskStatus}
          />
        )}
        keyExtractor={(task) => task.id}
      />
      <TouchableOpacity
        onPress={() => {
          setAddTaskVisibility(true);
        }}
        style={styles.addTaskButton}
      >
        <View style={[styles.addTaskButtonContainer, styles.shadowEffect]}>
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
  backgroundImage: {
    position: "absolute",
  },
  heading: {
    marginTop: 40,
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 15,
  },
  noTaskWatermark: {
    fontSize: 20,
    color: "#B0B0B0",
    position: "absolute",
    top: 400,
    left: 120,
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
  shadowEffect: {
    ...Platform.select({
      ios: {
        shadowColor: rgba(0, 0, 0),
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
