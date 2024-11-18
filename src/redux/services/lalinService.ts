import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {config} from "../../config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lalinApi: any = createApi({
    reducerPath: "lalinApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config.BASE_URL,
    }),
    endpoints: (builder) => ({
        getLalin: builder.query({
            query: () => `/lalins`,
        }),
        getLalinByDate: builder.query({
            query: ({date, page, limit}) => `/lalins?tanggal=${date}&page=${page}&limit=${limit}`,
        }),
        getLalinByKeyword: builder.query({
            query: ({keywords, page, limit}) => `/lalins?tanggal=${keywords}&page=${page}&limit=${limit}`,
        }),
    })
})

export const { useGetLalinQuery, useGetLalinByDateQuery, useGetLalinByKeywordQuery } = lalinApi