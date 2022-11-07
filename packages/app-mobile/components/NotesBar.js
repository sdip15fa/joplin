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
const react_native_1 = require('react-native');
const global_style_1 = require('./global-style');
const { connect } = require('react-redux');
const Icon = require('react-native-vector-icons/Ionicons').default;
const { _ } = require('@joplin/lib/locale');
const Note_1 = require('@joplin/lib/models/Note');
const NotesBarListItem_1 = require('./NotesBarListItem');
const Folder_1 = require('@joplin/lib/models/Folder');
const searchNotes_1 = require('./searchNotes');
function NotesBarComponent(props) {
	const [query, setQuery] = React.useState('');
	const [notes, setNotes] = React.useState(props.notes);
	const theme = React.useMemo(() => (0, global_style_1.themeStyle)(props.themeId), [props.themeId]);
	const styles = () => {
		const styles = {
			container: {
				flex: 1,
				width: '100%',
				backgroundColor: theme.backgroundColor3,
			},
			horizontalFlex: {
				flexDirection: 'row',
			},
			title: {
				alignItems: 'center',
			},
			titleText: {
				fontSize: 16,
			},
			closeIcon: {
				fontSize: 30,
				paddingTop: 8,
				paddingBottom: 8,
				paddingRight: theme.marginRight,
				paddingLeft: theme.marginLeft,
			},
			top: {
				color: theme.color,
			},
			topContainer: {
				width: '100%',
				justifyContent: 'space-between',
				paddingLeft: theme.marginLeft,
			},
			padding: {
				paddingLeft: theme.marginLeft,
				paddingRight: theme.marginRight,
				paddingTop: 12,
				paddingBottom: 12,
			},
			titleIcon: {
				fontSize: 22,
				marginRight: 4,
			},
			divider: {
				backgroundColor: theme.dividerColor,
				height: 1,
				width: '100%',
			},
			nativeInput: {
				fontSize: theme.fontSize,
				flex: 1,
				paddingRight: 8,
			},
			searchIcon: {
				fontSize: 22,
			},
			searchInput: {
				alignItems: 'center',
				backgroundColor: theme.backgroundColor,
				paddingLeft: 8,
				borderRadius: 4,
				borderWidth: 1,
				borderColor: theme.dividerColor,
				height: 42,
				flex: 1,
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
			buttonIcon: {
				color: theme.backgroundColor,
				fontSize: 22,
			},
			inputGroup: {
				justifyContent: 'space-between',
			},
		};
		return react_native_1.StyleSheet.create(styles);
	};
	const titleComp = (React.createElement(react_native_1.View, { style: [styles().title, styles().horizontalFlex] },
		React.createElement(Icon, { name: 'md-document', style: [styles().top, styles().titleIcon] }),
		React.createElement(react_native_1.Text, { style: [styles().top, styles().titleText] }, _('Notes'))));
	const dividerComp = (React.createElement(react_native_1.View, { style: styles().divider }));
	const handleNotesBarClose = () => {
		props.dispatch({ type: 'NOTES_BAR_CLOSE' });
	};
	const closeButtonComp = (React.createElement(react_native_1.TouchableOpacity, { onPress: handleNotesBarClose, accessibilityLabel: _('Toggle note list'), accessibilityRole: 'button' },
		React.createElement(Icon, { name: 'close', style: [styles().top, styles().closeIcon] })));
	const renderIconButton = (icon, onPress, label) => {
		return (React.createElement(react_native_1.TouchableOpacity, { style: styles().button, activeOpacity: 0.8, onPress: onPress, accessibilityLabel: label, accessibilityRole: 'button' }, icon));
	};
	const handleNewNote = (isTodo) => __awaiter(this, void 0, void 0, function* () {
		let folderId = props.selectedFolderId !== Folder_1.default.conflictFolderId() ? props.selectedFolderId : null;
		if (!folderId) { folderId = props.activeFolderId; }
		props.dispatch({
			type: 'NAV_BACK',
		});
		const newNote = yield Note_1.default.save({
			parent_id: folderId,
			is_todo: isTodo ? 1 : 0,
		}, { provisional: true });
		props.dispatch({
			type: 'NAV_GO',
			routeName: 'Note',
			noteId: newNote.id,
		});
	});
	const addNoteButtonComp = renderIconButton(React.createElement(Icon, { name: 'document-text-outline', style: styles().buttonIcon }), () => handleNewNote(false), _('New note'));
	const addTodoButtonComp = renderIconButton(React.createElement(Icon, { name: 'checkbox-outline', style: styles().buttonIcon }), () => handleNewNote(true), _('New to-do'));
	const topComp = (React.createElement(react_native_1.View, null,
		React.createElement(react_native_1.View, { style: [styles().topContainer, styles().horizontalFlex] },
			titleComp,
			closeButtonComp),
		dividerComp));
	const refreshSearch = () => __awaiter(this, void 0, void 0, function* () {
		const notes = yield (0, searchNotes_1.default)(query, props.settings['db.ftsEnabled'], props.dispatch);
		setNotes(notes);
	});
	const handleQuerySubmit = () => __awaiter(this, void 0, void 0, function* () {
		const trimmedQuery = query.trim();
		if (!trimmedQuery) {
			props.dispatch({
				type: 'SEARCH_QUERY',
				query: '',
			});
		} else {
			props.dispatch({
				type: 'SEARCH_QUERY',
				query: trimmedQuery,
			});
		}
		setQuery(trimmedQuery);
		yield refreshSearch();
	});
	const searchInputComp = (React.createElement(react_native_1.View, { style: [styles().horizontalFlex, styles().searchInput] },
		React.createElement(Icon, { name: 'search', style: [styles().top, styles().searchIcon] }),
		React.createElement(react_native_1.TextInput, { style: [styles().top, styles().nativeInput], placeholder: 'Search', onChangeText: setQuery, value: query, onSubmitEditing: handleQuerySubmit, placeholderTextColor: theme.dividerColor })));
	const inputGroupComp = (React.createElement(react_native_1.View, { style: { width: '100%' } },
		React.createElement(react_native_1.View, { style: [styles().padding, styles().horizontalFlex, styles().inputGroup] },
			searchInputComp,
			addNoteButtonComp,
			addTodoButtonComp),
		dividerComp));
	let flatListRef = React.useRef(null);
	const onRenderItem = React.useCallback(({ item }) => {
		if (item.is_todo) {
			return React.createElement(NotesBarListItem_1.default, { note: item, todoCheckbox_change: props.todoCheckbox_change });
		} else {
			return React.createElement(NotesBarListItem_1.default, { note: item });
		}
	}, [props.todoCheckbox_change]);
	const NotesBarListComp = (React.createElement(react_native_1.FlatList, { data: notes, renderItem: onRenderItem, keyExtractor: (item) => item.id, getItemLayout: (data, index) => ({
		length: data.length,
		offset: (theme.fontSize + styles().padding.paddingTop + styles().padding.paddingBottom) * index,
		viewOffset: (theme.fontSize + styles().padding.paddingTop + styles().padding.paddingBottom),
		index,
	}), ref: (ref) => { flatListRef = ref; } }));
	// Scroll the notesbar to selected note item after rendering
	React.useEffect(() => {
		const selectedItemIndex = notes.findIndex(item => item.id === props.selectedNoteId);
		if (selectedItemIndex >= 0) {
			flatListRef.scrollToIndex({ index: selectedItemIndex });
		}
	});
	// Update the notesbar when a note item changes
	React.useEffect(() => {
		setNotes(props.notes);
	}, [props.notes]);
	return (React.createElement(react_native_1.View, { style: styles().container },
		topComp,
		inputGroupComp,
		NotesBarListComp));
}
const NotesBar = connect((state) => {
	return {
		themeId: state.settings.theme,
		notes: state.notes,
		activeFolderId: state.settings.activeFolderId,
		selectedFolderId: state.selectedFolderId,
		selectedNoteId: state.selectedNoteIds[0],
		settings: state.settings,
	};
})(NotesBarComponent);
exports.default = NotesBar;
// # sourceMappingURL=NotesBar.js.map
