import loadtest from 'loadtest';
const options = {
	url: 'http://localhost:3000/heavy',
	maxRequests: 1000,
    requestsPerSecond: 20,
    agentKeepAlive: true,
	concurrency: 100
};
console.log("!!!!!!!!!!!!!!!!!!!")
loadtest.loadTest(options, function(error, result)
{
	if (error)
	{
		return console.error('Got an error: %s', error);
	}
	console.log('Tests run successfully',result);
});