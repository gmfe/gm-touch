import PropTypes from 'prop-types'
import Modal, { ModalProps } from './modal'

const CleanModal: { render?(e: ModalProps): void } = {}

// @ts-ignore
CleanModal.render = props => {
  const cleanProps = {
    ...props,
    className: 't-modal-clean'
  }
  // @ts-ignore
  Modal.render(cleanProps)
}

// @ts-ignore
CleanModal.hide = () => {
  // @ts-ignore
  Modal.hide()
}

// @ts-ignore
CleanModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  disableMaskClose: PropTypes.bool,
  size: PropTypes.string, // lg md sm
  title: PropTypes.string,
  noContentPadding: PropTypes.bool
}

export default CleanModal
