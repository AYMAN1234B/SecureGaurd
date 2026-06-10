import { SecurityIssue } from './secrets';

export function scanDangerousFunctions(
  text: string
): SecurityIssue[] {

  const issues: SecurityIssue[] = [];

  const lines = text.split('\n');

  lines.forEach((line, index) => {

    if (/eval\s*\(/.test(line)) {
      issues.push({
        line: index,
        message: 'Dangerous use of eval()',
        severity: 'high'
      });
    }

    if (/exec\s*\(/.test(line)) {
      issues.push({
        line: index,
        message: 'Dangerous use of exec()',
        severity: 'high'
      });
    }

    if (/child_process\.exec/.test(line)) {
      issues.push({
        line: index,
        message: 'child_process.exec detected',
        severity: 'high'
      });
    }

  });

  return issues;
}