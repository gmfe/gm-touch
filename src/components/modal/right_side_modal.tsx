import PropTypes from 'prop-types'
import Modal, { ModalProps } from './modal'

const RightSideModal: { render?(e: ModalProps): void } = {}

// @ts-ignore
RightSideModal.render = props => {
  const rightSideProps = {
    ...props,
    className: 't-modal-right-side'
  }
  // @ts-ignore
  Modal.render(rightSideProps)
}

// @ts-ignore
RightSideModal.hide = () => {
  // @ts-ignore
  Modal.hide()
}

// @ts-ignore
RightSideModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  disableMaskClose: PropTypes.bool,
  size: PropTypes.string, // lg md sm
  title: PropTypes.string,
  noContentPadding: PropTypes.bool
}

export default RightSideModal
