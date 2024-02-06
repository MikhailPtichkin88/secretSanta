import { Modal } from '@/shared/ui/Modal'
import { Suspense, useEffect } from 'react'
import { Loader, PageLoader } from '@/shared/ui/PageLoader'
import { SessionFormAsync } from './SessionForm/SessionForm.async'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCreateSessionId } from '../model/selectors/getCreateSessionId'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { createSessionActions } from '../model/slice/CreateSessionSlice'

interface CreateSessionModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateSessionModal = ({
  isOpen,
  onClose,
}: CreateSessionModalProps) => {
  const createdSessionId = useSelector(getCreateSessionId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (createdSessionId) {
      navigate(`/session/${createdSessionId}`)
      dispatch(createSessionActions.resetFields())
    }
  }, [createdSessionId])

  return (
    <Modal isOpen={isOpen} onClose={onClose} lazy>
      <Suspense fallback={<Loader transparent />}>
        <SessionFormAsync onClose={onClose} />
      </Suspense>
    </Modal>
  )
}
