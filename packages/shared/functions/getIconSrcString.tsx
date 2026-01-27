const getIconSrcString = (fileName: string) => {
    if (
        fileName?.endsWith(".png") ||
        fileName?.endsWith(".jpg") ||
        fileName?.endsWith(".jpeg") ||
        fileName?.endsWith(".jfif")
      ) {
        return "/media/pmo/blankImg.png";
      } else if (fileName?.endsWith(".pdf")) {
        return "/media/pmo/pdfIcon.png";
      } else if (fileName?.endsWith(".doc") || fileName?.endsWith(".docx")) {
        return "/media/pmo/wordIcon.jpg";
      } else if (fileName?.endsWith(".xls") || fileName?.endsWith(".xlsx")) {
        return "/media/pmo/excelIcon.jpg";
      } else if (fileName?.endsWith(".txt")) {
        return "/media/pmo/textIcon.png";
      } else if (
        fileName?.endsWith(".mp4") ||
        fileName?.endsWith(".webm") ||
        fileName?.endsWith(".avi") ||
        fileName?.endsWith(".mkv") ||
        fileName?.endsWith(".flv") ||
        fileName?.endsWith(".ts")
      ) {
        return "/media/pmo/video.png";
      } else if (
        fileName?.endsWith(".ppt") ||
        fileName?.endsWith(".pptx") ||
        fileName?.endsWith(".pptm") ||
        fileName?.endsWith(".pps") ||
        fileName?.endsWith(".ppsx") ||
        fileName?.endsWith(".ppsm")
      ) {
        return "/media/pmo/powerPointIcon.png";
      }
};

export default getIconSrcString;