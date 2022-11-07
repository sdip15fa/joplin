'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const react_native_1 = require('react-native');
const global_style_1 = require('./global-style');
const useStyles = (stylingFunction, themeId) => {
	const theme = (0, global_style_1.themeStyle)(themeId);
	const styles = stylingFunction(theme);
	return react_native_1.StyleSheet.create(styles);
};
exports.default = useStyles;
// # sourceMappingURL=useStyles.js.map
