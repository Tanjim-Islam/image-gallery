import React, { useState } from "react";
import ImageGrid from "./comps/ImageGrid";
import Modal from "./comps/Modal";
import UploadForm from "./comps/UploadForm";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { projectFirestore } from "./firebase/config"; // Ensure this path is correct
import useFirestore from "./hooks/useFirestore"; // Ensure this path is correct

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [direction, setDirection] = useState(0); // This should be at the top level
  const { docs } = useFirestore("images");

  const handleDeleteSelected = async () => {
    if (!selectedImages.length) return;

    const imagesCollection = collection(projectFirestore, "images");
    const promises = selectedImages.map((id) => {
      const imageDoc = doc(imagesCollection, id);
      return deleteDoc(imageDoc);
    });

    await Promise.all(promises);
    setSelectedImages([]); // Clear the selection after deleting.
  };

  // Find the index of the current image
  const currentImageIndex = selectedImg
    ? docs.findIndex((doc) => doc.url === selectedImg)
    : -1;

  // Function to go to the previous image
  const goToPrev = () => {
    if (docs.length > 0 && currentImageIndex >= 0) {
      const prevIndex = (currentImageIndex - 1 + docs.length) % docs.length;
      setSelectedImg(docs[prevIndex].url);
      setDirection(-1);
    }
  };

  // Function to go to the next image
  const goToNext = () => {
    if (docs.length > 0 && currentImageIndex >= 0) {
      const nextIndex = (currentImageIndex + 1) % docs.length;
      setSelectedImg(docs[nextIndex].url);
      setDirection(1);
    }
  };

  return (
    <div className="gallery-container">
      <UploadForm handleDeleteSelected={handleDeleteSelected} />
      <ImageGrid
        setSelectedImg={setSelectedImg}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />

      {selectedImg && (
        <Modal
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          goToPrev={goToPrev}
          goToNext={goToNext}
          direction={direction}
        />
      )}
    </div>
  );
};

export default Gallery;
