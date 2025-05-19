import { NotifyNormal } from "./CommonFunc";

const GetApi= async(url) => {
        try{
            const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const responseData = await response.json();
        if (response.ok && Array.isArray(responseData.data)){
            // if (!cacheUrl.includes(url)){
            //     cacheUrl.push(url);
            // }
            return responseData.data
        }else{
            console.log("error",responseData.message);
        }
        }catch(error){
            console.error("GetAccount error:", error.message); 
            return null;
        }
    };

    const GetApiById= async(url) => {
        try{
            const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const responseData = await response.json();
        if (response.ok && responseData.data){
            
            return responseData.data
        }else{
            console.log("error",responseData.message);
        }
        }catch(error){
            console.error("GetAccount error:", error.message); 
            return null;
        }
    };

const PostApi = async (url,formData) => {
    console.log("formd",formData);
    console.log("url",url);
    try{
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response) {
            return responseData
        }
        const responseData = await response.json();
        if (response.ok && responseData.message){
            return responseData
        }else{
            return null
        }
    }catch(error){
        throw new Error(`error`,error);
    }
}

const UpdateStatusApi = async (url, dataSend) => {
    console.log("formd",dataSend);
    console.log("url",url);
    try{
        if(!dataSend.id ){
            throw new Error('id and status are required');
        }
        const combineApiUrl = url.endsWith('/') ? `${url}${dataSend.id}` : `${url}/${dataSend.id}`;
        const response = await fetch(combineApiUrl,{
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({status : dataSend.status})
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update status');
        }

        const responseData = await response.json();
        if (response.ok && responseData.data){
            return responseData.data
        }
        
    }catch(error){
        throw new Error(`error`,error);
        return null;
    }
}

const UpdateApi = async (url, formData) => {
    console.log("formd",formData);
    try{
        if(!formData.id ){
            throw new Error('id and status are required');
        }
        const combineApiUrl = url.endsWith('/') ? `${url}${formData.id}` : `${url}/${formData.id}`;
        console.log("combineApiUrl",combineApiUrl);
        const response = await fetch(combineApiUrl,{
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            NotifyNormal('error',errorData.message,false,2000);
            console.log("errorData",errorData);
            // throw new Error(errorData.message || 'Failed to update status');
        }
        const responseData = await response.json();
        console.log("responseData",responseData);
        if (response.ok && responseData.data){
            return responseData.data
        }
    }catch(error){
        throw new Error(`error`,error);
        return null;
    }
}
export {GetApi, PostApi, UpdateStatusApi, GetApiById, UpdateApi};