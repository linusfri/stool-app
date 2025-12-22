import { ImageListing } from "components/list/item-listing";
import React from "react";

export default function Screen({ images }: { images: { id: string; uri: string }[] }) {
  return (
    <ImageListing items={images} imageClassName="w-2/4" />
  );
}
