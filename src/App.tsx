import {useImages} from "./queries.ts";
import {ImagePreview} from "./types.ts";
import {useState} from "react";
import ImageModal from "./components/ImageModal.tsx";


const Image = ({image}: {
    image: ImagePreview
}) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={'shrink'} onClick={() => {
            setOpen(true)
        }}>
            {
                open ? (
                    <ImageModal image_id={image.id} onClose={() => {
                        setOpen(false)
                    }} isOpen={open}/>
                ) : null
            }
            <img alt={'image ' + image.id} src={image.image}/>
        </div>
    )
}

function App() {
    const {data, isLoading, isError, error} = useImages()
    if (isLoading)
        return 'Loading...'
    if (isError)
        return "Error: " + error
    return (
        <div className={'max-w-[1280px] mx-auto flex flex-col gap-y-5'}>
            <h1 className={'text-3xl text-center'}>
                Все изображения
            </h1>
            <div className={'flex flex-wrap justify-center gap-3'}>
                {
                    data?.map((image) => (
                        <Image key={image.id} image={image}/>
                    ))
                }
            </div>
        </div>
    )
}

export default App
