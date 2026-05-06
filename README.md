# Backend Assessment Project

This is a backend project with two small modules.
The first module is a logging utility that sends app logs to an external API.
The second module is a vehicle maintenance scheduler.
It can fetch depot data and schedule tasks within available mechanic hours.

## Folder Structure

```text
logging_middleware/
vehicle_maintenance_scheduler/
screenshots/
notification_system_design.md
```

## Tech Stack

Node.js, Express, Axios, REST APIs, Bearer token auth

## Setup Steps

```bash
git clone https://github.com/Kazimmohamed/2117230040062.git
cd 2117230040062
npm install
node index.js
```

## APIs

| Method | API | Use |
| --- | --- | --- |
| GET | /health | Check if server is running |
| GET | /api/depots | Get depot data from external API |
| POST | /api/schedule | Schedule maintenance tasks |

Note: I kept commits frequent and modules separate so the project is easier to check.
