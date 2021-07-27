import { useEffect } from "react";
import { useState } from "react";
import ExaminationHeader from "../header/ExaminationHeader";
import HistoryTable from "./HistoryTable";
import { historyList } from "../../../../../constances/data";
import { InfoModal } from "../../../../../commons/commonModal/CommonModal";

const History = () => {
  const onInfoHistory = (historyData) => {
    setSelectedHistory(historyData);
    setVisibleModal(true);
  };

  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState();
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    setHistory(historyList);
  }, []);

  return (
    <div className="history">
      <ExaminationHeader />

      <br />
      <br />

      <HistoryTable dataSource={history} onInfoHistory={onInfoHistory} />

      <InfoModal
        visible={visibleModal}
        onClose={() => {
          setVisibleModal(false);
          setSelectedHistory();
        }}
      >
        {selectedHistory && selectedHistory.pet.name}
      </InfoModal>
    </div>
  );
};

export default History;
