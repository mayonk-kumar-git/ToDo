import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

function StatusIcon({ status }) {
  switch (status) {
    case "cancelled": {
      return <Image source={require("../Icons/Cancelled.png")} />;
    }
    case "deadline": {
      return <Image source={require("../Icons/DeadLine.png")} />;
    }
    case "done": {
      return <Image source={require("../Icons/Done.png")} />;
    }
    case "pending": {
      return <Image source={require("../Icons/Pending.png")} />;
    }
    case "progress": {
      return <Image source={require("../Icons/Progress.png")} />;
    }
    default: {
      return <Image source={require("../Icons/ToDo.png")} />;
    }
  }
}

export default function TaskItems({ task }) {
  return (
    <View style={styles.container}>
      {task.status === "deadline" ? (
        <View style={styles.deadlineDateMonthYearWrapper}>
          <Text
            style={styles.deadlineDateMonthYearText}
          >{`${task.deadlineDate} ${task.deadlineMonth}, ${task.deadlineYear} `}</Text>
        </View>
      ) : (
        <></>
      )}
      <StatusIcon status={task.status} />
      <Text style={styles.taskDesc}>{task.taskDescription}</Text>
      <TouchableOpacity
        onPress={() => {
          console.log(task.id);
        }}
      >
        <Image source={require("../Icons/More.png")} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  taskDesc: {
    flex: 1,
    fontSize: 16,
    margin: 10,
    maxWidth: "75%",
  },
  deadlineDateMonthYearWrapper: {
    position: "absolute",
    top: -5,
    left: "39%",
    backgroundColor: "#FF2E2E",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "#fff",
  },
  deadlineDateMonthYearText: {
    color: "white",
  },
});
