import { request, gql } from 'graphql-request'


function genEnding(length: number) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
}

async function createRedirect(url, ending, instance) {
    const mutation = gql` mutation {
        createRedirect(url: "${String(url)}", ending: "${String(ending)}") {
            url,
            ending
        }
    }`
    try {
        const data = await request(instance, mutation)
        return data.createRedirect;
    } catch (e) {
        if(e.response == undefined || e.response == null) {
            return new Error("Internal Server Error")
        }
        if(e.response.status == 500 || e.response.status == 404) {
            return new Error("Internal Server Error")
        }
        if(e.response.status == 429) {
            return new Error("Too many requests - try again in 1 hour")
        }
        if(e.response.errors[0].extensions.code == "USER_INPUT_ERROR") {
            return new Error(e.response.errors[0].message)
        } else {
            return new Error("Internal Server Error")
        }

    }
}

export { createRedirect, genEnding }