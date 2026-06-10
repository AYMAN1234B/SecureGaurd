import * as vscode from 'vscode';

export class SecureGuardCodeActionProvider
	implements vscode.CodeActionProvider {

	public provideCodeActions(
		document: vscode.TextDocument,
		range: vscode.Range
	): vscode.CodeAction[] {

		const line = document.lineAt(range.start.line).text;

		if (
			line.includes('password') &&
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

			return [action];
		}

		return [];
	}
}