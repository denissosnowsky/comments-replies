import s from "./AlertComponent.module.sass";
import { useSelector } from "react-redux";
import { StateType } from "../../redux/store";

const AlertComponent: React.FC = () => {
  const error = useSelector((state: StateType) => state.alertReducer.error);
  const success = useSelector((state: StateType) => state.alertReducer.success);

  return (
    <>
      {error && <div className={s.alertError}>{error}</div>}
      {success && <div className={s.alertSuccess}>{success}</div>}
    </>
  );
};

export default AlertComponent;
