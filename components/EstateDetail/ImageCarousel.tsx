import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Carousel} from 'react-responsive-carousel'
interface CarouselProps{
    imageList: Array<string>,
    className?: string,
    showThumbs?: boolean,
    imageStyle?: string, 
    selectedItem?: number,
    onClick?: (index: number)=>void
}
const ImageCarousel: React.FC<CarouselProps> = ({imageList, className, onClick, showThumbs, imageStyle, selectedItem}) =>{
    return (
        <Carousel showArrows={true} 
            showStatus={false}
            swipeable={true}
            emulateTouch={true}
            showThumbs={showThumbs}
            onClickItem={onClick}
            className={className}
            selectedItem={selectedItem ? selectedItem: 0}>
            {imageList && imageList.map((val)=>
            <div key={val} className={`w-full h-full object-center rounded-lg overflow-clip ${imageStyle}`} 
            // style={
            //     {
            //         background: `url(${val}) no-repeat center center fixed`,
            //         backgroundSize: 'cover'
            //     }
            // } 
            >
                <img className='object-fill w-full h-full' src={val}/>
            </div>)}
        </Carousel>
    //     <Swiper
    //   // install Swiper modules
    //   modules={[Navigation, Pagination, Scrollbar, A11y]}
    //   spaceBetween={20}
    //   slidesPerView={1}
    //   navigation
    //   pagination={{ clickable: true }}
    //   effect='cube'
    //   cubeEffect={{
    //     slideShadows: false,
    //   }}
    // //   scrollbar={{ draggable: true }}
    //   onSwiper={(swiper) => console.log(swiper)}
    //   onSlideChange={() => console.log('slide change')}
    // >
    //   {imageList && imageList.map((val)=>        
    //         <SwiperSlide key={val} className={`w-full h-[75vh] object-center rounded-lg overflow-clip`}  style={{
    //             backgroundImage: `url(${val})`,
    //             height: '75vh'
    //         }}>
    //         </SwiperSlide>
    //     )}
    // </Swiper>
    )
}
export default ImageCarousel;