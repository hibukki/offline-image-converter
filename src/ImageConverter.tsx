import React, { useState, ChangeEvent } from "react";
import * as path from "path";

const ImageConverter: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>("image/jpeg");
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }

    setSelectedFileName(event.target.files?.[0].name || "");
  };

  const handleFormatChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormat(event.target.value);
  };

  const handleDownload = () => {
    const fileNameWithoutExtension = path.parse(selectedFileName).name;

    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const downloadLinkHref = canvas.toDataURL(selectedFormat);
          downloadImage(
            downloadLinkHref,
            `${fileNameWithoutExtension}.${selectedFormat.split("/")[1]}`
          );
        }
      };
    }
  };

  const downloadImage = (href: string, filename: string) => {
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.click();
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      {imageSrc && (
        <div>
          <select value={selectedFormat} onChange={handleFormatChange}>
            <option value="image/jpeg">JPEG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
            <option value="image/bmp">BMP</option>
            <option value="image/ico">ICO</option>
            <option value="image/svg+xml">SVG</option>
          </select>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
