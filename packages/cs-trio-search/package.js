Package.describe({
	name: 'csg:search',
	version: '0.0.1',
	summary: 'CreditSuisse Search Provider',
	git: ''
});

Package.onUse(api => {

	//register libraries used
	api.use([
		'ecmascript',
		'templating',
		'rocketchat:lib',
		'rocketchat:logger',
		'rocketchat:search',
		'kadira:flow-router',
		'meteorhacks:inject-initial'
	]);

	//register files for server-side
	api.addFiles([], 'server');

	//register files for client-side
	api.addFiles([], 'client');
});
