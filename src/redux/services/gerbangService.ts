import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {config} from "../../config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const gerbangApi: any = createApi({
    reducerPath: "gerbangApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config.BASE_URL,
    }),
    endpoints: (builder) => ({
        getGerbangs: builder.query({
            query: ({limit, page}) => `/gerbangs?limit=${limit}&page=${page}`,
        }),
        getGerbangById: builder.query({
            query: ({id, IdCabang}) => `/gerbangs?id=${id}&IdCabang=${IdCabang}`,
        }),
        getGerbangsByKeywords: builder.query({
            query: ({keywords='', limit=5, page=1}) => `/gerbangs?limit=${limit}&page=${page}&NamaGerbang=%${keywords}%`,
        })
    })
})

export const { useGetGerbangsQuery, useGetGerbangByIdQuery, useGetGerbangsByKeywordsQuery } = gerbangApi