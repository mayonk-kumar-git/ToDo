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
import EditTask from "./components/EditTask.js";
// -------------------------------------------------

export default function App() {
  const [newDeadlineDate, setNewDeadlineDate] = useState("");
  const [newDeadlineMonth, setNewDeadlineMonth] = useState("");
  const [newDeadlineYear, setNewDeadlineYear] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskStatus, setNewTaskStatus] = React.useState("todo");
  const [addTaskVisibility, setAddTaskVisibility] = useState(false);
  const [editTaskVisibility, setEditTaskVisibility] = useState(false);
  const [clickedTaskId, setClickedTaskId] = useState(null);
  const [tasks, setTasks] = useState([
    // {
    //   id: "0",
    //   taskDescription: "Lorem Ipsum is simply dummy text of the printing",
    //   status: "pending",
    //   deadlineDate: "5",
    //   deadlineMonth: "February",
    //   deadlineYear: "2022",
    // },
    // {
    //   id: "1",
    //   taskDescription: "Lorem Ipsum is simply dummy text of the printing",
    //   status: "cancelled",
    //   deadlineDate: "5",
    //   deadlineMonth: "February",
    //   deadlineYear: "2022",
    // },
    // {
    //   id: "2",
    //   taskDescription: "Lorem Ipsum is simply dummy text of the printing",
    //   status: "done",
    //   deadlineDate: "5",
    //   deadlineMonth: "February",
    //   deadlineYear: "2022",
    // },
    // {
    //   id: "3",
    //   taskDescription: "Lorem Ipsum is simply dummy text of the printing",
    //   status: "todo",
    //   deadlineDate: "5",
    //   deadlineMonth: "February",
    //   deadlineYear: "2022",
    // },
    // {
    //   id: "4",
    //   taskDescription: "Lorem Ipsum is simply dummy text of the printing",
    //   status: "progress",
    //   deadlineDate: "5",
    //   deadlineMonth: "February",
    //   deadlineYear: "2022",
    // },
    // {
    //   id: "5",
    //   taskDescription: "Lorem Ipsum is s",
    //   status: "deadline",
    //   deadlineDate: "5",
    //   deadlineMonth: "February",
    //   deadlineYear: "2022",
    // },
    // {
    //   id: "6",
    //   taskDescription: "Lorem Ipsum is simply dummy text of the printing",
    //   status: "deadline",
    //   deadlineDate: "5",
    //   deadlineMonth: "February",
    //   deadlineYear: "2022",
    // },
  ]);
  return (
    <View style={styles.container}>
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
    fontSize: 28,
    fontWeight: "bold",
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
});
