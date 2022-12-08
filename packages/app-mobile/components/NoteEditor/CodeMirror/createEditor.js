'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const lang_markdown_1 = require('@codemirror/lang-markdown');
const markdown_1 = require('@lezer/markdown');
const language_1 = require('@codemirror/language');
const state_1 = require('@codemirror/state');
const view_1 = require('@codemirror/view');
const markdownMathParser_1 = require('./markdownMathParser');
// Creates and returns a minimal editor with markdown extensions
const createEditor = (initialText, initialSelection) => {
	const editor = new view_1.EditorView({
		doc: initialText,
		selection: state_1.EditorSelection.create([initialSelection]),
		extensions: [
			(0, lang_markdown_1.markdown)({
				extensions: [markdownMathParser_1.MarkdownMathExtension, markdown_1.GFM],
			}),
			language_1.indentUnit.of('\t'),
			state_1.EditorState.tabSize.of(4),
		],
	});
	(0, language_1.forceParsing)(editor);
	return editor;
};
exports.default = createEditor;
// # sourceMappingURL=createEditor.js.map
