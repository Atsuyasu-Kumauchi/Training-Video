import TagFormComponent from "./form/tag.form.component";
import TagListComponent from "./list/tag.list.component";
import TagListFilter from "./list/tag.list.filter";
import TagListHeader from "./list/tag.list.header";

export default function TagComponent() {
  return (
    <div className="px-6 py-8">
      <TagListHeader />
      <TagListFilter />
      <div className="bg-white rounded-lg  border border-gray-200 overflow-hidden">
        <TagListComponent />
        <TagFormComponent />
      </div>
    </div>
  );
}
