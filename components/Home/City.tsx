import { NextPage } from "next"

const City: NextPage = () => {
  return (
    <div>
      <div>
        <h3 className="section-title font-bold text-xl">
          BẤT ĐỘNG SẢN Ở THÀNH PHỐ LỚN
        </h3>
        <div className="seperate-line border-b-2 border-indigo-500 w-1/4 mt-1 mb-4"></div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <a
          href="#"
          className="city-container relative row-span-2 col-span-2 aspect-w-16 aspect-h-9"
        >
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
        </a>
        <a href="#" className="city-container relative aspect-w-16 aspect-h-9">
          <div className="absolute todiv-0 left-0 p-2 city-title">
            <p className="text-base font-semibold hover:underline uppercase">
              Hà Nội
            </p>
            <p className="text-sm font-semibold hover:underline">
              182 tin đăng
            </p>
          </div>
          <img
            className="w-full object-cover rounded-lg"
            src="https://file4.batdongsan.com.vn/images/newhome/cities1/HN-web-2.jpg"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
        </a>
        <a href="#" className="city-container relative aspect-w-16 aspect-h-9">
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
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2952&amp;q=80"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
        </a>
        <a href="#" className="city-container relative aspect-w-16 aspect-h-9">
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
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2952&amp;q=80"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
        </a>
        <a href="#" className="city-container relative aspect-w-16 aspect-h-9">
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
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2952&amp;q=80"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg"></div>
        </a>
      </div>

      <div className="grid grid-cols-7 gap-4 mt-4">
        <a href="" className="bg-slate-200 rounded-xl p-1">
          <p className="text-center">Hải Phòng</p>
        </a>
        <a href="" className="bg-slate-200 rounded-xl p-1">
          <p className="text-center">Hải Phòng</p>
        </a>
        <a href="" className="bg-slate-200 rounded-xl p-1">
          <p className="text-center">Hải Phòng</p>
        </a>
        <a href="" className="bg-slate-200 rounded-xl p-1">
          <p className="text-center">Hải Phòng</p>
        </a>
        <a href="" className="bg-slate-200 rounded-xl p-1">
          <p className="text-center">Hải Phòng</p>
        </a>
        <a href="" className="bg-slate-200 rounded-xl p-1">
          <p className="text-center">Hải Phòng</p>
        </a>
        <a href="" className="bg-slate-200 rounded-xl p-1">
          <p className="text-center">Hải Phòng</p>
        </a>
      </div>
    </div>
  )
}

export default City
