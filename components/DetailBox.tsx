import SeparatedSection from './SeparatedSection'
import {Unit} from '../Enum'
const getUnitComponent = (unit?: Unit) =>
{
    if (!unit) return null;
    switch (unit) {
        case Unit.AREA:
            return <span>m<sup>2</sup></span>
        case Unit.LENGTH:
            return <span>m</span>
        case null:

        default:
            return null
    }
}
type Attribute = {
    name: string,
    value: string,
    unit?: Unit
}
type DetailProps = {
    attributeList: Array<Attribute>,
    address? : string,
    estateType?: string

}
const DetailBox = (props: DetailProps) => {
    return (
        <div className="border rounded-lg border-2xl border-black overflow-clip p-3 my-2">
            <div className='mb-3'><b>Loại bất động sản</b> <span>{props.estateType}</span></div>
            <div className='mb-3'><b>Địa chỉ</b> <span>{props.address}</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                {props.attributeList.map((val) =>(
                    <SeparatedSection>
                        <div><b>{val.name}</b> : {val.value} {getUnitComponent(val.unit)}</div>
                    </SeparatedSection>
                ))}
            </div>
        </div>
    )
}
export default DetailBox