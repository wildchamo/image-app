"use client";
import React, { useState } from "react";
import { ChangeEvent } from "react";
import { ImageList } from "@/components/ImageList";

interface ImageAnalysisItem {
  label: string;
  score: number;
}

interface UserImage {
  filename: string;
  url: string;
  analysis?: ImageAnalysisItem[];
}

interface ImageUploadResult {
  id: string;
  url: string;
  analysis: ImageAnalysisItem[];
}

export default function Home() {
  const [uploadedImages, setUploadedImages] = useState<UserImage[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const local_files = event.target.files;
    let localUploadedImages: Array<UserImage> = [];

    if (local_files == undefined || local_files.length === 0) {
      return;
    }

    let formData = new FormData();

    for (let x = 0; x < local_files.length; x++) {
      formData.append("files", local_files[x]);
      localUploadedImages.push({
        url: URL.createObjectURL(local_files[x]),
        filename: local_files[x].name,
      });
    }

    fetch("/api/files", { body: formData, method: "post" })
      .then((response) => response.json<ImageUploadResult[]>())
      .then((response) => {
        console.log(response);
        for (let x = 0; x < response.length; x++) {
          let image = localUploadedImages.find(
            (i) => i.filename === response[x].url
          );

          if (image) {
            image.analysis = response[x].analysis;
          }
        }
      })
      .then(() => {
        setUploadedImages(localUploadedImages);
      });
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <h3 className="mb-4 pb-2 fw-normal" style={{ textAlign: "center" }}>
              AI Image Analyzer
            </h3>

            {uploadedImages.length === 0 && (
              <>
                <p>
                  Select a number of images and upload them to have them
                  analyzed.
                </p>

                <div className="input-group rounded mb-3">
                  <input
                    className="form-control rounded"
                    aria-label="Images"
                    type="file"
                    multiple
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {uploadedImages.length > 0 && (
              <>
                <p style={{ textAlign: "center" }}>
                  Files uploaded successfully.
                </p>

                <ImageList images={uploadedImages} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
