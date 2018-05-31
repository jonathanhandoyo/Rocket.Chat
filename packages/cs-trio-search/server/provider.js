import {searchProviderService} from 'meteor/rocketchat:search';
import {SearchProvider} from 'meteor/rocketchat:search';
import TrioLogger from './logger';

class TrioSearchProvider extends SearchProvider {

	constructor() {
		super('trioSearchProvider');

		this.trioBaseUrl = 'https://trio.csintra.net:28888/trio';
	}

	get supportsSuggestions() { return false; }

	/**
	 * indexing for messages, room, and users
	 * @param name
	 * @param value
	 * @param payload
	 */
	on(name, value, payload) {

		if (!this.index) {
			this.indexFail = true;
			return false;
		}

		switch (name) {
			case 'user.save': 		return this.index.indexDoc('user', payload);
			case 'user.delete': 	return this.index.removeDoc('user', value);
			case 'room.save': 		return this.index.indexDoc('room', payload);
			case 'room.delete': 	return this.index.removeDoc('room', value);
		}

		return true;
	}

	start(reason, resolve, reject) {
		resolve();
	}

	stop(resolve) {
		TrioLogger.info('Provider stopped');
		Meteor.clearTimeout(5000);
		this.indexFail = false;
		this.index && this.index.stop();
		resolve();
	}

	/**
	 * Search using the current search provider and check if results are valid for the user. The search result has
	 * the format {messages:{start:0,numFound:1,docs:[{...}]},users:{...},rooms:{...}}
	 * @param text the search text
	 * @param context the context (uid, rid)
	 * @param payload custom payload (e.g. for paging)
	 * @param callback is used to return result an can be called with (error,result)
	 */
	search(text, context, payload, callback) {
		throw new Error('Function search has to be implemented');
	}

	/**
	 * Returns an ordered list of suggestions. The result should have at least the form [{text:string}]
	 * @param text
	 * @param context
	 * @param payload
	 * @param callback
	 */
	suggest(text, context, payload, callback) {
		callback(null, []);
	}
}

searchProviderService.register(new TrioSearchProvider());
