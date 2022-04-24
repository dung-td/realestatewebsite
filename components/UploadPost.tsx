import type { NextPage } from "next"
import { useState } from "react"

type Props = {
    post_type: string;
}

const UploadPost = (props: Props) => {
    const [purpose, setPurpose] = useState('sell');
    const [category, setCategory] = useState('');
    const [displayAddress, setDisplayAdress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [quarter, setQuarter] = useState('');
    const [street, setStreet] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [areaSqr, setAreaSqr] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceUnit, setPriceUnit] = useState('');
    const [document, setDocument] = useState('');
    const [isElseOptDoc, setIsElseOptDoc] = useState(false);
    const [floor, setFloor] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [width, setWidth] = useState(0);
    const [depth, setDepth] = useState(0);
    const [roadWidth, setRoadWidth] = useState(0);
    const [direction, setDirection] = useState('');
    const [furniture, setFuniture] = useState('');
    const [images, setImages] = useState(new Array());

    const [postTypeIndex, setPostTypeIndex] = useState(0);
    const [postDuration, setPostDuration] = useState(0);
    const [startDate, setStartDate] = useState('');

    const geoData = {
        city: [
            "Hà Nội",
            "Đà Nẵng",
            "Nha Trang",
            "Bình Dương",
            "Hồ Chí Minh",
            "Bến Tre",
        ],
        district: [
            "Hà Nội",
            "Đà Nẵng",
            "Nha Trang",
            "Bình Dương",
            "Hồ Chí Minh",
            "Bến Tre",
        ],
        quarter: [
            "Hà Nội",
            "Đà Nẵng",
            "Nha Trang",
            "Bình Dương",
            "Hồ Chí Minh",
            "Bến Tre",
        ],
        street: [
            "Hà Nội",
            "Đà Nẵng",
            "Nha Trang",
            "Bình Dương",
            "Hồ Chí Minh",
            "Bến Tre",
        ],
    };

    const purposes = [
        "BÁN", 
        "CHO THuê"
    ];

    const categories = [
        "Bán nhà riêng", 
        "Bán căn hộ chung cư",
        "Bán đất",
        "Bán kho xưởng"
    ];

    const priceUnits = [
        "VNĐ", 
        "Giá / m²",
        "Thỏa thuận",
    ];

    const documents = [
        "Sổ đỏ/ Sổ hồng", 
        "Hợp đồng mua bán",
        "Đang chờ sổ",
    ];

    const furnitures = [
        "Đầy đủ", 
        "Không có",
    ];

    const post_types = [
        {
            name: "VIP 1",
            price: 3000,
        },
        {
            name: "VIP 2",
            price: 4000,
        },
        {
            name: "VIP 3",
            price: 5000,
        },
        {
            name: "Tin thường",
            price: 2000,
        },
    ];

    const post_durations = [
        "7",
        "10",
        "14",
        "21",
    ];

    const preventCharInput = (e: any) => {
        var regex = new RegExp("[0-9\b]+");
        var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
        var charStr = String.fromCharCode(charCode);
        if (!regex.test(charStr)) {
            e.preventDefault();
        }
    }

    const handlePostTypeIndex = (e: any) => {
        let index = 0;
        post_types.forEach((element, currentIndex) => {
            if (element.name == e.target.value) {
                index = currentIndex;
            }
        });

        setPostTypeIndex(index)
    }

    const handleImageSelected = (e: any) => {
        let photoUriArr = new Array();
        let files = e.target.files;
        for (let i: number = 0; i < files.length; i++) {
            photoUriArr.push(URL.createObjectURL(files[i]))
        }
        console.log(e.target.files)
        setImages(photoUriArr);
    }

    const updateDisplayImages = (index: number) => {
        let photoUriArr = new Array();
        for (let i: number = 0; i < images.length; i++) {
            if (images[i] != images[index]) {
                photoUriArr.push(images[i])
            }
        }
        setImages(photoUriArr);
    }

    return (
        <>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8" style={{maxWidth: '1200'}}>
                    <h2 className="font-bold text-xl text-center mb-4">Đăng tin</h2>
                
                    <div className="flex flex-col lg:flex-row justify-center">
                        {/* Form thông tin bài đăng */}
                        <div className="post-info flex flex-col w-full lg:w-2/5">
                            {/* Thông tin cơ bản */}
                            <div className="flex flex-col py-4 px-4 border border-solid border-gray-300 rounded-lg">
                                <h1 className="font-bold text-lg">Thông tin cơ bản</h1>
                                <div className="flex flex-row">
                                    <p className="text-sm">Thông tin có dấu</p>
                                    <p className="text-sm text-rose-800">&nbsp;(*)&nbsp;</p>
                                    <p className="text-sm">là bắt buộc</p>
                                </div>
                                
                                <div className="mt-4">
                                    <fieldset className="flex flex-row">
                                        <legend className="sr-only">Post type</legend>
                                        <div className="flex items-center mb-4">
                                            <input
                                                id="type-option-1"
                                                type="radio" name="types" value="sell"
                                                className="w-5 h-5 border-gray-300"
                                                aria-labelledby="country-option-1"
                                                aria-describedby="country-option-1"
                                                onClick={() => setPurpose(purposes[0])}
                                            />
                                            <label htmlFor="type-option-1" className="block ml-2 text-sm text-black">
                                                {purposes[0].toUpperCase()}
                                            </label>
                                        </div>

                                        <div className="flex items-center mb-4 ml-12">
                                            <input
                                                id="type-option-2"
                                                type="radio" name="types" value="rent"
                                                className="w-5 h-5 border-gray-300"
                                                aria-labelledby="country-option-2"
                                                aria-describedby="country-option-2"
                                                onClick={() => setPurpose(purposes[1])}
                                            />
                                            <label htmlFor="type-option-2" className="block ml-2 text-sm text-black">
                                                {purposes[1].toUpperCase()}
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="mt-2 mb-2">
                                    <div className="flex flex-row">
                                        <label htmlFor="categories" className="block mb-2 text-sm font-medium text-black">Loại bất động sản</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <select
                                        id="categories"
                                        className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2"
                                        onChange={(e) => {
                                            setCategory(e.target.value)
                                        }}
                                    >
                                        {
                                            categories.map((item, index) => {
                                                return (
                                                    <option key={index}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="mt-2 mb-2">
                                    <div className="flex flex-row">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Địa chỉ</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <input type="email" id="address" className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" placeholder="Địa chỉ hiển thị" required onChange={(e) => setDisplayAdress(e.target.value)}/>
                                </div>

                                <div className="flex flex-row flex-wrap items-center justify-between">
                                    <div className="mt-2 mb-2 w-5/12">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Tỉnh, thành phố</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <select id="city" className="bg-white border border-gray-300 text-black text-sm rounded-lg  block w-full p-2 " required onChange={(e) => setCity(e.target.value)}>
                                            {
                                                geoData.city.map((item, index) => {
                                                    return (
                                                        <option key={index}>{item}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="mt-2 mb-2 w-5/12">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Quận, huyện</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <select id="district" className="bg-white border border-gray-300 text-black text-sm rounded-lg  block w-full p-2 " required onChange={(e) => setDistrict(e.target.value)}>
                                            {
                                                geoData.district.map((item, index) => {
                                                    return (
                                                        <option key={index}>{item}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="mt-2 mb-2 w-5/12">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Phường, xã</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <select id="quarter" className="bg-white border border-gray-300 text-black text-sm rounded-lg  block w-full p-2 " required onChange={(e) => setQuarter(e.target.value)}>
                                            {
                                                geoData.quarter.map((item, index) => {
                                                    return (
                                                        <option key={index}>{item}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="mt-2 mb-2 w-5/12">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Đường, phố</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <select id="street" className="bg-white border border-gray-300 text-black text-sm rounded-lg  block w-full p-2 " required onChange={(e) => setStreet(e.target.value)}>
                                            {
                                                geoData.street.map((item, index) => {
                                                    return (
                                                        <option key={index}>{item}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin bài viết */}
                            <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                                <h1 className="font-bold text-lg">Thông tin bài viết</h1>
                                <div className="flex flex-row">
                                    <p className="text-sm">Thông tin có dấu</p>
                                    <p className="text-sm text-rose-800">&nbsp;(*)&nbsp;</p>
                                    <p className="text-sm">là bắt buộc</p>
                                </div>

                                <div className="mt-4 mb-2">
                                    <div className="flex flex-row">
                                        <label className="block mb-2 text-sm font-medium text-black">Tiêu đề</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <textarea
                                        name="title"
                                        id="title"
                                        cols={1} rows={2}
                                        className="bg-white h-16 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 resize-none "
                                        placeholder="Tiêu đề hiển thị"
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                    <p className="text-xs mt-2">Tối thiểu 30 ký tự, tối đa 99 ký tự</p>
                                </div>

                                <div className="mt-4 mb-2">
                                    <div className="flex flex-row">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Mô tả</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <textarea
                                        name="title"
                                        id="title"
                                        cols={1} rows={2}
                                        className="bg-white h-44 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 resize-none "
                                        placeholder="Nhập mô tả về bất động sản của bạn"
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                    <p className="text-xs mt-2">Tối thiểu 30 ký tự, tối đa 4000 ký tự</p>
                                </div>
                            </div>

                            {/* Thông tin BĐS */}
                            <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                                <h1 className="font-bold text-lg">Thông tin bất động sản</h1>
                                <div className="flex flex-row">
                                    <p className="text-sm">Thông tin có dấu</p>
                                    <p className="text-sm text-rose-800">&nbsp;(*)&nbsp;</p>
                                    <p className="text-sm">là bắt buộc</p>
                                </div>

                                <div className="mt-4 mb-2 w-1/3">
                                    <div className="flex flex-row">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Diện tích (m²)</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <input
                                        type="email"
                                        id="areaSqr"
                                        className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 "
                                        placeholder="Diện tích (m²)"
                                        required
                                        value={isNaN(areaSqr) ? "" : areaSqr.toString()}
                                        onKeyDown={(e) => preventCharInput(e)}
                                        onChange={(e) => setAreaSqr(parseInt(e.target.value))}
                                    />
                                </div>

                                <div className="mt-4 mb-2 w-full flex flex-row justify-between">
                                    <div className="w-3/5">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Mức giá</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <input
                                            type="email"
                                            id="price"
                                            className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 "
                                            placeholder="Mức giá"
                                            required
                                            value={isNaN(price) ? "" : price.toString()}
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => setPrice(parseInt(e.target.value))}
                                        />
                                    </div>

                                    <div className="w-2/6">
                                        <div className="flex flex-row">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Đơn vị</label>
                                            <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                        </div>
                                        <select id="price_unit" className="bg-white border border-gray-300 text-black text-sm rounded-lg  block w-full p-2" onChange={(e) => setPriceUnit(e.target.value)}>
                                        {
                                            priceUnits.map((item, index) => {
                                                return (
                                                    <option key={index}>{item}</option>
                                                )
                                            })
                                        }
                                        </select>
                                    </div>
                                </div>

                                {/* Giấy tờ pháp lý */}
                                <div className="mt-4 mb-2 w-full flex flex-col">
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black">Giấy tờ pháp lý</label>

                                    <fieldset className="flex flex-row flex-wrap justify-between">
                                        <legend className="sr-only">Docs</legend>
                                        {
                                            documents.map((item, index) => {
                                                return (
                                                    <div className="flex items-center mb-4">
                                                        <input type="radio" name="docs" value={item} className="w-5 h-5 border-gray-300" aria-labelledby="docs-option-1" aria-describedby="docs-option-1" onChange={(e) => setDocument(e.target.value)}/>
                                                        <label htmlFor="doc-option-1" className="block ml-2 text-sm text-black">
                                                            {item}
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className="flex items-center mb-4">
                                            <input id="doc-option-4" type="radio" name="docs" value="Khác" className="w-5 h-5 border-gray-300" aria-labelledby="docs-option-4" aria-describedby="docs-option-4" onClick={() => setIsElseOptDoc(true)}/>
                                            <label htmlFor="doc-option-4" className="block ml-2 text-sm text-black">
                                            Khác
                                            </label>
                                            <input
                                                type="email"
                                                id="doc_else"
                                                className="bg-white ml-3 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 "
                                                placeholder="Nhập"
                                                onChange={(e) => {
                                                    isElseOptDoc ? setDocument(e.target.value) : null
                                                }}
                                            />
                                        </div>
                                    </fieldset>
                                </div>

                                <hr/>

                                {/* Số tầng, blah blah,... */}
                                <div className="mt-2 mb-1 w-full flex flex-row flex-wrap justify-between">
                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Số tầng</label>
                                        <input
                                            type="text" 
                                            id="floors"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 "
                                            placeholder="0"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setFloor(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Chiều rộng</label>
                                        <input
                                            type="email"
                                            id="width"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 "
                                            placeholder="(m)"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setWidth(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Số phòng ngủ</label>
                                        <input
                                            type="email"
                                            id="bedrooms"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 "
                                            placeholder="0"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setBedrooms(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Chiều sâu</label>
                                        <input
                                            type="email"
                                            id="depth"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 "
                                            placeholder="(m)"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setDepth(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Số phòng tắm</label>
                                        <input
                                            type="email"
                                            id="bathrooms"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 "
                                            placeholder="0"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setBathrooms(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Đường rộng</label>
                                        <input
                                            type="email"
                                            id="entrance-width"
                                            className="bg-white w-2/5 text-center border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 "
                                            placeholder="(m)"
                                            required
                                            onKeyDown={(e) => preventCharInput(e)}
                                            onChange={(e) => {setRoadWidth(parseInt(e.target.value))}}
                                        />
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Hướng nhà</label>
                                        <select id="direction" className="bg-white border border-gray-300 text-black text-sm rounded-lg  block w-3/5 p-2" onChange={(e) => setDirection(e.target.value)}>
                                            <option>Đông</option>
                                            <option>Tây</option>
                                            <option>Nam</option>
                                            <option>Bắc</option>
                                            <option>Tây Bắc</option>
                                            <option>Đông Bắc</option>
                                            <option>Đông Nam</option>
                                            <option>Tây Nam</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-row mt-2 mb-2 items-center justify-between" style={{width: '45%'}}>
                                        <label className="block text-sm font-medium text-black">Nội thất</label>
                                        <select id="furniture" className="bg-white border border-gray-300 text-black text-sm rounded-lg  block w-3/5 p-2" onChange={(e) => setFuniture(e.target.value)}>
                                            {
                                                furnitures.map((item, index) => {
                                                    return (
                                                        <option key={index}>{item}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Upload ảnh */}
                            <div className="flex flex-col mt-4 py-4 px-4 border border-solid border-gray-300 rounded-lg">
                                <h1 className="font-bold text-lg">Hình ảnh</h1>
                                
                                <div className="mt-2 w-1/3 self-center">
                                    <label htmlFor="file-upload" className="block px-9 lg:px-10 py-2 h-10 text-sm font-medium text-black bg-white rounded-lg border border-gray-300 cursor-pointer hover:border-blue-700 hover:border-2">Chọn ảnh</label>
                                    <input className="hidden" aria-describedby="file-upload" id="file-upload" type="file" accept="image/*" multiple onChange={(e) => handleImageSelected(e)}/>
                                </div>

                                {
                                    images.length > 0 ?
                                    <div className="mt-3 w-full flex flex-row flex-wrap items-center justify-between">
                                        {
                                            images.map((item, index) => {
                                                return (
                                                    <div className="w-[30%] mt-1 mb-1 relative hover:cursor-pointer">
                                                        <img src={item} className="rounded-lg hover:opacity-90" alt="Ảnh đã chọn"/>

                                                        <button
                                                            onClick={() => updateDisplayImages(index)}
                                                            className="group absolute top-1 right-1 bg-white w-6 h-6 rounded-full hover:bg-blue-500"
                                                        >
                                                            <span className="text-sm material-icons-outlined text-gray-600 group-hover:text-white">close</span>
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    : null
                                }
                            </div>
                        </div>

                        {/* Loại bài đăng */}
                        <div className="post-type w-full mt-8 lg:mt-0 lg:w-1/4 lg:ml-4 h-max flex flex-col py-4 px-4 border border-solid border-gray-300 rounded-lg">
                            <div className="mt-2 mb-2">
                                <div className="flex flex-row">
                                    <label htmlFor="post-type" className="block mb-2 text-sm font-medium text-black">Loại tin đăng</label>
                                    <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                </div>
                                <select id="post-type" className="bg-white border border-gray-300 text-black text-sm rounded-lg  block w-3/5 p-2" onChange={(e) => handlePostTypeIndex(e)}>
                                    {
                                        post_types.map((item, index) => {
                                            return (
                                                <option key={index}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="flex flex-row justify-between">
                                <div className="mt-2 mb-2 w-2/5">
                                    <div className="flex flex-row">
                                        <label htmlFor="post-type" className="block mb-2 text-sm font-medium text-black">Số ngày đăng</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <select id="post-type" className="bg-white border border-gray-300 text-black text-sm rounded-lg  block w-full p-2" onChange={(e) => setPostDuration(parseInt(e.target.value))}>
                                    {
                                        post_durations.map((item, index) => {
                                            return (
                                                <option key={index} value={item}>{item} ngày</option>
                                            )
                                        })
                                    }
                                    </select>
                                </div>

                                <div className="mt-2 mb-2" style={{width: '54%'}}>
                                    <div className="flex flex-row">
                                        <label htmlFor="post-type" className="block mb-2 text-sm font-medium text-black">Ngày bắt đầu</label>
                                        <span className="text-sm text-rose-800">&nbsp;(*)</span>
                                    </div>
                                    <input type="date" className="bg-white px-1 pl-2 h-10 border border-gray-300 text-black sm:text-sm rounded-lg " placeholder="Select date" style={{width: '98%'}}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="bg-blue-200 w-full h-40 py-1 px-3 mt-4 rounded-lg">
                                <div className="flex flex-row justify-between mt-2 mt-2 mb-3">
                                    <p className="text-black text-sm font-medium">Loại tin đăng</p>
                                    <p className="text-black text-sm">{post_types[postTypeIndex].name}</p>
                                </div>

                                <div className="flex flex-row justify-between mt-2 mb-3">
                                    <p className="text-black text-sm font-medium">Đơn giá / ngày</p>
                                    <p className="text-black text-sm">{post_types[postTypeIndex].price} VNĐ</p>
                                </div>

                                <div className="flex flex-row justify-between mt-2 mb-3">
                                    <p className="text-black text-sm font-medium">Số ngày đăng</p>
                                    <p className="text-black text-sm">{postDuration==0 ? post_durations[0] : postDuration}</p>
                                </div>

                                <hr className="border-1 border-solid border-black"/>

                                <div className="flex flex-row justify-between mt-2 mb-3">
                                    <p className="text-black text-lg font-medium">Bạn trả</p>
                                    <p className="text-black text-lg font-medium">
                                        {
                                            (postDuration==0 && postTypeIndex==0) ?
                                            post_types[0].price * parseInt(post_durations[0])
                                            : postDuration * post_types[postTypeIndex].price
                                        } VNĐ
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upload button */}
                    <div className="w-full text-center">
                        <button
                            className="bg-blue-700 w-full lg:w-1/12 mx-auto px-2 py-2 mt-6 rounded-lg text-center cursor-pointer hover:bg-blue-800"
                            onClick={() => console.log(postDuration)}
                        >
                            <p className="text-white text-center">Đăng tin {'>'}</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadPost