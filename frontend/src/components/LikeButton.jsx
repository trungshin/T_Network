import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = ({isLike, handleLike, handleUnLike}) => {
    return (
        <>
            {
                isLike
                ? <FavoriteIcon onClick={handleUnLike} />
                : <FavoriteBorderIcon onClick={handleLike} />
            }
        </>
    )
}

export default LikeButton;