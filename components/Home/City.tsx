import Link from "next/link"
const City = () => {
  const smallPopularCity = [
    { title: "Hồ Chí Minh", count: 1234, slug: "ho-chi-minh" },
    { title: "Hồ Chí Minh", count: 1234, slug: "ha-noi" },
    { title: "Hồ Chí Minh", count: 1234, slug: "binh-duong" },
    { title: "Hồ Chí Minh", count: 1234, slug: "da-nang" },
  ]

  return (
    <div>
      <div>
        <h3 className="section-title font-bold text-sm sm:text-base md:text-lg lg:text-xl">
          BẤT ĐỘNG SẢN Ở THÀNH PHỐ LỚN
        </h3>
        <div className="seperate-line border-b-2 border-indigo-500 w-1/4 mt-1 mb-4"></div>
      </div>
      <div className="grid px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link passHref href="/ho-chi-minh">
          <div className="city-container relative xl:row-span-2 xl:col-span-2 aspect-w-16 aspect-h-9">
            <div className="absolute todiv-0 left-0 p-2 city-title">
              <p className="text-base font-semibold hover:underline uppercase">
                TP. Hồ Chí Minh
              </p>
              <p className="text-sm font-semibold hover:underline">
                182 tin đăng
              </p>
            </div>
            <img
              className="w-full object-cover rounded-lg"
              src="https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-2.jpg"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
          </div>
        </Link>
        {smallPopularCity.map((city) => {
          return (
            <Link key={city.slug} passHref href="/ho-chi-minh">
              <div className="city-container relative aspect-w-16 aspect-h-9">
                <div className="absolute todiv-0 left-0 p-2 city-title">
                  <p className="text-base font-semibold hover:underline uppercase">
                    {city.title}
                  </p>
                  <p className="text-sm font-semibold hover:underline">
                    {city.count} tin đăng
                  </p>
                </div>
                <img
                  className="w-full object-cover rounded-lg"
                  src="https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-2.jpg"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid px-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 gap-4 mt-4">
        {[
          ["Hải phòng", "/dashboard"],
          ["Hải phòng", "/team"],
          ["Hải phòng", "/projects"],
          ["Hải phòng", "/reports"],
          ["Hải phòng", "/reports1"],
          ["Hải phòng", "/reports2"],
          ["Hải phòng", "/reports3"],
          ["Hải phòng", "/reports4"],
          ["Hải phòng", "/reports5"],
          ["Hải phòng", "/reports6"],
        ].map(([title, url]) => (
          <a key={url} href="" className="bg-slate-200 rounded-xl p-1">
            <p className="text-center">{title}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default City
