import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewPet from "./NewPet";
import PetTable from "./PetTable";
import { doGetAllPets, resetPet } from "../../../../ducks/slices/petSlice";

const Pet = () => {
  const petReducer = useSelector((state) => state.pet);
  const dispatch = useDispatch();

  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleNewModal, setVisibleNewModal] = useState(false);

  useEffect(() => {
    dispatch(doGetAllPets());
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(petReducer);

    if (petReducer.isOk === true) {
      const { petList } = petReducer;
      setPets(petList.map((pet) => ({ ...pet, key: pet.id })));
      setIsLoading(false);
      dispatch(resetPet());
    } else if (petReducer.isOk === false) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petReducer]);

  const onNewPet = () => {
    setVisibleNewModal(true);
  };

  return (
    <div className="pet">
      <Row align="middle" gutter={{ lg: 20 }}>
        <Col>
          <h1>Danh sách chó mèo</h1>
        </Col>

        <Col>
          <Button onClick={onNewPet}>Tạo mới</Button>
        </Col>
      </Row>

      <div className="table-container">
        <PetTable dataSource={pets} loading={isLoading} />
      </div>

      <NewPet visible={visibleNewModal} setVisible={setVisibleNewModal} />
    </div>
  );
};

export default Pet;
