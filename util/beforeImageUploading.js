const beforeImageUploading = (file) => {
  const imageType = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  const isImage = imageType.includes(file.type);
  if (!isImage) {
    message.error('사진파일만 업로드할 수 있습니다.');
  }
  const isLt20M = file.size / 1024 / 1024 < 20;
  if (!isLt20M) {
    message.error('사진은 20MB를 초과할 수 없습니다.');
  }
  return isImage && isLt2M;
}

export default beforeImageUploading;