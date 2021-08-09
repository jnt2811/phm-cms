import { Avatar, Col, Row } from "antd";
import DogFb from "../../../../../../assets/dog_fallback.svg";
import CatFb from "../../../../../../assets/cat_fallback.svg";
import { isEmptyData } from "../../../../../../utils";

const PetInfo = ({ pet }) => {
  return (
    <Row className="pet-info" align="middle" gutter={{ sm: 25 }} wrap={false}>
      <Col style={{ textAlign: "center" }}>
        <Avatar
          size={100}
          icon={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <img
                src={
                  pet.type === "Chó" ? DogFb : pet.type === "Chó" ? CatFb : ""
                }
                alt=""
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                }}
              />
            </div>
          }
          src={!isEmptyData(pet.avatar) && pet.avatar}
        />
      </Col>

      <Col>
        <p>
          Tên: <strong>{pet.name}</strong>
        </p>

        <p>
          Loài: <strong>{pet.type}</strong>
        </p>

        <p>
          Giới tính: <strong>{pet.gender}</strong>
        </p>

        <p>
          Màu lông: <strong>{pet.color}</strong>
        </p>
      </Col>
    </Row>
  );
};

export default PetInfo;
