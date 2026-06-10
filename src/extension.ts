import * as vscode from 'vscode';
import { scanSecrets } from './scanners/secrets';
import { scanDangerousFunctions} from './scanners/dangerousFunctions';
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

	context.subscriptions.push(

		vscode.workspace.onDidChangeTextDocument(
			(event) => {
				scanDocument(event.document);
			}
		),

		vscode.window.onDidChangeActiveTextEditor(
			(editor) => {
				if (editor) {
					scanDocument(editor.document);
				}
			}
		)

	);
}

export function deactivate() {}