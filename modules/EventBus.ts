/**
 * subscriptions data format:
 * { eventType: { id: callback } }
 */
const subscriptions = { }
const getNextUniqueId = getIdGenerator()

function subscribe(eventType: string | number, callback: any) {
    const id = getNextUniqueId()

    // @ts-ignore
    if(!subscriptions[eventType])
        { // @ts-ignore
            subscriptions[eventType] = { }
        }

    // @ts-ignore
    subscriptions[eventType][id] = callback

    return {
        unsubscribe: () => {
            // @ts-ignore
            delete subscriptions[eventType][id]
            // @ts-ignore
            if(Object.keys(subscriptions[eventType]).length === 0) delete subscriptions[eventType]
        }
    }
}

function publish(eventType: string | number, arg: any) {
    // @ts-ignore
    if(!subscriptions[eventType])
        return

    // @ts-ignore
    Object.keys(subscriptions[eventType]).forEach(key => subscriptions[eventType][key](arg))
}

function getIdGenerator() {
    let lastId = 0

    return function getNextUniqueId() {
        lastId += 1
        return lastId
    }
}

export default {
    subscribe,
    publish
}
