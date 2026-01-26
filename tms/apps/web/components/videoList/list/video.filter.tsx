"use client"
import { ITagDto, ListQueryConfig } from "@/common";
import { ISelectConvertProps, useFetchList } from "@/hooks";
import useLang from "@/lang";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";

export default function VideoListFilter() {
    const { user } = useLang();
    const router = useRouter();
    const searchParams = useSearchParams();
    const status = searchParams.get("statusFilter") ?? "";


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

    const tagList = useFetchList<ITagDto[]>({
        query: ListQueryConfig.TAG_LIST,
        keyName: { label: "name", value: "name" },
        statusFilter: true // Only show active tags in the select box
    })

    const [selectedOptions, setSelectedOptions] = useState<readonly ISelectConvertProps[]>([]);
    const onTagsFilterChange = (selectedOptions: MultiValue<ISelectConvertProps>) => {
        setSelectedOptions(selectedOptions);
        updateQuery("tagsFilter", selectedOptions.map((option) => option.value).join(","));
    };

    const { register, handleSubmit, reset } = useForm({ mode: "all", defaultValues: { nameFilter: "" } })

    const onSubmitSearch: SubmitHandler<{ nameFilter: string }> = (value) => {
        updateQuery("nameFilter", value.nameFilter);
    }


    const onClearFilters = () => {
        reset();
        setSelectedOptions([]);
        router.push("?");
    }


    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="px-6 py-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">ステータス</label>
                        <select value={status} onChange={(e) => onStatusFilterChange(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                            <option value="">すべてのステータス</option>
                            <option value="true">アクティブ</option>
                            <option value="false">非アクティブ</option>
                            {/*      <option value="published">公開済み</option>
                            <option value="draft">下書き</option>
                            <option value="archived">アーカイブ済み</option> */}
                        </select>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">タグ</label>
                        <Select
                            instanceId="videoTags-filter"
                            isMulti
                            options={tagList}
                            onChange={onTagsFilterChange}
                            value={selectedOptions}
                            placeholder="タグ"
                            classNames={{
                                control: ({ isFocused }) =>
                                    [
                                        "w-full px-1 py-0.5 rounded-lg transition-colors",
                                        "border bg-white shadow-sm",
                                        isFocused
                                            ? "border-primary-500 ring-2 ring-primary-500"
                                            : "border-gray-300",
                                    ].join(" "),
                            }}
                            styles={{
                                control: base => ({
                                    ...base,
                                    borderRadius: "0.5rem",
                                }),
                            }}
                        />

                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <form className="flex gap-2 flex-wrap w-full" onSubmit={handleSubmit(onSubmitSearch)}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">検索</label>
                                <div className="flex gap-2">
                                    <input type="text" {...register("nameFilter")} id="searchInput" placeholder="タイトルまたは説明で検索..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 opacity-0">.</label>
                                <div className="flex gap-2">
                                    <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                                        {user.filter.search}
                                    </button>
                                    <button type="button" onClick={() => onClearFilters()} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                                        {user.filter.clearFilters}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
