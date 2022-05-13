

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      {/* Info */}
      <div className="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
        {/* Company info */}
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">
            batdongsan88
          </h2>
          <h1 className="mb-6 text-sm font-semibold text-gray-400 uppercase">
            Công ty cổ phần Bất Động Sản 88
          </h1>
          <ul className="text-gray-300">
            <li className="mb-4 flex">
              <span className="material-icons mr-2">home</span>
              <p>Khu Phố 6, Phường Linh Trung, Thủ Đức, Hồ Chí Minh</p>
            </li>
            <li className="mb-4 flex">
              <span className="material-icons mr-2">mail</span>
              <p>cskh@batdongsan88.com</p>
            </li>
            <li className="mb-4 flex">
              <span className="material-icons mr-2">phone</span>
              <p>08 686 868</p>
            </li>
          </ul>
        </div>
        {/* Help */}
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">
            Trợ giúp
          </h2>
          <ul className="text-gray-300">
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Quy định đăng tin
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Liên hệ
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Báo giá
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Trợ giúp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">
            Trợ giúp
          </h2>
          <ul className="text-gray-300">
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Quy định đăng tin
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Liên hệ
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Báo giá
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Trợ giúp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">
            Liên kết
          </h2>
          <ul className="text-gray-300">
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Quy định đăng tin
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Liên hệ
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Báo giá
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:underline">
                Trợ giúp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-6 px-4 bg-gray-700 md:flex md:items-center md:justify-center">
        <span className="text-sm text-gray-300 sm:text-center">
          © 2022 <a href="https://flowbite.com">batdongsan88™</a>. All Rights
          Reserved{" "}
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
          <a
            rel="noreferrer"
            href="https://github.com/dung-td/realestatewebsite"
            target="_blank"
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
