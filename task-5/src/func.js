import axios from "axios";

export function getObjByVkResponse(arr)
{
    let obj = arr.reduce((result, item) => {
        result[item.id] = item.title;
        return result;
    }, {})

    return obj
}

export async function getDataByApi(url)
{
    let result = null

    await axios.get(url)
        .then((response) => {
            if (response.data.response.count > 0) {
                result = response.data.response
            }
        })
        .catch((error) => {
            console.error(error);
        });
    
    return result
}