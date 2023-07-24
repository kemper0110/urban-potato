import {useImage} from "../queries.ts";
import {useEffect} from "react";
import {CommentView} from "./CommentView.tsx";
import {CreateComment} from "./CreateComment.tsx";

const ImageModal = ({image_id, isOpen, onClose}: {
    isOpen: boolean
    image_id: number
    onClose: () => void
}) => {
    useEffect(() => {
        if (isOpen) document.body.classList.add('modal-open')
        return () => document.body.classList.remove('modal-open')
    }, [isOpen])

    if (!isOpen)
        return null
    return (
        <Modal image_id={image_id} onClose={onClose}/>
    );
};

const Modal = ({image_id, onClose}: {
    image_id: number
    onClose: () => void
}) => {
    const {data, isLoading, isError} = useImage(image_id)
    if (isLoading)
        return null
    if (isError)
        return null
    return (
        <div className={'fixed bg-slate-500 inset-0 '}>
            <div
                className={'pb-16 max-h-screen overflow-scroll mx-auto bg-white mt-10 flex flex-col items-center max-w-[700px] p-3 gap-3 rounded-xl backdrop:bg-black/30'}
            >
                <div className={'w-full flex justify-end'}>
                    <button className={'cursor-pointer'} onClick={(e) => {
                        e.stopPropagation()
                        onClose()
                    }}>X</button>
                </div>
                <div>
                    <img className={'shadow-2xl rounded-3xl aspect-square object-center mx-auto max-w-[400px]'}
                         src={data?.largeImage} alt={"image " + data?.id}/>
                </div>
                <div className={'flex flex-col w-full gap-5'}>
                    {
                        data?.comments.map(comment => (
                            <CommentView key={comment.id} comment={comment}/>
                        ))
                    }
                </div>
                <CreateComment image_id={data?.id ?? 0}/>
            </div>
        </div>
    )
}

export default ImageModal;