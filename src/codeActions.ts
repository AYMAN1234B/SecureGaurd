import * as vscode from 'vscode';

export class SecureGuardCodeActionProvider
	implements vscode.CodeActionProvider {

	public provideCodeActions(
		document: vscode.TextDocument,
		range: vscode.Range
	): vscode.CodeAction[] {

		const line = document.lineAt(range.start.line).text;

		const actions: vscode.CodeAction[] = [];

		if (
			line.toLowerCase().includes('password') &&
			line.includes('=')
		) {

			const action = new vscode.CodeAction(
				'Move password to environment variable',
				vscode.CodeActionKind.QuickFix
			);

			action.command = {
				command: 'secureguard.fixPassword',
				title: 'Move password to environment variable'
			};

			actions.push(action);
		}

		if (
			line.toLowerCase().includes('apikey') &&
			line.includes('=')
		) {

			const action = new vscode.CodeAction(
				'Move API key to environment variable',
				vscode.CodeActionKind.QuickFix
			);

			action.command = {
				command: 'secureguard.fixApiKey',
				title: 'Move API key to environment variable'
			};

			actions.push(action);
		}

		if (
			line.toLowerCase().includes('token') &&
			line.includes('ghp_')
		) {

			const action = new vscode.CodeAction(
				'Move GitHub token to environment variable',
				vscode.CodeActionKind.QuickFix
			);

			action.command = {
				command: 'secureguard.fixGithubToken',
				title: 'Move GitHub token to environment variable'
			};

			actions.push(action);
		}

		return actions;
	}
}