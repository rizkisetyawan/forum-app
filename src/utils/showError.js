import { showNotification } from '@mantine/notifications';

const showError = (message) => {
  showNotification({
    color: 'red',
    message,
  });
};

export default showError;
