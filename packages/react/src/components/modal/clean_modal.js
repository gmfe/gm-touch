import PropTypes from 'prop-types'
import Modal from './index'

const CleanModal = {}

CleanModal.render = props => {
  const cleanProps = {
    ...props,
    className: 't-modal-clean'
  }
  Modal.render(cleanProps)
}

CleanModal.hide = () => {
  Modal.hide()
}

CleanModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  disableMaskClose: PropTypes.bool,
  size: PropTypes.string, // lg md sm
  title: PropTypes.string,
  noContentPadding: PropTypes.bool
}

export default CleanModal
