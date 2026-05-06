# Logging Middleware

This module has one centralized `Log()` function.
It takes level, package name, message, and optional stack trace.
It validates the input first, then sends the log to the external API using axios.
The request uses bearer token auth.

Centralized logging is better than writing `console.log` everywhere because all logs follow one format.
It also makes the code cleaner and easier to debug later.

## Allowed Levels

| Level | Meaning |
| --- | --- |
| CRITICAL | Very serious issue |
| WARNING | Something may go wrong |
| INFO | Normal app update |
| DEBUG | Extra detail for checking code |

## Examples

```js
Log('backend', 'info', 'service', 'server started');
Log('backend', 'error', 'controller', 'invalid request body');
Log('backend', 'debug', 'utils', 'checking schedule input');
```

## Files

`logger.js` has the main logging function.
`routes` can call logging before sending responses.
`controllers` can log request flow and errors.
