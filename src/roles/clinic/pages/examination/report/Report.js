import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReportTable from "./ReportTable";
import ViewReport from "./ViewReport";
import {
  doGetAllReports,
  resetReport,
} from "../../../../../ducks/slices/reportSlice";

const Report = () => {
  const reportReducer = useSelector((state) => state.report);
  const dispatch = useDispatch();

  const onViewReport = (report) => {
    setSelectedReport(report);
    setVisibleModal(true);
  };

  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState();
  const [visibleModal, setVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(doGetAllReports());
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { isOk } = reportReducer;

    if (isOk === true) {
      const { reportList } = reportReducer;
      setReports(
        reportList.map((report) => ({
          ...report,
          key: report.id,
        }))
      );
      setIsLoading(false);
      dispatch(resetReport());
    } else if (isOk === false) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportReducer]);

  return (
    <div className="report">
      <h1>Lịch sử khám bệnh</h1>

      <br />
      <br />

      <div className="table-container">
        <ReportTable
          loading={isLoading}
          dataSource={reports}
          onViewReport={onViewReport}
        />
      </div>

      <ViewReport
        report={selectedReport}
        visible={visibleModal}
        setVisible={setVisibleModal}
      />
    </div>
  );
};

export default Report;
