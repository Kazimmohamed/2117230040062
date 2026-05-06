# Vehicle Maintenance Scheduler

This module schedules vehicle maintenance tasks.
A depot has limited mechanic hours.
Each task has a duration and an importance score.
The goal is to choose tasks with the highest total score without going over the hours.

This is similar to the knapsack problem.
For this version, a greedy approach was used to keep it simple.

## Folder Breakdown

`index.js` starts the app entry point.
`routes` stores API route files.
`controllers` handles request and response logic.
`services` keeps business logic and external API calls.
`algorithms` stores the scheduling logic.
`middleware` stores logging and error middleware.
`config` stores app and API settings.

## APIs

### GET /health

Response:

```json
{
  "success": true,
  "message": "Vehicle maintenance scheduler running"
}
```

### GET /api/depots

Response:

```json
{
  "success": true,
  "data": []
}
```

### POST /api/schedule

Request:

```json
{
  "mechanicHours": 8,
  "tasks": [
    {
      "id": 1,
      "duration": 2,
      "score": 40
    }
  ]
}
```

Response:

```json
{
  "selectedTasks": [],
  "totalScore": 120,
  "totalHours": 8
}
```

## Algorithm Steps

1. Read mechanic hours and task list.
2. Check task duration and score.
3. Pick tasks that give better score inside available hours.
4. Return selected tasks, total score, and used hours.

## Setup

```bash
cd vehicle_maintenance_scheduler
npm install
npm start
```
