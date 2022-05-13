import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import {Carousel} from 'react-responsive-carousel'
interface CarouselProps{
    imageList: Array<string>,
    className: string
}
const ImageCarousel: React.FC<CarouselProps> = ({imageList, className}) =>{
    return (
        <Carousel showArrows={true} >
            {imageList.map((val)=>
            <div key={val} className='w-full h-[400px] object-center rounded-lg overflow-clip '>
                <img width={"200px"} height={"300px"} src={val}/>
            </div>)}
        </Carousel>
    )
}
export default ImageCarousel;