import {Comment} from "../types.ts";

export const CommentView = ({comment}: {
    comment: Comment
}) => {
    return (
        <article className={'flex flex-col items-start gap-2'}>
            <h1 className={'pl-1'}>{comment.author}</h1>
            <p className={'rounded-lg border w-full p-2 '}>
                {comment.text}
            </p>
        </article>
    )
}