'use strict';
const __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
	function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
		function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
Object.defineProperty(exports, '__esModule', { value: true });
const React = require('react');
const checkbox_1 = require('./checkbox');
const Note_1 = require('@joplin/lib/models/Note');
const react_native_1 = require('react-native');
const { connect } = require('react-redux');
const { _ } = require('@joplin/lib/locale');
const shim_1 = require('@joplin/lib/shim');
const global_style_1 = require('./global-style');
const NotesBarListItemComponent = function(props) {
	let _a;
	const note = (_a = props.note) !== null && _a !== void 0 ? _a : {};
	const isTodo = !!Number(note.is_todo);
	const styles = () => {
		const themeId = props.themeId;
		const theme = (0, global_style_1.themeStyle)(themeId);
		const styles = {
			horizontalFlex: {
				flexDirection: 'row',
			},
			padding: {
				paddingLeft: theme.marginLeft,
				paddingRight: theme.marginRight,
				paddingTop: 12,
				paddingBottom: 12,
			},
			button: {
				height: 42,
				width: 42,
				backgroundColor: theme.color4,
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 4,
				flex: 0.5,
				marginLeft: 8,
			},
			itemText: {
				fontSize: theme.fontSize,
				color: theme.color,
				paddingTop: 12,
				paddingBottom: 12,
			},
			checkbox: {
				paddingRight: 10,
				paddingLeft: theme.marginLeft,
				paddingTop: 12,
				paddingBottom: 12,
				color: theme.color,
			},
			selectedItem: props.selectedNoteId === note.id ? {
				backgroundColor: theme.dividerColor,
			} : null,
			item: {
				borderBottomWidth: 1,
				borderColor: theme.dividerColor,
			},
		};
		return react_native_1.StyleSheet.create(styles);
	};
	const onTodoCheckboxChange = (checked) => __awaiter(this, void 0, void 0, function* () {
		yield props.todoCheckbox_change(checked);
	});
	const onPress = () => __awaiter(this, void 0, void 0, function* () {
		if (!note) { return; }
		if (note.encryption_applied) { return; }
		props.dispatch({
			type: 'NAV_BACK',
		});
		shim_1.default.setTimeout(() => {
			props.dispatch({
				type: 'NAV_GO',
				routeName: 'Note',
				noteId: note.id,
			});
		}, 5);
	});
	const noteTitle = Note_1.default.displayTitle(note);
	let item;
	if (isTodo) {
		item = (React.createElement(react_native_1.View, null,
			React.createElement(react_native_1.TouchableOpacity, { style: [styles().horizontalFlex, styles().item, styles().selectedItem], onPress: onPress },
				React.createElement(checkbox_1.default, { style: styles().checkbox, checked: !!Number(note.todo_completed), onChange: (checked) => onTodoCheckboxChange(checked), accessibilityLabel: _('to-do: %s', noteTitle) }),
				React.createElement(react_native_1.Text, { style: styles().itemText }, noteTitle))));
	} else {
		item = (React.createElement(react_native_1.View, null,
			React.createElement(react_native_1.TouchableOpacity, { onPress: onPress, style: [styles().selectedItem, styles().item] },
				React.createElement(react_native_1.Text, { style: [styles().itemText, styles().padding] }, noteTitle))));
	}
	return item;
};
const NotesBarListItem = connect((state) => {
	return {
		themeId: state.settings.theme,
		selectedNoteId: state.selectedNoteIds[0],
	};
})(NotesBarListItemComponent);
exports.default = NotesBarListItem;
// # sourceMappingURL=NotesBarListItem.js.map
