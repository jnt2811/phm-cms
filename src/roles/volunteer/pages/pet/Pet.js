import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewPet from "./NewPet";
import PetTable from "./PetTable";
import { doGetAllPets, resetPet } from "../../../../ducks/slices/petSlice";
import EditPet from "./EditPet";
import { useHistory } from "react-router-dom";
import pathNames from "../../../../router/pathNames";

const Pet = () => {
  const petReducer = useSelector((state) => state.pet);
  const dispatch = useDispatch();

  const history = useHistory();

  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filterVal, setFilterVal] = useState(null);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState();

  useEffect(() => {
    dispatch(doGetAllPets());
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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

  const onSearchPet = () => {
    console.log(searchVal);
  };

  const handleDataSource = () => {
    if (filterVal === "Chó" || filterVal === "Mèo") {
      return pets.filter((pet) => {
        if (pet.type === filterVal) return true;
        else return false;
      });
    } else return pets;
  };

  const onEditPet = (pet) => {
    setSelectedPet(pet);
    setVisibleEditModal(true);
  };

  const onViewPet = (pet) => {
    history.push(pathNames.VOLUNTEER_PET_nId + pet.id);
  };

  return (
    <div className="pet">
      <Row align="middle" gutter={{ lg: 20 }}>
        <Col>
          <h1>Danh sách động vật</h1>
        </Col>

        <Col>
          <Button onClick={() => setVisibleNewModal(true)}>Tạo mới</Button>
        </Col>
      </Row>

      <br />
      <br />

      <Row justify="space-between">
        <Col>
          <Row gutter={{ sm: 10 }}>
            <Col>
              <Input
                placeholder="Nhập tên động vật..."
                style={{ width: "350px" }}
                disabled={isLoading}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyUp={(e) => e.keyCode === 13 && onSearchPet()}
              />
            </Col>

            <Col>
              <Button disabled={isLoading} onClick={onSearchPet}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Col>

        <Col>
          <Select
            className="select"
            style={{ width: "200px" }}
            defaultValue={filterVal}
            disabled={isLoading}
            onChange={(val) => setFilterVal(val)}
          >
            <Select.Option value={null}>Tất cả</Select.Option>
            <Select.Option value="Chó">Chó</Select.Option>
            <Select.Option value="Mèo">Mèo</Select.Option>
          </Select>
        </Col>
      </Row>

      <br />

      <div className="table-container">
        <PetTable
          dataSource={handleDataSource(pets)}
          loading={isLoading}
          onEditPet={onEditPet}
          onViewPet={onViewPet}
        />
      </div>

      <NewPet visible={visibleNewModal} setVisible={setVisibleNewModal} />

      <EditPet
        pet={selectedPet}
        visible={visibleEditModal}
        setVisible={setVisibleEditModal}
      />
    </div>
  );
};

export default Pet;
