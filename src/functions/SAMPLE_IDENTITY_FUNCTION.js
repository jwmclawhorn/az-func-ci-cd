import { app } from '@azure/functions';
import { DefaultAzureCredential } from '@azure/identity';

app.http('SAMPLE_IDENTITY_FUNCTION', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request.');
        const credential = new DefaultAzureCredential();
        const token = await credential.getToken('https://management.azure.com/.default');
        context.log('Obtained token with scopes:', token.scopes);
        return { body: `Token acquired with scopes: ${token.scopes.join(', ')}` };
    }
});