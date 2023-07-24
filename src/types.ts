export type ImagePreview = {
    id: number
    image: string
}

export type ImageDetailed = {
    id: number
    image: string
    largeImage: string
    comments: Array<Comment>
}

export type Comment = {
    id: number
    author: string
    text: string
}