import { app } from '@azure/functions';

app.http('SAMPLE_FUNCTION_2', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request.');
        return { body: 'Hey, a second function!' };
    }
});
