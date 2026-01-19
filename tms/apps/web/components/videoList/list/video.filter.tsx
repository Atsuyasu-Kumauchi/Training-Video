"use client"
import { ITagDto, ListQueryConfig } from "@/common";
import { ISelectConvertProps, useFetchList } from "@/hooks";
import useLang from "@/lang";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VideoListFilter() {
    const { user } = useLang();
    const router = useRouter();
    const searchParams = useSearchParams();

    const status = searchParams.get("statusFilter") ?? "";
    const tags = searchParams.get("tagsFilter") ?? "";
    const search = searchParams.get("nameFilter") ?? "";

    const [searchText, setSearchText] = useState(search);

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`?${params.toString()}`);
    };

    const onStatusFilterChange = (value: string) => {
        updateQuery("statusFilter", value);
    }

    const onTagsFilterChange = (value: string) => {
        updateQuery("tagsFilter", value);
    }

    const onSearchFilterChange = () => {
        updateQuery("nameFilter", searchText);
    }

    const onClearFilterChange = () => {
        setSearchText("");   // input clear
        router.push("?");    // all query param delete
    }

    const tagList = useFetchList<ITagDto[]>({
        query: ListQueryConfig.TAG_LIST,
        keyName: { label: "name", value: "tagId" }
    })


    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ステータス</label>
                        <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                            <option value="">すべてのステータス</option>
                            <option value="published">公開済み</option>
                            <option value="draft">下書き</option>
                            <option value="archived">アーカイブ済み</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
                        <select value={tags} onChange={(e) => onTagsFilterChange(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                            <option value="">すべてのカテゴリ</option>
                            {tagList.map((tag: ISelectConvertProps, index: number) => (
                                <option key={index} value={tag.value}>{tag.label}</option>
                            ))}
                            {/* <option value="training">トレーニング</option>
                            <option value="tutorial">チュートリアル</option>
                            <option value="presentation">プレゼンテーション</option>
                            <option value="demo">デモ</option> */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">検索</label>
                        <div className="flex gap-2">
                            <input type="text" id="searchInput" placeholder="タイトルまたは説明で検索..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 opacity-0">.</label>
                        <button id="searchButton" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                            検索
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
