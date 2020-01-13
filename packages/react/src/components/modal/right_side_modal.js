import PropTypes from 'prop-types'
import Modal from './index'

const RightSideModal = {}

RightSideModal.render = props => {
  const rightSideProps = {
    ...props,
    className: 't-modal-right-side'
  }
  Modal.render(rightSideProps)
}

RightSideModal.hide = () => {
  Modal.hide()
}

RightSideModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  disableMaskClose: PropTypes.bool,
  size: PropTypes.string, // lg md sm
  title: PropTypes.string,
  noContentPadding: PropTypes.bool
}

export default RightSideModal
