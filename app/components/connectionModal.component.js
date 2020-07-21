import React, {useEffect} from 'react';
import {Modal, Text, View} from 'react-native';
import {styles} from '../styles/root.style';
import {useDispatch, useSelector} from 'react-redux';
import {setStatusModal} from '../redux/actions/online';

function ConnectionModal() {
  const isConnected = useSelector((state) => state.online.isConnected);
  const isShowModal = useSelector((state) => state.online.isShowModal);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => dispatch(setStatusModal(false)), 3000);
  }, [isShowModal]);

  return (
    <Modal animationType="fade" transparent={true} visible={isShowModal}>
      <View
        style={[
          styles.centerContainer,
          styles.notificationContainer,
          (isConnected && styles.backgroundSuccess) || styles.backgroundWarning,
        ]}>
        {isConnected ? (
          <Text style={styles.notificationText}>
            Internet connection restored.
          </Text>
        ) : (
          <Text style={styles.notificationText}>
            No internet connection. Please check the connection.
          </Text>
        )}
      </View>
    </Modal>
  );
}

export default ConnectionModal;
