import { LocationOn, Phone, Apartment, Mail, HeadsetMic, PhoneInTalk, Language, ArrowDropDown } from "@mui/icons-material"
import { useRouter } from "next/router"
import pagedata from '../../data/page.json'
import DKDKList from "./DKDKList"
import OfficeDrop from "./OfficeDrop"
import Link from "next/link"

const ContentPanel = () => {
    const data = pagedata
    const router = useRouter()



    const OfficeCard = (name: string, address: string, phone: string) => {
        return (
            <div className="w-60 h-40">
                <span className="font-bold">{name}</span><br />
                <span><LocationOn color="action" />{address}</span><br />
                <span><Phone color="action" />{phone}</span>
            </div>
        )
    }

    return (
        <div className="bg-white w-full mr-36 mb-4 rounded">
            {data.map((page, index) => {
                if (router.asPath == page.pid)
                    if (index == 0)
                        return (<div className="p-10 space-y-8"><h1 className="text-3xl  font-bold">{page.title}</h1>
                            <p className="text-md">{page.comment}</p></div>)
                    else if (index == 1)
                        return (<div className="p-10 space-y-8"><h1 className="text-3xl  font-bold">{page.title}</h1>
                            <div className="text-md space-y-4">
                                <p>Quy Chế Hoạt Động này ("<b>Quy Chế Hoạt Động</b>") quy định những nội dung về hoạt động của Người Đăng Tin và Người Xem Tin trên Website cũng như quyền và nghĩa vụ của Người Đăng Tin, Người Xem Tin và Vercel liên quan đến những hoạt động đó.</p>
                                <p>Trước khi tiến hành bất cứ hoạt động nào liên quan đến Website, Khách Hàng đã đọc, hiểu rõ và đồng ý với tất cả các nội dung tại Quy Định Chung và Quy Chế Hoạt Động.</p>
                                <p>Khách Hàng cũng hiểu và đồng ý rằng, Vercel có toàn quyền sửa đổi, bổ sung và/hoặc thay thế bất kỳ và/hoặc toàn bộ các Quy Chế Hoạt Động này (“<b>Thay Đổi</b>”) tại bất kỳ thời điểm nào. Trừ khi được Vercel quy định khác đi, các Thay Đổi sẽ có hiệu lực ngay tại thời điểm Vercel đăng tải lên giao diện của Website mà không cần thông báo trước cho Khách Hàng. Bằng việc tiếp tục thực hiện việc truy cập Website sau thời điểm các Thay Đổi được đăng tải, Khách Hàng được coi là đã đồng ý với các Thay Đổi. Nếu Khách Hàng không đồng ý với các nội dung Thay Đổi, Khách Hàng có thể ngừng việc truy cập Website. Để đảm bảo Khách Hàng không bỏ sót bất kỳ Thay Đổi nào, vui lòng kiểm tra thường xuyên nội dung Quy Chế Hoạt Động này để nắm được những cập nhật mới nhất của Vercel.</p>
                                <p>Các thuật ngữ viết tắt hoặc viết hoa được sử dụng trong Quy Chế Hoạt Động này, trừ khi được định nghĩa khác đi ở đây, sẽ có ý nghĩa như được quy định tại Quy Định Chung.</p>
                                <h3 className="font-bold">Nguyên tắc chung</h3>
                                <p>Quy Chế Hoạt Động này áp dụng cho Meey Land và tất cả các Khách Hàng đáp ứng đầy đủ các điều kiện tại Điều 5.1 của Quy Định Chung.</p>
                                <p>Bất kỳ Khách Hàng nào trước khi tham gia vào bất kỳ giao dịch nào liên quan đến Website đều phải tự tìm hiểu trách nhiệm pháp lý của mình đối với luật pháp hiện hành của Việt Nam, phải đọc, hiểu và đồng ý với Quy Chế Hoạt Động này và những nội dung khác trong ĐKĐK.</p>
                                <p>Các Khách Hàng sử dụng Dịch Vụ trên Website có thể tự do tìm hiểu, trao đổi, thỏa thuận và giao dịch với các Khách Hàng khác có nhu cầu liên quan nhưng phải thực hiện trên cơ sở tôn trọng quyền, lợi ích hợp pháp của nhau và tuân thủ đầy đủ quy định pháp luật.</p>
                                <p>Trường hợp Khách Hàng không đồng ý với bất kỳ nội dung nào tại ĐKĐK nói chung và Quy Chế Hoạt Động này nói riêng, Khách Hàng có thể chấm dứt việc sử dụng Dịch Vụ bằng cách ngừng việc truy cập vào Website.</p>
                                <p>Quy Chế Hoạt Động này có hiệu lực thi hành kể từ ngày 16/11/2021 và thay thế tất cả những quy chế hoạt động khác được ban hành và đăng tải trước đây trên Website.</p>
                                <h3 className="font-bold">Giao dịch giữa Người Đăng Tin và Người Xem Tin trên Website</h3>
                                <p>Người Đăng Tin và Người Xem Tin phải tự trao đổi, thỏa thuận các nội dung liên quan đến các giao dịch giữa Người Đăng Tin và Người Xem Tin (nếu có) bao gồm cả việc đàm phán, xác nhận đơn hàng, hủy đơn hàng, ký kết, thanh toán, thực hiện thủ tục pháp lý, v.v. và phải tự chịu trách nhiệm đối với mọi trao đổi, thỏa thuận và giao dịch đó.</p>
                                <p>Meey Land sẽ không tham gia vào bất kỳ tương tác hay thỏa thuận, giao dịch nào giữa các Khách Hàng.</p>
                                <p>Bất kể nội dung ở trên, Meey Land được bảo lưu quyền giám sát, tạm dừng, ngăn chặn và chấm dứt những trao đổi và tương tác giữa các Khách Hàng thực hiện trên phạm vi Website để bảo vệ quyền lợi Người Tiêu Dùng và đảm bảo tuân thủ ĐKĐK và quy định pháp luật.</p>
                                <h3 className="font-bold">Quyền và nghĩa vụ của Meey Land</h3>
                                <h3 className="font-bold">Quyền và nghĩa vụ</h3>
                                <p>Được yêu cầu Khách Hàng cung cấp thông tin chính xác, trung thực và cập nhật khi thực hiện giao dịch trên Website.</p>
                                <p>Được yêu cầu và công bố thông tin của Người Đăng Tin theo đúng quy định của pháp luật.</p>
                                <p>Được yêu cầu Người Đăng Tin phải cung cấp Giấy chứng nhận đủ điều kiện kinh doanh đối với hàng hóa, dịch vụ trên Tin Đăng đó, bao gồm nhưng không giới hạn ở Giấy chứng nhận quyền sử dụng đất.</p>
                                <p>Được yêu cầu Khách Hàng thực hiện các quyền và nghĩa vụ theo đúng nội dung đã thỏa thuận với Người Tiêu Dùng.</p>
                                <p>Được bảo lưu quyền sở hữu trí tuệ đối với Website như quy định tại Điều 8 của Quy Định Chung. Để làm rõ thêm, quyền sở hữu trí tuệ đối với Website bao gồm nhưng không giới hạn ở những thông tin, tài liệu, giao diện, các thiết kế, trình bày (layout) các hình ảnh, v.v. mà không phụ thuộc vào việc các quyền sở hữu trí tuệ đó đã đăng ký hay chưa.</p>
                                <p>Phải xây dựng quy định, hướng dẫn, quy chế hoạt động và cung cấp thông tin đầy đủ đến các Khách Hàng.</p>
                                <p>Phải xây dựng cơ chế kiểm tra, giám sát hoạt động của các Khách Hàng trên phạm vi Website.</p>
                                <p>Phải kiểm tra, rà soát và xử lý các Khách Hàng vi phạm ĐKĐK này và/hoặc quy định của pháp luật liên quan đến việc sử dụng Website.</p>
                                <p>Phải lưu trữ thông tin cá nhân của các Khách Hàng và thường xuyên cập nhật những thông tin thay đổi, bổ sung có liên quan. Tuân thủ các quy định về bảo vệ thông tin cá nhân của Khách Hàng.</p>
                                <p>Phải đảm bảo an toàn thông tin liên quan đến bí mật kinh doanh của Khách Hàng.</p>
                                <p>Phải có biện pháp xử lý kịp thời khi phát hiện hoặc nhận được phản ánh về hành vi kinh doanh vi phạm pháp luật trên Website.</p>
                                <p>Phải hỗ trợ Cơ quan quản lý nhà nước điều tra các hành vi kinh doanh vi phạm pháp luật, cung cấp thông tin đăng ký, lịch sử giao dịch và các tài liệu khác về đối tượng có hành vi vi phạm pháp luật trên Website.</p>
                                <p>Phải công bố công khai cơ chế giải quyết các tranh chấp phát sinh trong quá trình giao dịch trên Website.</p>
                                <p>Có các quyền và phải tuân theo các nghĩa vụ khác được quy định tại ĐKĐK này và theo quy định của pháp luật   </p>
                                <h3 className="font-bold">Giới hạn trách nhiệm</h3>
                                <p>Ngoài nội dung được quy định tại Điều 7 của Quy Định Chung, Meey Land còn được miễn trừ những trách nhiệm sau:</p>
                                <p>Meey Land không chịu trách nhiệm về bất kỳ quyết định thuê, cho thuê, mua, bán, chuyển nhượng, nhận chuyển nhượng v.v. liên quan đến bất động sản hiện tại và trong tương lai của Khách Hàng cũng như mối quan hệ giữa Khách Hàng và các cá nhân, tổ chức liên quan trong quá trình thực hiện những giao dịch đó.</p>
                                <p>Meey Land luôn nỗ lực duy trì hệ thống kỹ thuật trong tình trạng ổn định, an toàn và tuân thủ các quy định pháp luật liên quan đến việc cung cấp các dịch vụ thương mại điện tử và thực hiện các giao dịch trực tuyến. Bất kể quy định trên đây, Meey Land được miễn trừ mọi trách nhiệm nếu hệ thống kỹ thuật của Meey Land không đảm bảo hoạt động trong trường hợp phát sinh các Sự Kiện Bất Khả Kháng.</p>
                                <p>Khi thực hiện các giao dịch trên Meey Land, Khách Hàng phải thực hiện đúng theo các quy định, hướng dẫn, chỉ dẫn của Meey Land và tuân thủ quy định pháp luật hiện hành, có liên quan. Meey Land sẽ không chịu trách nhiệm trước những thiệt hại, tổn thất của Khách Hàng và/hoặc bất kỳ bên thứ ba nào khác phát sinh từ hoặc liên quan đến quá trình xác lập, thực hiện giao dịch giữa các Khách Hàng và/hoặc giữa Khách Hàng với bất kỳ bên thứ ba nào khác, trừ khi những thiệt hại, tổn thất này là do lỗi cố ý của Meey Land.</p>
                                <h3 className="font-bold">Quyền và nghĩa vụ của Người Đăng Tin</h3>
                                <p>Được tạo lập tài khoản để sử dụng các Dịch Vụ trên Website.</p>
                                <p>Được sử dụng các Dịch Vụ trên Website tuân theo ĐKĐK.</p>
                                <p>Được khiếu nại Người Xem Tin hoặc Meey Land đối với mọi vấn đề phát sinh liên quan đến việc sử dụng Dịch Vụ hoặc giao dịch với Người Xem Tin.</p>
                                <p>Được yêu cầu Cơ quan có thẩm quyền bảo vệ trong trường hợp tranh chấp với Người Xem Tin không được giải quyết thỏa đáng.</p>
                                <p>Phải tuân thủ đầy đủ quy định đăng tin tại Quy định đăng tin và hoàn toàn chịu trách nhiệm về Tin Đăng của mình.</p>
                                <p>Phải tự chịu trách nhiệm về bảo mật Tài Khoản Đăng Nhập (nếu có) và về những thông tin mà Người Đăng Tin đăng tải, cung cấp cho Meey Land và Người Xem Tin. Để làm rõ, những nội dung, tài liệu, thông tin, đường dẫn, v.v. mà Người Đăng Tin đăng tải, truyền bá, cung cấp cho Meey Land và/hoặc Người Xem Tin sẽ phải tuân thủ nguyên tắc tại Điều 4 của Quy Định Chung.</p>
                                <p>Phải cung cấp đầy đủ, chính xác, trung thực và chi tiết các thông tin cá nhân và thông tin pháp lý khác cho Meey Land theo quy định tại ĐKĐK.</p>
                                <p>Phải đáp ứng đầy đủ các quy định của pháp luật có liên quan để thực hiện việc Đăng Tin và tiến hành giao dịch với Meey Land và các Khách Hàng khác, không thuộc các trường hợp cấm kinh doanh hay không đủ điều kiện kinh doanh theo quy định của pháp luật.</p>
                                <p>Trường hợp có khiếu nại phát sinh, Người Đăng Tin có trách nhiệm cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc cho Người Xem Tin và Meey Land (tùy từng trường hợp).</p>
                                <p>Phải bồi thường cho những thiệt hại mà Meey Land và/hoặc Người Xem Tin phải chịu do Người Đăng Tin vi phạm ĐKĐK và/hoặc quy định pháp luật.</p>
                                <p>Trường hợp Người Đăng Tin là bên muốn bán, cho thuê và/hoặc sang nhượng bất động sản, Người Đăng Tin phải thực hiện thêm những nghĩa vụ sau:</p>
                                <p>Phải có quyền sở hữu hợp pháp đối với bất động sản hoặc phải nhận được sự ủy quyền hợp pháp của chủ sở hữu bất động sản này.</p>
                                <p>Phải cung cấp đầy đủ, chính xác, trung thực và chi tiết các thông tin liên quan đến hàng hóa, dịch vụ cho Người Xem Tin.</p>
                                <p>Phải chịu trách nhiệm về chất lượng của hàng hóa, dịch vụ cung cấp và nội dung thỏa thuận với Người Xem Tin.</p>
                                <p>Phải cung cấp thông tin về tình hình kinh doanh của Người Đăng Tin khi có yêu cầu của Cơ quan Nhà nước có thẩm quyền để phục vụ hoạt động thống kê thương mại điện tử.</p>
                                <p>Có các quyền và phải tuân theo các nghĩa vụ khác tại Quy Chế Hoạt Động này, ĐKĐK và theo quy định của pháp luật, bao gồm nhưng không giới hạn ở lĩnh vực thanh toán, quảng cáo, khuyến mại, bảo vệ quyền lợi người tiêu dùng, quyền sở hữu trí tuệ, thuế và hóa đơn, v.v.</p>
                                <h3 className="font-bold">Quyền và nghĩa vụ của Người Xem Tin</h3>
                                <p>Được tạo lập tài khoản để sử dụng các Dịch Vụ trên Website. Để làm rõ, Khách Hàng không cần phải đăng nhập để xem được Tin Đăng trên Website, tuy nhiên Meey Land khuyến khích Khách Hàng tạo Tài Khoản Đăng Nhập để có thể được sử dụng đầy đủ các Dịch Vụ và Sản Phẩm khác của Meey Land cũng như được bảo vệ quyền lợi tối đa trong trường hợp có bât kỳ tranh chấp, khiếu nại phát sinh.</p>
                                <p>Được sử dụng các Dịch Vụ trên Website tuân theo ĐKĐK.</p>
                                <p>Được khiếu nại Người Đăng Tin hoặc Meey Land đối với mọi vấn đề phát sinh liên quan đến việc sử dụng Dịch Vụ hoặc giao dịch với Người Đăng Tin.</p>
                                <p>Được yêu cầu Cơ quan có thẩm quyền bảo vệ trong trường hợp tranh chấp với Người Đăng Tin không được giải quyết thỏa đáng.</p>
                                <p>Phải tự chịu trách nhiệm về bảo mật Tài Khoản Đăng Nhập và về những thông tin mà Người Xem Tin đăng tải, cung cấp cho Meey Land và Người Đăng Tin. Để làm rõ, những nội dung, tài liệu, thông tin, đường dẫn, v.v. mà Người Xem Tin đăng tải, truyền bá, cung cấp cho Meey Land và/hoặc Người Đăng Tin sẽ phải tuân thủ nguyên tắc tại Điều 4 của Quy Định Chung.</p>
                                <p>Phải cung cấp đầy đủ, chính xác, trung thực và chi tiết các thông tin cá nhân và thông tin pháp lý khác cho Meey Land theo quy định tại ĐKĐK.</p>
                                <p>Phải đọc kỹ nội dung Tin Đăng, xác định rõ đối tượng Đăng Tin, sự chi tiết, độ uy tín của Tin Đăng, có thể kết hợp sử dụng các tiện ích khác do Meey Land cung cấp tại Website và các Sản Phẩm khác như tra cứu quy hoạch để tham khảo thêm về tính chính xác của Tin Đăng.</p>
                                <p>Phải đáp ứng đầy đủ các quy định của pháp luật có liên quan để tiến hành giao dịch với Meey Land và các Khách Hàng khác, không thuộc các trường hợp cấm kinh doanh hay không đủ điều kiện kinh doanh theo quy định của pháp luật.</p>
                                <p>Trường hợp có khiếu nại phát sinh, Người Xem Tin có trách nhiệm cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc cho Người Đăng Tin và Meey Land (tùy từng trường hợp).</p>
                                <p>Phải bồi thường cho những thiệt hại mà Meey Land và/hoặc Người Đăng Tin phải chịu do Khách Hàng vi phạm ĐKĐK và/hoặc quy định pháp luật</p>
                                <p>Trường hợp Người Xem Tin là bên muốn bán, cho thuê và/hoặc sang nhượng bất động sản cho Người Đăng Tin, Người Xem Tin có trách nhiệm:</p>
                                <p>Phải có quyền sở hữu hợp pháp đối với bất động sản hoặc phải nhận được sự ủy quyền hợp pháp của chủ sở hữu bất động sản này.</p>
                                <p>Phải cung cấp đầy đủ, chính xác, trung thực và chi tiết các thông tin liên quan đến hàng hóa, dịch vụ cho Người Đăng Tin.</p>
                                <p>Phải chịu trách nhiệm về chất lượng của hàng hóa, dịch vụ cung cấp và nội dung thỏa thuận với Người Đăng Tin.</p>
                                <p>Có các quyền và phải tuân theo các nghĩa vụ khác tại Quy Chế Hoạt Động này, ĐKĐK và theo quy định của pháp luật.</p>
                                <h3 className="font-bold">Bảo mật thông tin</h3>
                                <p>Các quy định về an toàn thông tin, quản lý thông tin trên Website cũng như chính sách bảo vệ thông tin cá nhân của Người Đăng Tin và Người Xem Tin sẽ được thực hiện tuân theo Chính Sách Bảo Mật.</p>
                                <h3 className="font-bold">Cơ chế kiểm tra, giám sát</h3>
                                <p>Đối với Tin Đăng của Khách Hàng</p>
                                <p>Đối với các Khách Hàng không đăng nhập (vãng lai):</p>
                                <p>Khách Hàng vãng lai vẫn có thể tiến hành Đăng Tin trên Website. Tuy nhiên, Meey Land sẽ có Bộ phận kiểm duyệt nội dung để tiến hành kiểm tra thông tin đăng tải của Khách Hàng trong thời gian là 24h kể từ thời điểm Khách Hàng thực hiện Đăng Tin.</p>
                                <p>Meey Land cũng sẽ yêu cầu Khách Hàng cung cấp thông tin liên quan được quy định tại Điều 5.1 của Quy Định Chung để tiến hành xác minh đối tượng Đăng Tin theo đúng quy định pháp luật.</p>
                                <p>Bộ phận kiểm duyệt nội dung sẽ tiến hành xét duyệt và cho phép hiển thị nếu Tin Đăng tuân thủ quy định hoặc sẽ từ chối yêu cầu Đăng Tin và/hoặc xóa Tin Đăng và thông báo đến Khách Hàng.</p>
                                <p>Khách Hàng vãng lai sẽ không thể tự mình thay đổi hay chỉnh sửa bất kỳ nội dung Tin Đăng nào đã được hiển thị trên Website.</p>
                                <p>Kể cả sau khi Bộ phận kiểm duyệt nội dung đã cho phép hiển thị Tin Đăng, Meey Land vẫn bảo lưu quyền chỉnh sửa, xóa bỏ Tin Đăng theo quyết định của Meey Land tuân thủ quy định pháp luật.</p>
                                <p>Đối với các Khách Hàng đã đăng nhập:</p>
                                <p>Khách Hàng đã đăng nhập bằng Tài Khoản Đăng Nhập có thể tự mình tiến hành Đăng Tin hoặc gửi thông tin cần Đăng Tin cho Meey Land.</p>
                                <p>Trường hợp Khách Hàng tự Đăng Tin, Tin Đăng sẽ được hiển thị ngay sau khi Khách Hàng tiến hành Đăng Tin, tuy nhiên, Meey Land sẽ tiến hành hậu kiểm để rà soát thông tin Đăng Tải phù hợp với ĐKĐK.</p>
                                <p>Trường hợp Khách Hàng gủi thông tin cần Đăng Tin cho Meey Land để Meey Land hỗ trợ Đăng Tin, Bộ phận kiểm duyệt nội dung sẽ tiến hành xác thực, xác minh nội dung cần Đăng Tin.</p>
                                <p>Trong quá trình kiểm tra nội dung trước và sau khi Tin Đăng được hiển thị, Meey Land có thể yêu cầu Khách Hàng cung cấp các thông tin, tài liệu liên quan để xác minh và Khách Hàng có trách nhiệm cung cấp tương ứng.</p>
                                <p>Đối với những nội dung Tin Đăng vi phạm quy định của Meey Land, tùy theo nhận định của mình, Meey Land sẽ có quyền thực hiện một hoặc một số các hành động sau và sẽ có thông báo tương ứng cho Khách Hàng:</p>
                                <p>Yêu cầu Khách Hàng chỉnh sửa nội dung Tin Đăng;</p>
                                <p>Chuyển Tin Đăng sang chuyên mục, chủ đề mà Meey Land cho là phù hợp hơn;</p>
                                <p>Từ chối Đăng Tin và/hoặc xóa bỏ Tin Đăng.</p>
                                <p>Nếu Khách Hàng tin rằng sự chỉnh sửa, xóa bỏ, chuyển đổi như trên của Meey Land là nhầm lẫn, vui lòng liên hệ lại cho Meey Land.</p>
                                <p>Đối với trao đổi, giao dịch giữa các Khách Hàng</p>
                                <p>Meey Land sẽ không can thiệp và nội dung trao đổi và giao dịch giữa các Khách Hàng, tuy nhiên Meey Land sẽ giám sát nội dung Khách Hàng trao đổi trong phạm vi Website để đảm bảo quyền lợi Người Tiêu Dùng và tuân thủ những quy định khác của pháp luật</p>
                                <h3 className="font-bold">Cơ chế xử lý khiếu nại, giải quyết tranh chấp</h3>
                                <p>Nguyên tắc xử lý khiếu nại, giải quyết tranh chấp:</p>
                                <p>Trong mọi trường hợp, Khách Hàng phải chịu trách nhiệm đối với việc xem xét, đánh giá, tìm hiểu, đưa ra quyết định đối với việc thực hiện bất kỳ hoạt động và giao dịch nào liên quan đến Website, và phải giải quyết mọi khiếu nại, tranh chấp phát sinh từ hoặc liên quan đến những trao đổi, thỏa thuận với các Khách Hàng khác.</p>
                                <p>Trong trường hợp phát sinh tranh chấp giữa các Khách Hàng, các bên sẽ ưu tiên giải quyết bằng biện pháp thương lượng, hòa giải. Nếu thông qua hình thức thương lượng, hòa giải mà vẫn không thể giải quyết được mâu thuẫn phát sinh thì một trong các bên có quyền gửi khiếu nại tới cho Meey land và/hoặc gửi đơn yêu cầu Cơ quan có thẩm quyền giải quyết nhằm đảm bảo lợi ích hợp pháp của các bên.</p>
                                <p>Meey Land tôn trọng và nghiêm túc thực hiện các quy định của pháp luật về bảo vệ quyền lợi của Người Tiêu Dùng, tuy nhiên Meey Land sẽ chỉ có quyền và nghĩa vụ tiến hành những hoạt động thuộc thẩm quyền của Meey Land, tuân theo ĐKĐK và trong phạm vi pháp luật cho phép. Meey Land không cam kết hay bảo đảm rằng sẽ xử lý ổn thỏa mọi tranh chấp giữa các Khách Hàng, hay việc tất cả Khách Hàng sẽ tuân theo yêu cầu, đề nghị của Meey Land, hay Người Tiêu Dùng sẽ được bồi hoàn đầy đủ mọi thiệt hại, tổn thất, chi phí.</p>
                                <p>Để tự bảo vệ quyền lợi của mình và hỗ trợ Meey Land trong việc bảo vệ quyền lợi của chính Khách Hàng, Khách Hàng cần cung cấp cho Meey Land đầy đủ, chính xác, trung thực mọi thông tin có liên quan.</p>
                                <p>Người Tiêu Dùng có thể gửi khiếu nại trực tiếp đến Người Đăng Tin hoặc Người Xem Tin (tùy từng trường hợp) hoặc liên hệ với Meey Land.</p>
                                <p>Sau khi Meey Land nhận được khiếu nại từ phía Khách Hàng, Meey Land sẽ xác nhận lại thông tin, nếu đúng như phản ánh thì tuỳ theo mức độ, Meey Land sẽ có những biện pháp xử lý kịp thời, phù hợp với ĐKĐK và quy định pháp luật.</p>
                                <p>Bất kể sự tham gia của Meey Land trong việc giải quyết tranh chấp, các bên liên quan bao gồm cả Người Đăng Tin và Người Xem Tin đều có vai trò và trách nhiệm tích cực trong việc giải quyết các vấn đề phát sinh, bao gồm cả việc cung cấp cho Meey Land những thông tin, tài liệu, giấy tờ liên quan một cách chính xác và đầy đủ.</p>
                                <p>Quy trình tiếp nhận thông tin khiếu nại, giải quyết tranh chấp của Meey Land:</p>
                                <p>Bước 1: Tất cả các yêu cầu giải quyết khiếu nại sẽ được chuyển đến bộ phận Chăm sóc khách hàng của Meey Land: Hotline: 0869.092.929; Email: contact@meeyland.com</p>
                                <p>Bước 2: Sau khi tiếp nhận yêu cầu giải quyết khiếu nại, bộ phận Chăm sóc khách hàng sẽ tiến hành xác minh lại những thông tin do Khách Hàng cung cấp (qua nhân viên có liên quan, và nội dung thông tin trên Website).</p>
                                <p>Bước 3: Tùy theo tính chất và mức độ của khiếu nại, Meey Land sẽ có những biện pháp cụ thể hỗ trợ các bên liên quan đến khiếu nại, tranh chấp đó Trong trường hợp cần thiết, Meey Land sẽ tiến hành lập tờ trình giải quyết khiếu nại, thực hiện thủ tục phê duyệt nội bộ và gửi văn bản phúc đáp cụ thể cho Khách Hàng.</p>
                                <p>Bước 4: Trường hợp Khách Hàng không đồng ý với phương thức giải quyết Meey Land đưa ra, Khách Hàng có thể yêu cầu Meey Land giải quyết lại hoặc đưa vụ việc ra Cơ quan có thẩm quyền giải quyết theo quy định của pháp luật. Quy trình lặp lại các bước 2, 3, 4.</p>
                                <p>Bước 5: Trường hợp Khách Hàng vẫn không đồng ý với phương án giải quyết lại mà Meey Land đưa ra, Khách Hàng có thể đưa vụ việc ra Cơ quan có thẩm quyền giải quyết theo quy định của pháp luật.</p>
                                <h3 className="font-bold">Xử lý vi phạm</h3>
                                <p>Việc xử lý vi phạm sẽ được thực hiện tuân theo nguyên tắc tại Điều 6 của Quy Định Chung.</p>
                                <p>Biện pháp xử lý với các hành vi xâm phạm quyền lợi Người Tiêu Dùng trên Website:</p>
                                <p>Meey Land chỉ đóng vai trò là cầu nối giữa những Khách Hàng có nhu cầu liên quan, cụ thể là giữa Người Đăng Tin và Người Xem Tin. Meey Land không chịu trách nhiệm đối với Tin Đăng của Người Đăng Tin cũng như những giao dịch được thực hiện giữa Người Đăng Tin và Người Xem Tin, tuy nhiên Meey Land luôn nỗ lực tối đa để bảo vệ quyền và lợi ích của Người Tiêu Dùng.</p>
                                <p>Trường hợp Meey Land nhận được bất kỳ báo cáo xấu hay khiếu nại nào khác từ một Người Tiêu Dùng về bất kỳ Tin Đăng hay Khách Hàng nào, Meey Land sẽ nhanh chóng tiếp nhận, đánh giá và đưa ra phương án xử lý theo cơ chế nói trên.</p>
                                <p>Trường hợp Người Tiêu Dùng phát sinh mâu thuẫn với Khách Hàng khác hoặc bị tổn hại lợi ích hợp pháp trong quá trình giao dịch với Khách Hàng khác đó, Meey Land sẽ cung cấp cho Người Tiêu Dùng những thông tin liên quan về Khách Hàng khác đó trong phạm vi được pháp luật cho phép, đồng thời sẽ tích cực hỗ trợ Người Tiêu Dùng bảo vệ quyền và lợi ích hợp pháp của mình.</p>
                                <p>Biện pháp xử lý vi phạm đối với Người Đăng Tin không tuân thủ Quy Chế Hoạt Động:</p>
                                <p>Meey Land sẽ ngăn chặn và loại bỏ khỏi Website những Tin Đăng về hàng hóa, dịch vụ thuộc danh mục hàng hóa, dịch vụ cấm kinh doanh theo quy định của pháp luật và hàng hóa hạn chế kinh doanh.</p>
                                <p>Meey Land sẽ loại bỏ khỏi Website những Tin Đăng bán hàng giả, hàng nhái, hàng nhập lậu, hàng vi phạm quyền sở hữu trí tuệ và các hàng hóa, dịch vụ vi phạm pháp luật khác khi phát hiện hoặc nhận được phản ánh có căn cứ xác thực về những thông tin này.</p>
                                <p>Ngoài ra, đối với các Khách Hàng vi phạm về Đăng Tin, Meey Land sẽ xử lý như sau:</p>
                                <p>Meey Land có quyền chỉnh sửa, thay đổi hay xóa bỏ những Tin Đăng vi phạm tùy theo quyết định của mình mà không cần giải thích lý do hay thông báo trước với Người Đăng Tin.</p>
                                <p>Khách Hàng vi phạm quy định về Đăng Tin 03 lần sẽ bị khóa Tài Khoản Đăng Nhập trong thời gian 01 tuần</p>
                                <p>Khách Hàng vi phạm quy định Đăng Tin bị khóa Tài Khoản Đăng Nhập 03 lần theo quy định trên sẽ bị khóa Tài Khoản Đăng Nhập vĩnh viễn</p>
                                <p>Bất kể quy định trên, Khách Hàng thực hiện Đăng Tin vi phạm liên quan đến vi phạm pháp luật như: chống phá nhà nước, bán hàng cấm sẽ bị khóa Tài Khoản Đăng Nhập vĩnh viễn.</p>
                                <p>Người Đăng Tin bị phản ánh cung cấp thông tin không chính xác về bất động sản đăng bán, cho thuê, sang nhượng hoặc có hành vi lừa đảo và Meey Land đã xác định thông tin phản ánh đó là chính xác thì Meey Land sẽ tiến hành khóa Tài Khoản Đăng Nhập của Người Đăng Tin đó 03 tháng hoặc vĩnh viễn tùy mức độ của hành vi.</p>
                            </div>
                        </div>)
                    else if (index == 2)
                        return (<div className="p-10 space-y-8"><h1 className="text-3xl  font-bold">{page.title}</h1>
                            <div className="text-md space-y-4">
                                <h3>Giới thiệu về Website</h3>
                                <p>Website meeyland.com là Cổng thông tin bất động sản trực tuyến - một trong những sản phẩm cốt lõi trong 26 sản phẩm/tiện ích đã và sẽ được triển khai trực thuộc Hệ sinh thái Công nghệ Bất động sản Meey Land của Công ty Cổ phần Tập đoàn Meey Land.</p>
                                <p>Sứ mệnh của website meeyland.com là trở thành giải pháp giúp kết nối người mua và người bán, từ đó, giảm bớt thời gian, công sức khi giao dịch và tăng tính thanh khoản trong lĩnh vực bất động sản.</p>
                                <p>Với tiêu chí “Nhanh - Đơn giản - Hiệu quả”, chúng tôi mang đến cho khách hàng những trải nghiệm tuyệt vời về sự kết hợp giữa phương thức trao đổi thông tin truyền thống và nền tảng công nghệ hiện đại.</p>
                                <p>Đồng thời, với kho dữ liệu khổng lồ, meeyland.com cũng tự tin đáp ứng nhu cầu đa dạng của người tìm kiếm bất động sản.</p>
                                <p>Các dịch vụ/ tiện ích mà website meeyland.com đang cung cấp và định hướng sẽ triển khai như sau:</p>
                                <ul className="space-y-4">
                                    <li>Đăng tin mua bán/cho thuê/sang nhượng bất động sản;</li>
                                    <li>Đăng tin giới thiệu các dự án bất động sản;</li>
                                    <li>Đặt banner quảng cáo và giới thiệu thông tin về các công trình, dự án cho các chủ đầu tư;</li>
                                    <li>Đẩy tin, làm mới tin đăng;</li>
                                    <li>Tìm kiếm bất động sản theo yêu cầu;</li>
                                    <li>Xem thông tin bất động sản, so sánh bất động sản;</li>
                                    <li>Đặt lịch hẹn xem bất động sản;</li>
                                    <li>Kết nối, trò chuyện (chat) trực tuyến với người đăng tin;</li>
                                    <li>Tích hợp với bản đồ quy hoạch;</li>
                                    <li>Định giá bất động sản.</li>
                                </ul>
                                <p>Mục tiêu hướng tới của meeyland.com là trở thành Cổng thông tin bất động sản trực tuyến hàng đầu Việt Nam và trong tương lai sẽ nhân bản, phát triển sản phẩm ra toàn cầu. Ngoài phiên bản web, chúng tôi cũng đang phát triển ứng dụng cho meeyland.com để phục vụ khách hàng mọi lúc mọi nơi.</p>
                            </div>
                        </div>)
                    else if (index == 3)
                        return (<div className="p-10 space-y-8"><h1 className="text-3xl  font-bold">{page.title}</h1>
                            <div className="text-md">
                                <p>Chào mừng Quý khách đến với website batdongsan88.com (“<b>Website</b>”) – Trang thông tin điện tử tổng hợp và là website thương mại điện tử đang trong quá trình thử nghiệm, hướng tới mục tiêu cung cấp cho thị trường bất động sản các giải pháp đột phá kết hợp ba lĩnh vực Công nghệ - Bất động sản – Tài chính. Website là một sản phẩm thuộc Hệ sinh thái Công nghệ Bất động sản Vercel, được thiết lập, quản lý, vận hành và sở hữu bởi Công ty Cổ phần Tập đoàn Vercel.</p>
                                <p>Xin vui lòng đọc kỹ các Điều khoản và Điều kiện dưới đây ("<b>ĐKĐK</b>") trước khi thực hiện bất kỳ thao tác nào, sử dụng bất kỳ tính năng nào hay tiến hành bất kỳ giao dịch nào đối với và liên quan đến Website.</p>
                                <p>Bằng việc truy cập vào Website, Quý khách thừa nhận đã đọc, hiểu và đồng ý rằng: (i) đã chấp thuận toàn bộ nội dung của ĐKĐK này và toàn bộ các quy định, chính sách được dẫn chiếu trong ĐKĐK này và (ii) theo đây đồng ý cho phép chúng tôi thu thập, sử dụng, tiết lộ và/hoặc xử lý thông tin liên quan đến Quý khách theo quy định tại ĐKĐK này.</p>
                                <p>Chúng tôi có thể sửa đổi, bổ sung và/hoặc thay thế bất kỳ và/hoặc toàn bộ các ĐKĐK này (“<b>Thay Đổi</b>”) vào bất cứ thời điểm nào mà không cần thông báo trước tới Quý khách. Sau khi các Thay Đổi này được đăng tải, việc Quý khách tiếp tục truy cập vào Website sẽ được coi như là Quý khách thừa nhận và đồng ý hoàn toàn với những Thay Đổi đó. Nếu Quý khách không đồng ý với các nội dung Thay Đổi, Quý khách có thể ngừng việc truy cập vào Website. Để đảm bảo Quý khách không bỏ sót bất kỳ Thay Đổi nào, vui lòng kiểm tra thường xuyên nội dung ĐKĐK này để nắm được những cập nhật mới nhất của chúng tôi.</p>
                                <p>ĐKĐK bao gồm các nội dung sau:</p>
                            </div>
                            <DKDKList/>
                        </div>)
                    else if (index == 4)
                        return (<div className="p-10 space-y-8"><h1 className="text-3xl  font-bold">{page.title}</h1>
                            <div className="text-md space-y-4">
                                <p>Khách hàng đăng tin trên website phải đọc, hiểu, tuân thủ Điều khoản & Điều kiện, và tuân theo Quy định đăng tin dưới đây:</p>
                                <ul className="space-y-4">
                                    <li>- Tin đăng bằng tiếng Việt, có dấu, chữ thường, chỉ viết hoa đầu câu và danh từ riêng, đúng chính tả, câu văn mạch lạc, rõ ràng, không chèn các ký tự đặc biệt, không dùng dấu gạch dưới ( _ ) để ngắt câu hay đặt ở đầu câu.</li>
                                    <li>-  Giữa các đoạn văn cách nhau không quá 1 hàng ký tự, không để khoảng trống, từ khóa bên dưới nội dung mô tả của tin đăng.</li>
                                    <li>- Tin đăng không chứa các từ ngữ dung tục, nhạy cảm không phù hợp thuần phong mỹ tục, không đăng thông tin hoặc đề cập đến các chính trị gia, người nổi tiếng.</li>
                                    <li>- Không đăng tin vi phạm pháp luật hiện hành.</li>
                                    <li>- Chỉ được phép đăng tin với mục đích đăng bán/cho thuê/sang nhượng bất động sản (BĐS). Không được đăng các tin chỉ với mục đích quảng cáo, tiếp thị đơn thuần (nghĩa là không cung cấp bất kỳ BĐS cụ thể nào, không thể hiện nhu cầu giao dịch BĐS).</li>
                                    <li>- Không đăng tin trùng dưới bất kỳ hình thức tin đăng nào, tin trùng sẽ bị hạ.</li>
                                    <li>- Tin đăng phải đúng phân loại, phân mục và địa chỉ BĐS đăng bán/cho thuê/sang nhượng. Mỗi tin đăng chỉ được đăng tin bán hoặc tin cho thuê hoặc sang nhượng, không đăng đồng thời cả bán và cho thuê, sang nhượng.</li>
                                    <li>- Tin đăng bán/cho thuê/ sang nhượng BĐS phải điền đầy đủ các thông tin tại các trường thông tin ở giao diện đăng tin theo nội dung tin đăng.</li>
                                    <li>- Nếu tin đăng thuộc dự án, cần ghi rõ tên dự án BĐS đăng bán/cho thuê/sang nhượng.</li>
                                    <li>- Quý khách tuyệt đối không sao chép nội dung quảng cáo từ các nhà quảng cáo khác. Trong trường hợp Meeyland.com nhận được khiếu nại của khách hàng và xác định được tin đăng của Quý khách là tin sao chép nội dung, tin đăng của Quý khách có thể bị xóa hoặc chỉnh sửa lại nội dung mà không cần thông báo trước.</li>
                                </ul>
                            </div>
                        </div>)
                    else if (index == 5)
                        return (<div className="p-10 space-y-8"><h1 className="text-3xl  font-bold">{page.title}</h1>
                            <div className="text-md space-x-4 flex">
                                <Apartment color="primary" className="bg-teal-50 rounded-full" />
                                <div className="">
                                    <p>Trụ sở chính</p>
                                    <h2><b>CÔNG TY CỔ PHẦN TẬP ĐOÀN MEEY LAND</b></h2>
                                    <p>Tầng 5 Tòa nhà 97-99 Láng Hạ, phường Láng Hạ, quận Đống Đa, TP. Hà Nội</p>
                                </div>
                            </div>
                            <OfficeDrop/>
                            <div className="text-md space-y-6 divide-y">
                                <div className="flex space-x-40 pt-10">
                                    <div className="space-y-8">
                                        <div className="flex space-x-4">
                                            <Mail color="primary" className="bg-teal-50 rounded-full" />
                                            <p>contact@meeyland.com</p>
                                        </div>
                                        <div className="flex space-x-4">
                                            <PhoneInTalk color="primary" className="bg-teal-50 rounded-full" />
                                            <p>Hotline: 0869 092 929</p>
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <div className="flex space-x-4">
                                            <HeadsetMic color="primary" className="bg-teal-50 rounded-full" />
                                            <p>CSKH: 0249 999 2999</p>
                                        </div>
                                        <div className="flex space-x-4">
                                            <Language color="primary" className="bg-teal-50 rounded-full" />
                                            <p>Website: Meeyland.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    else if(index == 6)
                    {
                        return(<div className="text-md">
                            <p className="p-10">Liên hệ hỗ trợ tại: <Link href="#"><a color="primary">help.batdongsan88.vercel.app</a></Link></p>
                        </div>)
                    }
            })}
        </div>
    )

}

export default ContentPanel