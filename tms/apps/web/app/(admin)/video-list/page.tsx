"use client"
import dynamic from "next/dynamic";
const VideoController = dynamic(() => import("@/components/videoList/video.controller"));

export default function VideoListPage() {
    return (
        <VideoController />
    )
}
