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
        message: 'Dangerous use of eval()'
      });
    }

    if (/exec\s*\(/.test(line)) {
      issues.push({
        line: index,
        message: 'Dangerous use of exec()'
      });
    }

    if (/child_process\.exec/.test(line)) {
      issues.push({
        line: index,
        message: 'child_process.exec detected'
      });
    }

  });

  return issues;
}