import { showNotification } from '@mantine/notifications';

const showInfo = (message) => {
  showNotification({
    color: 'green',
    message,
  });
};

export default showInfo;
