import React from "react"
import Skeleton from "@mui/material/Skeleton"

export default function ItemSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
      <div>
        <Skeleton variant="rectangular" height={150} />
        <Skeleton />
        <Skeleton width="60%" />
      </div>
      <div>
        <Skeleton variant="rectangular" height={150} />
        <Skeleton />
        <Skeleton width="60%" />
      </div>
      <div>
        <Skeleton variant="rectangular" height={150} />
        <Skeleton />
        <Skeleton width="60%" />
      </div>
    </div>
  )
}
