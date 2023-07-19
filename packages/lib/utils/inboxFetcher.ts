import SyncTargetRegistry from '../SyncTargetRegistry';
import eventManager from '../eventManager';
import Setting from '../models/Setting';
import { reg } from '../registry';

export const inboxFetcher = async () => {

	if (Setting.value('sync.target') !== SyncTargetRegistry.nameToId('joplinCloud')) {
		return;
	}

	const syncTarget = reg.syncTarget();
	const fileApi = await syncTarget.fileApi();
	const api = fileApi.driver().api();

	const owner = await api.exec('GET', `api/users/${api.userId}`);

	if (owner.inbox) {
		Setting.setValue('emailToNote.inboxJopId', owner.inbox.jop_id);
	}

	if (owner.inbox_email) {
		Setting.setValue('emailToNote.inboxEmail', owner.inbox_email);
	}
};

// Listen to the event only once
export const initializeInboxFetcher = () => {
	eventManager.once('sessionEstablished', inboxFetcher);
};
