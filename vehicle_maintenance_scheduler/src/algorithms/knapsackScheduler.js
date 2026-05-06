'use strict';

// Computes the highest-value task selection within a mechanic-hour budget using 0/1 knapsack DP.
function optimizeTaskSchedule(mechanicHours, tasks) {
  const taskCount = tasks.length;
  const dp = Array.from({ length: taskCount + 1 }, function buildRow() {
    return Array(mechanicHours + 1).fill(0);
  });

  for (let taskIndex = 1; taskIndex <= taskCount; taskIndex += 1) {
    const currentTask = tasks[taskIndex - 1];

    for (let hourBudget = 0; hourBudget <= mechanicHours; hourBudget += 1) {
      dp[taskIndex][hourBudget] = dp[taskIndex - 1][hourBudget];

      if (currentTask.duration <= hourBudget) {
        const includedScore =
          dp[taskIndex - 1][hourBudget - currentTask.duration] + currentTask.score;

        if (includedScore > dp[taskIndex][hourBudget]) {
          dp[taskIndex][hourBudget] = includedScore;
        }
      }
    }
  }

  const selectedTasks = [];
  let remainingHours = mechanicHours;

  for (let taskIndex = taskCount; taskIndex > 0; taskIndex -= 1) {
    if (dp[taskIndex][remainingHours] !== dp[taskIndex - 1][remainingHours]) {
      const selectedTask = tasks[taskIndex - 1];
      selectedTasks.unshift(selectedTask);
      remainingHours -= selectedTask.duration;
    }
  }

  const totalHours = selectedTasks.reduce(function sumHours(total, task) {
    return total + task.duration;
  }, 0);

  return {
    selectedTasks,
    totalScore: dp[taskCount][mechanicHours],
    totalHours,
  };
}

module.exports = {
  optimizeTaskSchedule,
};
