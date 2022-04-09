import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import {Carousel} from 'react-responsive-carousel'
interface CarouselProps{
    imageList: Array<string>,
    className: string
}
// const ImageCarousel :React.FC<CarouselProps> = ({imageList, className}) =>{
//     const [currentIndex, setCurrent] = useState(0)
//     const [x_translate, setx] = useState(0)
//     const sliderRef =useRef<HTMLDivElement| null>(null)
//     const handleNextSlide = ()=>{
//         console.log(currentIndex)
//         setCurrent(currentIndex === imageList.length-1 ? 0: currentIndex + 1)
//     }
//     const handlePrevSlide = ()=>{
//         console.log(currentIndex)
//         setCurrent(currentIndex === 0 ? imageList.length-1: currentIndex - 1 )
//     }
//     if (imageList.length <=0)
//         return null
    
//     return (
//         <div className={`${className} relative h-[500px] w-full`} ref={sliderRef}>
//             <button className="text-bold absolute top-1/2 translate-y-1/2 left-5 z-[100] p-3"
//             onClick={handlePrevSlide}>back</button>
//             <button className="text-bold absolute top-1/2 translate-y-1/2 right-5 z-[100] p-3 cursor-pointer"
//             onClick={handleNextSlide}>next</button>
//             <div className={`flex justify-center items-center`}>
//                 {imageList.map((val, index) => 
//                 (<div key={index}
//                 className={`transition duration-1000 ease-in ${index !== currentIndex ? "opacity-0": "transform opacity-100 translate-x-2"}`}>
//                     {index === currentIndex && <img src={val}/>}
//                 </div>))}
//             </div >
//             <div className='absolute bottom-0 right-1/2 mb-4 flex justify-between'>
//                 <div>.</div>
//                 <div>.</div>
//             </div>
//         </div>
//     )
// }
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