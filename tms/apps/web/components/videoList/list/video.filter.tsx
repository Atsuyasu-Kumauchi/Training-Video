
export default function VideoListFilter() {
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
                        <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                            <option value="">すべてのカテゴリ</option>
                            <option value="training">トレーニング</option>
                            <option value="tutorial">チュートリアル</option>
                            <option value="presentation">プレゼンテーション</option>
                            <option value="demo">デモ</option>
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
