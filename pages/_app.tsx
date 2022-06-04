import "../public/css/global.css"

import type { AppProps } from "next/app"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"

function MyApp({ Component, pageProps }: AppProps | any) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Component {...pageProps}></Component>
    </LocalizationProvider>
  )
}

export default MyApp
