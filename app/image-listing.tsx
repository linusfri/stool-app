import { ImageListing } from "@/components/ui/list/item-listing";
import React from "react";

export default function Screen({ images }: { images: { id: string; uri: string }[] }) {
  return (
    <ImageListing items={images} columns={2} gap={8} imageClassName="w-2/4" />
  );
}
