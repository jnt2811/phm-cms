import { PlusOutlined } from "@ant-design/icons";
import { Modal, notification, Upload } from "antd";
import { useState } from "react";
import { storage } from "../../../../../../firebase";
import moment from "moment";

const UploadReportImages = ({ imageList = [], setImageList }) => {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handleCancel = () => {
    setPreviewVisible(false);
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
      const storageRef = storage.ref();
      const imgFile = storageRef.child(
        `images/reports/${moment().format("DD-MM-YYYY")}/${
          file.name
        }_${new Date().getTime()}`
      );
      const image = await imgFile.put(file);

      await imgFile.getDownloadURL().then((url) => {
        let tempArr = [...imageList];
        tempArr.push(url);
        setImageList(tempArr);
      });

      onSuccess(null, image);
      console.log(`${file.name} is uploaded!`);
    } catch (error) {
      onError(null, error);
      console.log(error);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  return (
    <div className="upload-report-imgs">
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        customRequest={customUpload}
      >
        {uploadButton}
      </Upload>

      <Modal
        visible={previewVisible}
        title={null}
        footer={null}
        onCancel={handleCancel}
        className="preview-report-img"
      >
        <img alt="" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default UploadReportImages;
