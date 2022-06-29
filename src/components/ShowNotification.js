import { notification } from "antd";

const ShowNotification = (type, details) => {
  notification[type]({
    message: details.message,
    description: details.description,
  });
};
export default ShowNotification;
