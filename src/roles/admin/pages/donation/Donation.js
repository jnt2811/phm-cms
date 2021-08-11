import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DonationTable from "./DonationTable";
import {
  doGetAllDonations,
  doSearchDonation,
  resetDonation,
} from "../../../../ducks/slices/donationSlice";
import moment from "moment";
import { isEmptyData } from "../../../../utils";
import { useHistory } from "react-router-dom";
import pathNames from "../../../../router/pathNames";
import FilterDonation from "./FilterDonation";
import ExportCSV from "./ExportCSV";

const Donation = () => {
  const donationReducer = useSelector((state) => state.donation);
  const dispatch = useDispatch();

  const history = useHistory();

  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [filterVal, setFilterVal] = useState({});
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    dispatch(doGetAllDonations());
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { donationList = [], isOk } = donationReducer;

    if (isOk === true) {
      setDonations(
        donationList
          .slice(0)
          .reverse()
          .map((donation) => ({ ...donation, key: donation.id }))
      );
      setIsLoading(false);
      dispatch(resetDonation());
    } else if (isOk === false) {
      setDonations(donationList);
      setIsLoading(false);
      dispatch(resetDonation());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationReducer]);

  useEffect(() => {
    let count = 0;

    for (const prop in filterVal) {
      if (filterVal[prop] !== null) count++;
    }

    setFilterCount(count);
  }, [filterVal]);

  const onSearchDonation = () => {
    const data = { search: searchVal };
    dispatch(doSearchDonation(data));
    setIsLoading(true);
  };

  const handleDataSource = (donations) => {
    const { province, district, ward, from, to } = filterVal;

    let donationList = [...donations];

    // lọc theo ngày
    if (!isEmptyData(from) && isEmptyData(to)) {
      donationList = donationList.filter((donation) => {
        const timeCreateAt = moment(donation.createAt)._d.getTime();
        if (timeCreateAt >= from) return true;
        else return false;
      });
    } else if (isEmptyData(from) && !isEmptyData(to)) {
      donationList = donationList.filter((donation) => {
        const timeCreateAt = moment(donation.createAt)._d.getTime();
        if (timeCreateAt <= to) return true;
        else return false;
      });
    } else if (!isEmptyData(from) && !isEmptyData(to)) {
      donationList = donationList.filter((donation) => {
        const timeCreateAt = moment(donation.createAt)._d.getTime();
        if (timeCreateAt >= from && timeCreateAt <= to) return true;
        else return false;
      });
    }

    // lọc theo tỉnh thành
    if (!isEmptyData(donationList) && !isEmptyData(province)) {
      donationList = donationList.filter((donation) => {
        const address = JSON.parse(donation.donator.address);

        if (
          !isEmptyData(address) &&
          JSON.stringify(province) === JSON.stringify(address.province)
        )
          return true;

        return false;
      });
    }

    // lọc theo quận huyện
    if (!isEmptyData(donationList) && !isEmptyData(district)) {
      donationList = donationList.filter((donation) => {
        const address = JSON.parse(donation.donator.address);

        if (
          !isEmptyData(address) &&
          JSON.stringify(district) === JSON.stringify(address.district)
        )
          return true;

        return false;
      });
    }

    // lọc theo xã phường
    if (!isEmptyData(donationList) && !isEmptyData(ward)) {
      donationList = donationList.filter((donation) => {
        const address = JSON.parse(donation.donator.address);

        if (
          !isEmptyData(address) &&
          JSON.stringify(ward) === JSON.stringify(address.ward)
        )
          return true;

        return false;
      });
    }

    return donationList;
  };

  return (
    <div className="donation">
      <Row justify="space-between">
        <Col>
          <Row align="middle" gutter={{ lg: 20 }}>
            <Col>
              <h1>Danh sách quyên góp</h1>
            </Col>

            <Col>
              <Button
                onClick={() => history.push(pathNames.ADMIN_NEW_DONATION)}
              >
                Tạo mới
              </Button>
            </Col>
          </Row>
        </Col>

        <Col>
          <Button>
            <ExportCSV donations={handleDataSource(donations)} />
          </Button>
        </Col>
      </Row>

      <br />
      <br />

      <Row justify="space-between">
        <Col>
          <Row gutter={{ sm: 10 }}>
            <Col>
              <Input
                placeholder="Nhập số điện thoại..."
                style={{ width: "300px" }}
                disabled={isLoading}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyUp={(e) => e.keyCode === 13 && onSearchDonation()}
              />
            </Col>

            <Col>
              <Button disabled={isLoading} onClick={onSearchDonation}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Col>

        <Col>
          <Button onClick={() => setVisibleFilter(true)} disabled={isLoading}>
            Bộ lọc ({filterCount})
          </Button>
        </Col>
      </Row>

      <br />

      <div className="table-container">
        <DonationTable
          dataSource={handleDataSource(donations)}
          loading={isLoading}
        />
      </div>

      <FilterDonation
        filter={filterVal}
        setFilter={setFilterVal}
        visible={visibleFilter}
        setVisible={setVisibleFilter}
      />
    </div>
  );
};

export default Donation;
