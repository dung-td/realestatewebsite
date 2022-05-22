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
            {segment?.caption && <h1 className="font-medium text-black text-xl">{segment.caption}</h1>}
            {segment.type == 'image' ? <img src={segment.content}/> : <p className="whitespace-pre-line">{segment.content}</p>}
        </div>
    </>)
}
export default ContentSegment