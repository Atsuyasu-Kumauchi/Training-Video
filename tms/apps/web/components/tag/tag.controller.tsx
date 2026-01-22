"use client"
import { Suspense } from "react";
import TagListComponent from "./list/tag.list.component";
import TagListFilter from "./list/tag.list.filter";
import TagListHeader from "./list/tag.list.header";

export default function TagController() {
  return (
    <div className="px-6 py-8">
      <TagListHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <TagListFilter />
      </Suspense>
      <div className="bg-white rounded-lg  border border-gray-200 overflow-hidden">
        <TagListComponent />
      </div>
    </div>
  );
}
