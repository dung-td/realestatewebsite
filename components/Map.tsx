import { useEffect, useRef, useState } from "react"
import mapboxgl, { Marker } from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHVuZ3RkIiwiYSI6ImNsMzV2bG9iYzA2a3YzZXFuNGhmY2RvZHAifQ.fJNy74v0KDU3PND9wkMsWg"

const Map = ({ type, lng, lat, callback }: any) => {
  const [markerDraggable, setMarkerDraggable] = useState(
    type == "view" ? false : true
  )

  let markerLng = useRef(lng)
  let markerLat = useRef(lat)

  const [zoom, setZoom] = useState(type == "view" ? 17 : 5)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "mapConatainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    })

    const marker = new mapboxgl.Marker({ draggable: markerDraggable })
      .setLngLat([lng, lat])
      .addTo(map)

    marker.on("dragend", () => {
      markerLng.current = marker.getLngLat().lng
      markerLat.current = marker.getLngLat().lat
      callback(markerLng.current, markerLat.current)
    })

    map.addControl(new mapboxgl.NavigationControl(), "top-right")

    // map.on("move", () => {
    //   setLng(Number(map.getCenter().lng.toFixed(4)))
    //   setLat(Number(map.getCenter().lat.toFixed(4)))
    //   setZoom(Number(map.getZoom().toFixed(2)))
    // })

    // Clean up on unmount
    return () => map.remove()
  })

  return (
    <div>
      <div className="h-[32rem] w-full" id="mapConatainer" />
    </div>
  )
}

export default Map
