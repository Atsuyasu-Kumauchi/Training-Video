import { Button, MediaServer } from "@/tmsui";
import { TVideoListFormComponentSchema } from "../form/videoList.form.type";

export default function VideoDetailsView({ modalRef, editData }: TVideoListFormComponentSchema) {
    return (
        <>
            <div className="text-sm text-gray-500">
                <div className="space-y-6">
                    {/* Video Preview */}
                    <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-3">
                            Video Preview
                        </h4>
                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                            <video controls className="w-full h-full">
                                {editData?.videoUrl && (
                                    <source src={MediaServer(editData.videoUrl)} type="video/mp4" />
                                )}
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    {/* Video Details */}
                    <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-3">
                            Video details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">explanation</label>
                                    <p className="text-sm text-gray-900">{editData?.description}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">category</label>
                                    <p className="text-sm text-gray-900">Training</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">status</label>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {editData?.status ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload date</label>
                                    <p className="text-sm text-gray-900">2024-01-15</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Playback time</label>
                                    <p className="text-sm text-gray-900">15:30</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                <Button onClick={() => modalRef?.current?.modalClose()} variant="solid" color="neutral" >Close</Button>
            </div>
        </>

    )
}
