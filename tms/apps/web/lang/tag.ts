export const LangTag = {
  header: {
    title: "タグ", //tag
    add: "新規タグ追加", //add new tag
  },

  filter: {
    searchForTags: "タグを検索", //search for tags
    searchPlaceholder: "タグ名で検索...", //search by tag name
    status: "ステータス", //status
    all_status: "すべてのステータス", // all status
    active: "アクティブ", // active
    inactive: "非アクティブ", // inactive
  },

  list: {
    tagName: "タグ名", //tag name
    status: "ステータス", //status
    creationDate: "作成日", //creation date
    action: "アクション", //action
  },

  form: {
    title: "新規タグ追加", //add new tag
    tagName: "タグ名", //Tag Name
    tagNamePlaceholder: "タグ名を入力", //Enter the tag name
    status: "ステータス", //status
    statusPlaceholder: "ステータスを選択してください", //Select Status

    cancel: "キャンセル", //cancel
    createATag: "タグを作成", //create a tag
    updateTags: "タグを更新", //update tags
  },
};

export type ILangTag = typeof LangTag;
