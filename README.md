# 🛡️ SecureGuard

SecureGuard is a VS Code extension that helps developers identify security issues in real time while coding.

## Features

* Detect hardcoded passwords
* Detect OpenAI API keys
* Detect GitHub tokens
* Detect dangerous functions such as `eval()`
* Real-time warnings in the VS Code Problems panel

## Example

```javascript
const password = "admin123";

const apiKey = "sk-xxxxxxxxxxxxxxxxxxxxxxxx";

eval(userInput);
```

SecureGuard will immediately flag these as potential security risks.

## Roadmap

* AWS key detection improvements
* JWT token detection
* Severity levels
* Security sidebar
* VS Code Marketplace release

## Installation

Coming soon via the VS Code Marketplace.
