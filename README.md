# 🛡️ SecureGuard

SecureGuard is a VS Code extension that helps developers identify security issues in real time while coding.

## Features

Hardcoded Password Detection

- OpenAI API Key Detection
- GitHub Token Detection
- JWT Token Detection
- AWS Access Key Detection
- Private Key Detection
- Dangerous eval() Detection
- Dangerous exec() Detection
- Workspace Security Scan
- Click-to-Navigate Findings
- Severity Levels (Critical, High, Medium)

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
