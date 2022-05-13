import {useState} from 'react'
import type { NextPage } from "next"
import ImageCarousel from '../../components/EstateDetail/ImageCarousel'
import DetailBox from "../../components/EstateDetail/DetailBox"
import CollapseDescription from '../../components/EstateDetail/CollapseDescription'
import { HeartIcon, ClockIcon, HomeIcon } from "@heroicons/react/outline"
import { PhoneIcon } from '@heroicons/react/solid'
import {Unit} from '../../Enum'
import PostContent from '../../components/EstateDetail/PostContent'
import PostDto from '../../interface/PostDTO'
interface TitleSectionProps{
    title: string,
    issuedDate?: string,
    address?: string
}

const Separator: React.FC = ()=>{
    return (
        <div className="my-3 border-b border-y-black container"></div>
    )
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
interface IPost{
    post: PostDto
}
const images = ["https://file4.batdongsan.com.vn/2022/01/25/20220125103335-9e40_wm.jpg",
"https://file4.batdongsan.com.vn/2022/01/25/20220125103335-d128_wm.jpg",
"https://file4.batdongsan.com.vn/2022/01/25/20220125103335-c7fe_wm.jpg",
"https://file4.batdongsan.com.vn/2022/01/25/20220125103335-d128_wm.jpg",
"https://file4.batdongsan.com.vn/2022/01/25/20220125103335-36dc_wm.jpg",]
const EstateDetail: NextPage<IPost> = (props)=>{
    const {owner} = props.post
    return (    
        <div className="sm:w-[1200px] mx-auto my-3 sm:flex rounded-lg border-black overflow-clip">
            <div className="container sm:w-3/4 sn:flex-initial" id="mainContent">
                <PostContent post={props.post}/>
                {/* <ImageCarousel imageList={images} className="border-2xl overflow-clip rounded-lg"/>
                <div className="p-3">
                    <TitleSection 
                    title="Bán nhà một mặt tiền - AEON Bình Dương"
                    issuedDate = "02-03-2022"
                    address = "Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương"/>
                    <div className="flex justify-between">
                        <div className="flex-1">
                            <p>Mức giá</p>
                            <p className="font-bold">2 tỷ - 50 triệu/m<sup>2</sup></p>
                        </div>
                        <div className="flex-1">
                            <p>Diện tích</p>
                            <p className="font-bold">40m<sup>2</sup></p>
                        </div>
                        <div className="flex-1">
                            <p>Phòng</p>
                            <p className="font-bold">3 PN + 3 PT</p>
                        </div>
                        <div className="">
                            <span className='justify-center align-center'><HeartIcon className="w-8 h-8 inline-block font-light"/> Lưu tin</span>
                        </div>                    
                    </div>
                    <Separator/>
                    <h1 className="mt-3 font-bold">Thông tin mô tả</h1>
                    <CollapseDescription>
                        <p>Bán nhà mặt ngõ 622 Minh Khai, lô góc, kinh doanh.</p>
                        <p>+ Mặt ngõ chính rộng 13,5m, 02 ô tô đỗ cửa ngày đêm, 2 mặt thoáng.</p>
                        <p>+ Diện tích nhỏ xinh 34,7m2 thực tế sử dụng gần 45m2, phù hợp ở kết hợp kinh doanh, đầu tư giữ tiền cho thuê.</p>
                        <p>+ Vị trí đắc địa cạnh timecity, dân trí cao, dân cư đông đúc, tiện ích đầy đủ, đúng tiêu chí buôn có bạn, bán có phường.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum saepe animi qui optio veritatis ullam temporibus error! Recusandae a, aliquid error magnam facere eligendi, illum blanditiis sint veniam ex eveniet explicabo similique eius ipsam distinctio sunt ipsa aspernatur reprehenderit vero totam inventore quisquam! Velit accusantium cupiditate nobis harum aspernatur natus exercitationem nostrum a in, distinctio impedit illo facilis veniam. Quae nesciunt ex perferendis beatae sunt sed, adipisci corrupti voluptate fugit sequi itaque corporis accusantium molestiae, reprehenderit cupiditate inventore impedit deserunt, quasi ad obcaecati? Laboriosam illum tenetur nam repudiandae iste, neque voluptatibus ducimus quisquam est sint, maxime quas labore. Architecto tempore aspernatur dignissimos a earum. Repellat vel quisquam voluptatem sapiente in assumenda perspiciatis, voluptatum doloribus mollitia corporis quod blanditiis tempore debitis voluptas aut sint error molestias autem unde dicta et iste? Modi, nobis temporibus. Culpa, rerum quod esse ad minus quaerat dolores? Veritatis, officia dolores repudiandae ex ea reprehenderit sint, deserunt corporis vero repellendus id at rem adipisci quisquam? Voluptatum inventore minima dolorem numquam commodi sit molestiae harum aperiam autem molestias dolor error ab sapiente reprehenderit, saepe eaque eveniet nemo exercitationem eligendi quae a aspernatur explicabo. Aliquid quos nam nostrum architecto, culpa cum nemo facilis. Quod quam modi dolor, non quas dignissimos sint nemo sunt impedit laboriosam vitae ullam sequi quisquam accusamus, aspernatur velit, dolorum eos repudiandae tempore obcaecati in ex? Consequuntur, tempore sapiente! Non neque, corporis consectetur porro sunt labore eum maxime accusamus tempore facilis mollitia vero, quas reprehenderit? Dolore cumque omnis rerum facere repudiandae debitis. Illo mollitia dolore assumenda dolorem dicta molestiae soluta dignissimos id voluptas, recusandae consectetur dolores ipsam vel perferendis? Quisquam cumque facere, inventore sit distinctio quam? Ipsa assumenda, voluptas eos quaerat aut voluptates omnis eligendi nihil tenetur. Ducimus tempore, officiis adipisci beatae accusamus voluptas excepturi eligendi amet at ullam sit placeat neque distinctio cum asperiores reiciendis in deserunt. Sequi eius minus dicta ut sapiente, consectetur id. Soluta earum quibusdam magnam officia ipsam illo assumenda! At dolorem aliquid repellat ratione illum ad, consectetur optio perferendis amet vero obcaecati. Ipsam molestiae eveniet culpa at voluptatem dolor officiis repellendus praesentium iste. Fugiat in nam beatae quasi, voluptate nesciunt nulla quisquam tempora? Culpa nihil cum adipisci quia eum magni fugiat, vel perferendis inventore repellendus rerum velit numquam doloremque nostrum repellat provident error quam repudiandae atque nam at explicabo hic quibusdam laudantium? Eum voluptas id laudantium sed repudiandae, delectus ab debitis eaque reiciendis repellat mollitia recusandae odit maiores, distinctio asperiores vitae deleniti. Iusto consequuntur praesentium repellendus, nisi incidunt ipsum est ex numquam cumque similique harum assumenda distinctio, odit quos maxime non corrupti qui nostrum molestiae minus, explicabo ab itaque. Ea temporibus, repellendus sit enim soluta doloremque aliquid est facilis sapiente odio iusto necessitatibus consectetur vitae omnis labore reiciendis totam assumenda magnam nihil molestiae animi suscipit ad commodi? Nisi excepturi vitae distinctio veniam perferendis quasi expedita quisquam quaerat veritatis, debitis tenetur deleniti? Quia quos blanditiis tenetur, atque quibusdam, consequuntur optio aliquid odit temporibus aut quaerat repellat corrupti praesentium, quisquam dignissimos doloribus veritatis laboriosam rerum. Ut doloremque expedita architecto cumque. Repellat, deleniti quam!</p>
                    </CollapseDescription>

                    <div className="mt-3 font-bold">Đặc điểm bất động sản</div>
                    <DetailBox
                        estateType="Nhà riêng"
                        address="Đại lộ Bình Dương, Thuận Giao, Thuận An, Bình Dương"
                        attributeList={[{name: "Diện tích", value: "50", unit: Unit.AREA}, {name: "Số tầng", value: "2"}, {name: "Chiều ngang", value: "12", unit: Unit.LENGTH}, {name:"Chiều sâu", value: "20", unit:Unit.LENGTH}]}
                    />
                </div>             */}

            </div>
            <div className="container flex sm:border-gray-300 sm:w-1/4 sm:h-[50vh] sm:flex-col sm:justify-center items-center justify-around border border-gray-300" id="sideContent">
                <img className="w-20 h-20 rounded-full bg-cyan-500"
                src={owner.avatar}/>
                <p className="my-1">{owner.name}</p>
                <a className="italic cursor-pointer">Xem thêm bài đăng khác</a>
                <a href={`tel:${owner.phone}`} className="z-50 mt-3 fixed bg-cyan-500 p-3 text-white rounded-xl bottom-5 left-1/2 sm:static">
                    <PhoneIcon className='inline h-5 w-5'/>{owner.phone}
                </a>
            </div>
            <br/>
            <br/>
            <br/>
        </div>        
    )
}
export default EstateDetail


interface IPathParam{
    params:{
        estateTypeSlug: string,
        estatePostSlug: string
    }
}
// export async function getStaticPaths() {
//     // Call an external API endpoint to get posts
//     const res = await fetch('http://localhost:3001/api/post/slug')
//     const data = await res.json()
//     const {slugs} = data
//     console.log(slugs)
//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths: slugs, fallback: false }
//   }
  

// export async function getStaticProps (pathParam: IPathParam) {
//     const { params } = pathParam
//     const res = await fetch(`http://localhost:3001/api/post/slug?slug=${params.estatePostSlug}`)
//     const data = await res.json()
//     const {post} =data
//     console.log(post)
//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//       props: {
//         post,
//       },
//     }
//   }
  