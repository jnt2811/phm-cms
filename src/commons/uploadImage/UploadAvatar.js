import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Badge, notification, Upload } from "antd";
import { storage } from "../../firebase";
import { isEmptyData } from "../../utils";

const UploadAvatar = ({
  avatarUrl,
  setAvatarUrl,
  setIsUploading,
  isUploading,
}) => {
  const onDeleteAvatar = (e) => {
    if (e) e.stopPropagation();

    if (!isEmptyData(avatarUrl)) {
      const tempUrl = avatarUrl;
      setAvatarUrl();

      storage
        .refFromURL(tempUrl)
        .delete()
        .then(() => console.log("Delete image success"))
        .catch((error) => console.log(error));
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.indexOf("image/") === 0;
    if (!isImage) {
      notification.error({ message: "Chỉ được upload ảnh" });
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      notification.error({ message: "Kích thước ảnh phải nhỏ hơn 5MB" });
    }
    return isImage && isLt5M;
  };

  const customUpload = async ({ onError, onSuccess, file }) => {
    try {
      setAvatarUrl();

      setIsUploading(true);
      const storageRef = storage.ref();
      const imgFile = storageRef.child(`image/avatar/${file.name}`);
      const image = await imgFile.put(file);

      await imgFile.getDownloadURL().then((url) => {
        setAvatarUrl(url);
        setIsUploading(false);
      });

      onSuccess(null, image);
      console.log(`${file.name} is uploaded!`);
    } catch (error) {
      setIsUploading(false);
      onError(null, error);
      console.log(error);
    }
  };

  return (
    <Upload
      listType="picture-card"
      showUploadList={false}
      maxCount={1}
      beforeUpload={beforeUpload}
      customRequest={customUpload}
    >
      {!isEmptyData(avatarUrl) ? (
        <div className="avatar-upload">
          <Badge
            count={
              <DeleteOutlined
                className="delete-upload-icon"
                onClick={(e) => onDeleteAvatar(e)}
              />
            }
          >
            <img src={avatarUrl} alt="" />

            <div className="hover-layer">
              <PlusOutlined className="hover-icon" />
            </div>
          </Badge>
        </div>
      ) : (
        <>{isUploading ? <LoadingOutlined /> : <PlusOutlined />}</>
      )}
    </Upload>
  );
};

export default UploadAvatar;
