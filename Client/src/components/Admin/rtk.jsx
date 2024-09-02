import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";


export const categories =createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5001/api/"
    }),
    endpoints:(builder)=>({
       getCategories
       : builder.query({query:()=>'categories'}),

    })
})





