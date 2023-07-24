import {useMutation, useQuery, useQueryClient} from "react-query";
import {api} from "./api.ts";
import {ImageDetailed, ImagePreview} from "./types.ts";

export const useImages = () => (
    useQuery(['images'], async () => {
        const {data} = await api.get("images")
        return data as Array<ImagePreview>
    },{
        refetchOnWindowFocus: false,
        keepPreviousData: true
    })
)
export const useImage = (id: number) => (
    useQuery(['image', id], async () => {
        const {data} = await api.get(`image/${id}`)
        return data as ImageDetailed
    }, {
        refetchOnWindowFocus: false,
        keepPreviousData: true
    })
)
export const usePostComment = (id: number,) => {
    const client = useQueryClient()
    return useMutation((comment: string) => {
        return api.post(`image/${id}/comments`, {
            comment: comment
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }, {
        onSettled: () => {
            client.invalidateQueries(['image', id])
        }
    })
}