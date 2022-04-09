import {ClockIcon, HomeIcon} from '@heroicons/react/outline'

interface TitleSectionProps{
    title: string,
    issuedDate?: string,
    address?: string
}
const TitleSection = (props: TitleSectionProps)=>{
    return (
        <div>
            <h1 className="text-2xl font-bold text-black uppercase">{props.title}</h1>
            {props?.issuedDate && <div className='mt-3'><ClockIcon className='w-5 h-5 inline-block'/> {`Ngày đăng: ${props.issuedDate}`}</div>}
            {props?.address && <div className='mt-1'><HomeIcon className='w-5 h-5 inline-block'/> {`Địa chỉ: ${props.address}`}</div>}
            <div className="my-3 border-b border-y-black container"></div>
        </div>
    )
}
export default TitleSection