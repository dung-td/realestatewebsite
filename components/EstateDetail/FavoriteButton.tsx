import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
interface IButtonProps{
  onclick?: ()=>void,
}
export default function ArrowTooltips(props: IButtonProps) {
  return (
    <Tooltip title="Thêm vào yêu thích" arrow placement="top">
      {/* <Button>Arrow</Button> */}
      <FavoriteBorderIcon className='hover:text-red-600' />
    </Tooltip>
  );
}