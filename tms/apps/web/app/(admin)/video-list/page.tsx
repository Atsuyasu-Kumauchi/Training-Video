"use client"
import dynamic from "next/dynamic";
const VideoListComponent = dynamic(() => import("@/components/videoList/videoList.component"), {
    ssr: false,
});

export default function VideoPage() {
    return (
         <VideoListComponent />
    )
}
