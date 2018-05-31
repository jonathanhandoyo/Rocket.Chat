import TrioLogger from './logger';

/**
 * Should enable HTTP functions on Trio Backend
 */
class Backend {

	constructor(options) {
		this._options = options;
	}

	/**
	 * remove all indexes
	 * @returns {boolean}
	 */
	clear() {
		TrioLogger.debug('Indexes cleared');
		return false;
	}

	/**
	 * index a set of documents
	 * @param docs
	 * @returns {boolean}
	 */
	index(docs) {
		TrioLogger.debug(`Indexed ${ docs.length } documents`);
		return false;
	}

	/**
	 * remove an entry by type and id
	 * @param type
	 * @param id
	 * @returns {boolean}
	 */
	remove(type, id) {
		TrioLogger.debug(`Remove ${ type }(${ id }) from Index`);
		return false;
	}

	/**
	 * counts number of documents in an index of type
	 * @param type
	 * @returns {number}
	 */
	count(type) {
		return -1;
	}

	/**
	 * finds suggestion list based on the params then executes the callback
	 * @param params
	 * @param callback
	 */
	suggest(params, callback) {
		throw new Error('Function suggest is not supported');
	}

	/**
	 * calls the backend with the params then executes the callback
	 * @param params
	 * @param callback
	 */
	query(params, callback) {}

	/**
	 * statically ping with configuration
	 * @param options
	 * @returns {boolean}
	 */
	static ping(config) {
		return false;
	}
}

/**
 * Should enable batch indexing
 */
class BatchIndexer {

	constructor(size, func, ...rest) {
		this._size = size;
		this._func = func;
		this._rest = rest;
		this._values = [];
	}

	add(value) {
		this._values.push(value);
		if (this._values.length === this._size) {
			this.flush();
		}
	}

	flush() {
		this._func(this._values, this._rest);
		this._values = [];
	}
}

export default class Index {

	constructor(options, clear, date) {
		this._id = Random.id();
		this._backend = new Backend(options);
		this._options = options;
		this._batchIndexer = new BatchIndexer(
			this._options.batchSize || 100,
			(values) => this._backend.index(values)
		);
		this._bootstrap(clear, date);
	}
}
