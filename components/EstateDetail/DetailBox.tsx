import {Unit} from '../../Enum'
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
    value: string | number,
    unit?: Unit
}
type DetailProps = {
    attributeList: Array<Attribute>,
    address? : string,
    estateType?: {
        name: string,
        slug: string
    }
}
const DetailBox = (props: DetailProps) => {
    return (
        <div className="border rounded-lg border-2xl border-gray-300 overflow-clip p-3 my-2">
            <div className='mb-3'><b>Loại bất động sản:</b> <span>{props.estateType?.name}</span></div>
            <div className='mb-3'><b>Địa chỉ:</b> <span>{props.address}</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 mb-2">
                {props.attributeList.map((val, index) =>(
                    <div className="container border-b border-gray-300 pb-2 mb-2 flex justify-between" key={index}>
                        <b>{val.name}:</b> <div>{val.value} {getUnitComponent(val.unit)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default DetailBox