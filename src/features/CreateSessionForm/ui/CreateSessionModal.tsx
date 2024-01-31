import { Modal } from '@/shared/ui/Modal'
import { Suspense } from 'react'
import { PageLoader } from '@/shared/ui/PageLoader'
import { SessionFormAsync } from './SessionForm/SessionForm.async'

interface CreateSessionModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateSessionForm = ({
  isOpen,
  onClose,
}: CreateSessionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} lazy>
      <Suspense fallback={<PageLoader />}>
        <SessionFormAsync onClose={onClose} />
      </Suspense>
    </Modal>
  )
}
