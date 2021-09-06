import React, {useState} from 'react';
import ModalVideo from 'react-modal-video'

const FilmsTrailer = ({id}) => {
    const [isOpen, setOpen] = useState(false)

    return (
        <span>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id}
                        onClose={() => setOpen(false)}/>
            <button className="btn-primary" onClick={() => setOpen(true)}>video</button>
        </span>
    );
};

export default FilmsTrailer;