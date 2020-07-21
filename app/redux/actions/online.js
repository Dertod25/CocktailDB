export const STATUS_CONNECTION = 'STATUS_CONNECTION';
export const STATUS_MODAL = 'STATUS_MODAL';

export function setStatusConnection(status) {
  return {
    type: STATUS_CONNECTION,
    status,
  };
}
export function setStatusModal(status) {
  return {
    type: STATUS_MODAL,
    status,
  };
}
