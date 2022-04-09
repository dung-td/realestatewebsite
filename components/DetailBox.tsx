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
            <div className='mb-3'><b>Loại bất động sản:</b> <span>{props.estateType}</span></div>
            <div className='mb-3'><b>Địa chỉ:</b> <span>{props.address}</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mb-2">
                {props.attributeList.map((val) =>(
                    <div className="container border-b border-y-black container pb-2 mb-2 flex justify-between">
                        <b>{val.name}:</b> <div>{val.value} {getUnitComponent(val.unit)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default DetailBox