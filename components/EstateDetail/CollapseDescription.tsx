import {useState} from 'react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/outline'
const CollapseDescription: React.FC = ({children})=>{
    const [readMoreShown, setReadMoreShown] = useState(true)
    return <>
        <div className={`relative ${readMoreShown && "max-h-[50vh]"} overflow-hidden border-b-black mb-5`}>
            {children}
        </div>
        <div className='text-center'>
            <button className="px-5 py-1 rounded-xl text-center text-red-600 hover:bg-slate-400/50 " onClick={()=> setReadMoreShown(prev => !prev)}>
                { readMoreShown ? <span>Xem thêm <ChevronDownIcon className='inline w-5 h-5'/></span> : <span>Thu gọn <ChevronUpIcon className='inline w-5 h-5'/></span>}
            </button>
        </div>
    </>
}
export default CollapseDescription