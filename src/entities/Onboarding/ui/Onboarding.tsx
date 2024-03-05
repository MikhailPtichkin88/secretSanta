import 'intro.js/introjs.css'
import './customStyles.css'

import { Step, Steps } from 'intro.js-react'
import { Button } from '../../../shared/ui/Button'
import cls from './Onboarding.module.scss'
import StudyIcon from '@/shared/assets/icons/teacher.svg'
import { useSelector } from 'react-redux'
import { getOnboardingStepNumber } from '../model/selectors/getOnboardingStep'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { onboardingActions } from '../model/slice/OnboardingSlice'
import { getOnboardingIsOpen } from '../model/selectors/getOnboardingOpen'

interface IProps {
  steps: Step[]
  // onOpen: () => void
  // onClose?: () => void

  scrollToElement?: boolean
  scrollPadding?: number
  onChangeHandler?: (e: number | string) => void
}

//Документация https://www.npmjs.com/package/intro.js-react

export const Onboarding = ({
  steps,
  scrollToElement = true,
  scrollPadding,
  // onClose,
  onChangeHandler,
}: IProps) => {
  // const [stepNumber, setStepNumber] = useState(0)
  const stepNumber = useSelector(getOnboardingStepNumber)
  const isOpen = useSelector(getOnboardingIsOpen)
  const dispatch = useAppDispatch()

  const onChangeVisible = (isOpen: boolean) => {
    dispatch(onboardingActions.setIsOpen(isOpen))
    // if (!isOpen) {
    //   onClose()
    // }
  }

  const changeStepNumber = (stepNumber: number) => {
    dispatch(onboardingActions.setStepNumber(stepNumber))
  }

  const onChange = (nextStepIndex: number) => {
    changeStepNumber(nextStepIndex)
    if (onChangeHandler) {
      onChangeHandler(nextStepIndex)
    }
  }

  return (
    <>
      <Steps
        options={{
          //Скрываем точки-шаги
          showBullets: true,
          hidePrev: true,
          showButtons: true,
          exitOnEsc: true,
          scrollToElement,
          scrollPadding: scrollPadding ?? null,

          //Линия процесса
          // showProgress: true,

          //Дефолтная позиция
          tooltipPosition: 'top',

          //Дизейблим выделенное поле
          disableInteraction: true,

          //Текст кнопок
          nextLabel: 'Далее',
          prevLabel: 'Назад',
          doneLabel: 'Завершить',

          //Стили тултипа
          tooltipClass: 'customTolltip whiteSpacePreLine',

          //Шаги
          // showStepNumbers: true,
        }}
        steps={steps}
        onExit={() => onChangeVisible(false)}
        enabled={isOpen}
        initialStep={stepNumber}
        onChange={onChange}
        onComplete={() => changeStepNumber(0)}
      />
      <Button
        className={`${cls.onboardingBtn} ${isOpen ? cls.hidden : ''}`}
        onClick={() => onChangeVisible(true)}
      >
        <StudyIcon />
      </Button>
    </>
  )
}
