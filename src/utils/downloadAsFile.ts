export function downloadAsFile(
  content: string | number | object,
  fileName: string,
  contentType = "text",
) {
  const toJSON = JSON.stringify(content, null, 2);

  const file = new File([toJSON], fileName, {
    type: contentType,
  });

  const fileUrl = URL.createObjectURL(file);

  const downloadLinkEl = document.createElement("a");
  downloadLinkEl.href = fileUrl;
  downloadLinkEl.download = fileName;
  downloadLinkEl.className = "absolute invisible";

  document.body.appendChild(downloadLinkEl);

  downloadLinkEl.click();

  document.body.removeChild(downloadLinkEl);

  URL.revokeObjectURL(fileUrl);
}
