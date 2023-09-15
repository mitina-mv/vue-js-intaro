export function getObjByVkResponse(arr)
{
    let obj = arr.reduce((result, item) => {
        result[item.id] = item.title;
        return result;
    }, {})

    return obj
}