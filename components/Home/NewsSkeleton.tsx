import React from "react"
import Skeleton from "@mui/material/Skeleton"

export default function NewsSkeleton() {
  return (
    <>
      <div className="md:flex pt-4 md:space-x-6">
        <div className="w-12/12 md:w-7/12 space-y-2">
          <Skeleton variant="rectangular" height={220} />
          <Skeleton />
          <Skeleton width="60%" />
          <Skeleton variant="rectangular" height={80} />
        </div>

        <div className="w-12/12 md:w-5/12">
          <div className="cursor-pointer ml-auto"></div>
          <div className="divide-y space-y-4">
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
            <Skeleton variant="rectangular" height={50} />
          </div>
        </div>

        <div className="mt-4 w-full md:mt-0 md:w-4/12 ">
          <Skeleton variant="rectangular" height={390} />
        </div>
      </div>
    </>
  )
}
