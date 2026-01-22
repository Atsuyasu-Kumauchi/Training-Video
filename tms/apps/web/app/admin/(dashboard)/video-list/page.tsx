import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const VideoController = dynamic(() => import("@/components/videoList/video.controller"));
export const metadata: Metadata = {
    title: "動画一覧 - 管理者ダッシュボード",
};
export default function VideoListPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VideoController />
        </Suspense>
    )
}
