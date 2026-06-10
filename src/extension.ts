import * as vscode from 'vscode';
import { scanSecrets } from './scanners/secrets';
import { scanDangerousFunctions} from './scanners/dangerousFunctions';
interface Finding {
	label: string;
	file: vscode.Uri;
	line: number;
}
export function activate(context: vscode.ExtensionContext) {

	console.log('SecureGuard activated');

	vscode.window.showInformationMessage(
		'🛡️ SecureGuard is now active!'
	);

	const diagnosticCollection =
		vscode.languages.createDiagnosticCollection('secureguard');

	const scanDocument = (document: vscode.TextDocument) => {

		const issues = [
			...scanSecrets(document.getText()),
			...scanDangerousFunctions(document.getText())
		];

		const diagnostics: vscode.Diagnostic[] = [];

		issues.forEach((issue) => {

			const line = document.lineAt(issue.line);

			const severityMap = {
				'critical': vscode.DiagnosticSeverity.Error,
				'high': vscode.DiagnosticSeverity.Warning,
				'medium': vscode.DiagnosticSeverity.Information
			};

			const diagnostic = new vscode.Diagnostic(
				line.range,
				issue.message,
				severityMap[issue.severity]
			);

			diagnostics.push(diagnostic);

		});

		diagnosticCollection.set(
			document.uri,
			diagnostics
		);

	};

	if (vscode.window.activeTextEditor) {
		scanDocument(
			vscode.window.activeTextEditor.document
		);
	}
	const scanWorkspaceCommand = vscode.commands.registerCommand(
		'secureguard.scanWorkspace',
		async () => {

			const files = await vscode.workspace.findFiles(
				'**/*.{js,ts,jsx,tsx}',
				'**/{node_modules,out,dist,.git}/**'
			);

			let critical = 0;
			let high = 0;
			let medium = 0;

			const findings: Finding[] = [];

			for (const file of files) {

				const document =
					await vscode.workspace.openTextDocument(file);

				const issues = [
					...scanSecrets(document.getText()),
					...scanDangerousFunctions(document.getText())
				];

				issues.forEach(issue => {

					if (issue.severity === 'critical') {
						critical++;
					}

					if (issue.severity === 'high') {
						high++;
					}

					if (issue.severity === 'medium') {
						medium++;
					}

					findings.push({
						label: issue.message,
						file: file,
						line: issue.line
					});

				});

			}

			const selected = await vscode.window.showQuickPick(
				findings.map(f => ({
					label: f.label,
					description: `${f.file.fsPath}:${f.line + 1}`,
					finding: f
				})),
				{
					title: `🛡️ SecureGuard Report | Critical: ${critical} | High: ${high} | Medium: ${medium}`
				}
			);

			if (selected) {

				const document =
					await vscode.workspace.openTextDocument(
						selected.finding.file
					);

				const editor =
					await vscode.window.showTextDocument(
						document
					);

				const position =
					new vscode.Position(
						selected.finding.line,
						0
					);

				editor.selection =
					new vscode.Selection(
						position,
						position
					);

				editor.revealRange(
					new vscode.Range(
						position,
						position
					)
				);

			}

		}
	);
}

export function deactivate() {}