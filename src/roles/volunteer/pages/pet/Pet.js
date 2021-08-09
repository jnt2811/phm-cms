import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewPet from "./NewPet";
import PetTable from "./PetTable";
import {
  doGetAllPets,
  doSearchPet,
  resetPet,
} from "../../../../ducks/slices/petSlice";
import EditPet from "./EditPet";
import { useHistory } from "react-router-dom";
import pathNames from "../../../../router/pathNames";
import { failMessages } from "../../../../constances/messages";
import FilterPet from "./FilterPet";
import { isEmptyData } from "../../../../utils";
import moment from "moment";

const Pet = () => {
  const petReducer = useSelector((state) => state.pet);
  const dispatch = useDispatch();

  const history = useHistory();

  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState();
  const [visibleFilterModal, setVisibleFilterModal] = useState(false);
  const [filterVal, setFilterVal] = useState({
    type: null,
    rescuer: null,
    from: null,
    to: null,
    gender: null,
  });
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    dispatch(doGetAllPets());
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { isOk, message, petList = [] } = petReducer;

    if (isOk === true) {
      setPets(
        petList
          .slice(0)
          .reverse()
          .map((pet) => ({ ...pet, key: pet.id }))
      );
      setIsLoading(false);
      dispatch(resetPet());
    } else if (petReducer.isOk === false) {
      if (message === failMessages.SEARCH_PET) setPets(petList);
      setIsLoading(false);
      dispatch(resetPet());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petReducer]);

  useEffect(() => {
    let count = 0;

    for (const prop in filterVal) {
      if (filterVal[prop] !== null) count++;
    }

    setFilterCount(count);
  }, [filterVal]);

  const onSearchPet = () => {
    const data = { search: searchVal };
    dispatch(doSearchPet(data));
    setIsLoading(true);
  };

  const handleDataSource = () => {
    const { from, rescuer, to, type, gender } = filterVal;

    let petList = [...pets];

    if (type !== null) {
      petList = petList.filter((pet) => pet.type === type);
    }

    if (gender !== null) {
      petList = petList.filter((pet) => pet.gender === gender);
    }

    if (rescuer !== null) {
      if (rescuer.name === "admin") {
        petList = petList.filter((pet) => pet.volunteer === null);
      } else {
        petList = petList.filter(
          (pet) => pet.volunteer !== null && pet.volunteer.name === rescuer.name
        );
      }
    }

    if (!isEmptyData(from) && isEmptyData(to)) {
      return petList.filter((pet) => {
        const timeCreateAt = moment(pet.createAt)._d.getTime();
        if (timeCreateAt >= from) return true;
        else return false;
      });
    } else if (isEmptyData(from) && !isEmptyData(to)) {
      return petList.filter((pet) => {
        const timeCreateAt = moment(pet.createAt)._d.getTime();
        if (timeCreateAt <= to) return true;
        else return false;
      });
    } else if (!isEmptyData(from) && !isEmptyData(to)) {
      return petList.filter((pet) => {
        const timeCreateAt = moment(pet.createAt)._d.getTime();
        if (timeCreateAt >= from && timeCreateAt <= to) return true;
        else return false;
      });
    }

    return petList;
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
          <h1>Danh sách vật nuôi</h1>
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
                placeholder="Nhập tên vật nuôi..."
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
          <Button
            onClick={() => setVisibleFilterModal(true)}
            disabled={isLoading}
          >
            Bộ lọc ({filterCount})
          </Button>
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

      <FilterPet
        filter={filterVal}
        setFilter={setFilterVal}
        visible={visibleFilterModal}
        setVisible={setVisibleFilterModal}
      />
    </div>
  );
};

export default Pet;
