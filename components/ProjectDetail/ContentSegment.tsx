interface IContentSegment{
    type: 'image'| 'text',
    content: string,
    caption: string,
    _id: string
}
interface IProp {
    segment: IContentSegment
}
const ContentSegment = (props: IProp)=>{
    const { segment } = props
    return (<>
        <div>
            {segment.type == 'image' ? <p><img className="container" src={segment.content}/>{segment?.caption && <p className="font-small text-sm text-black text-center italic">{segment.caption}</p>}</p> : <p className="whitespace-pre-line">{segment.content}</p>}
        </div>
    </>)
}
export default ContentSegment