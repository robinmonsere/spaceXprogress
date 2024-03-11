// api/+server.js

export async function GET({ query }) {
    console.log('query:', query)
    //const { url } = query;
    //console.log('url:', url)
    return new Response('Hello world');
    /*
    try {
        console.log(url);
        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        return {
            status: 200,
            body: data
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }

     */
}
