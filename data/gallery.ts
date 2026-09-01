/**
 * Gallery data — typed JSON per content.md §6 and design.md §6.
 */

export interface GalleryItem {
  id: string;
  title: string;
  category: "Community" | "Events" | "Creative" | "Memories";
  caption?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "The First Meetup",
    category: "Community",
    caption: "Where strangers shared their first conversation.",
    aspectRatio: "landscape",
  },
  {
    id: "gallery-2",
    title: "Orientation Walk",
    category: "Events",
    caption: "Where new journeys began across the campus.",
    aspectRatio: "square",
  },
  {
    id: "gallery-3",
    title: "Creative Jam",
    category: "Creative",
    caption: "Ideas, sketches, and voices coming to life.",
    aspectRatio: "portrait",
  },
  {
    id: "gallery-4",
    title: "Open Mic Night",
    category: "Events",
    caption: "Stories that speak. Voices that stay.",
    aspectRatio: "landscape",
  },
  {
    id: "gallery-5",
    title: "Late Night Planning",
    category: "Community",
    caption: "Building ASTITVA from the ground up.",
    aspectRatio: "square",
  },
  {
    id: "gallery-6",
    title: "Campus Moments",
    category: "Memories",
    caption: "Finding your place in a sea of new faces.",
    aspectRatio: "portrait",
  },
  {
    id: "gallery-7",
    title: "Design Circle",
    category: "Creative",
    caption: "Visualizing the spirit of freshers.",
    aspectRatio: "square",
  },
  {
    id: "gallery-8",
    title: "The Beginning",
    category: "Memories",
    caption: "We Enter as Strangers, We Rise as One.",
    aspectRatio: "landscape",
  },
];
