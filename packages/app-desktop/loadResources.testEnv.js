'use strict';
/**
 * A Jest custom test Environment to load the resources for the tests.
 * Use this test envirenment when you work with resources like images, files.
 * See gui/NoteEditor/utils/contextMenu.test.ts for an example.
 */
Object.defineProperty(exports, '__esModule', { value: true });
const JSDOMEnvironment = require('jest-environment-jsdom');
class CustomEnvironment extends JSDOMEnvironment {
	constructor(config, context) {
		// Resources is set to 'usable' to enable fetching of resources like images and fonts while testing
		// Which does not happen by default in jest
		// https://stackoverflow.com/a/49482563
		config.testEnvironmentOptions.resources = 'usable';
		super(config, context);
	}
}
exports.default = CustomEnvironment;
// # sourceMappingURL=loadResources.testEnv.js.map
