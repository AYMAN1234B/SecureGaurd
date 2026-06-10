export interface SecurityIssue {
  line: number;
  message: string;
  severity: 'critical' | 'high' | 'medium';
}

export function scanSecrets(
  text: string
): SecurityIssue[] {

  const issues: SecurityIssue[] = [];

  const lines = text.split('\n');

  lines.forEach((line, index) => {

    if (/password\s*=\s*["'][^"']+["']/i.test(line)) {
      issues.push({
        line: index,
        message: 'Hardcoded password detected',
        severity: 'medium'
      });
    }

    if (/sk-[A-Za-z0-9]{20,}/.test(line)) {
      issues.push({
        line: index,
        message: 'Possible OpenAI API Key detected',
        severity: 'critical'
      });
    }

    if (/AKIA[0-9A-Z]{16}/.test(line)) {
      issues.push({
        line: index,
        message: 'Possible AWS Access Key detected',
        severity: 'critical'
      });
    }

    if (/ghp_[A-Za-z0-9]{36}/.test(line)) {
      issues.push({
        line: index,
        message: 'Possible GitHub Token detected',
        severity: 'critical'
      });
    }

    if (/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/.test(line)) {
      issues.push({
        line: index,
        message: 'Possible JWT Token detected',
        severity: 'critical'
      });
    }

    if (/AKIA[0-9A-Z]{16}/.test(line)) {
      issues.push({
        line: index,
        message: 'Possible AWS Access Key detected',
        severity: 'critical'
      });
    }

  });

  return issues;
}