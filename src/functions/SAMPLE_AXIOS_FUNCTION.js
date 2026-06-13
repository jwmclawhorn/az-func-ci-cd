import { app } from '@azure/functions';
import axios from 'axios';

app.http('SAMPLE_AXIOS_FUNCTION', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request.');
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        context.log(response.data);
        return { body: `Fetched data from external API: ${JSON.stringify(response.data)}` };
    }
});
