import { useContext, memo, FC } from "react";
import AlertContext from "./AlertContext";
import Alert from "./Alert";

export const Alerts: FC = () => {
  const { alerts, removeAlert }: any = useContext(AlertContext);

  return (
    <div className="fixed right-0 left-0 w-100 z-10 space-y-2">
      {alerts.map(a => (
        <Alert key={a.id} alert={a} removeAlert={removeAlert} />
      ))}
    </div>
  );
};

export default memo(Alerts);
