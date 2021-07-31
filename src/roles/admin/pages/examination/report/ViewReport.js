import { InfoModal } from "../../../../../commons/commonModal/CommonModal";

const ViewReport = ({ report, visible, setVisible }) => {
  return (
    <div className="view-report">
      <InfoModal visible={visible} onClose={() => setVisible(false)}>
        {report && (
          <>
            <h1>Báo cáo sức khỏe</h1>

            <p>{report.pet.name}</p>
          </>
        )}
      </InfoModal>
    </div>
  );
};

export default ViewReport;
