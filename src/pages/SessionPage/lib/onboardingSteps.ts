import { Step } from 'intro.js-react'

export const sessionOnboardingSteps: Step[] = [
  {
    element: '.session_page_onboarding_step_0',
    intro:
      'Это страница сессии выбора подарков. Сессию можно сравнить с коробкой, куда все участники кидают свои карты, затем проводится жеребьевка, и каждому участнику достается карта с другим участником, которому нужно будет сделать подарок',
  },
  {
    element: '.session_page_onboarding_step_1',
    intro:
      'Если вы попали сюда по ссылке, то в первую очередь нужно нажать кнопку "Участвовать", так вы сможете создать свою карточку и сессия сохраниться у вас в профиле',
  },
  {
    element: '.session_page_onboarding_step_2',
    intro:
      'Затем нужно создать свою карточку нажав по этой кнопке. Карточка автоматически подтянет имя и фото из вашего профиля',
  },
  {
    element: '.session_page_onboarding_step_3',
    intro:
      'Если кликнуть по своей карте, то можно будет отредактировать имя, например поменять его на ник или на полное ФИО, чтобы другие участники сессии быстрее вас узнали. Также в описании карточки можно описать предпочтения по подарку и адрес доставки',
  },
  {
    element: '.session_page_onboarding_step_4',
    tooltipClass: 'customTolltip sessionStep4',
    intro:
      'Фото на карточке привязано к профилю. Чтобы его поменять, нужно перейти в профиль и поменять его там или загрузить новое, если вы только зарегистрировались',
  },
  {
    element: '.session_page_onboarding_step_5',
    intro:
      'Чтобы пригласить других участников, скопируйте ссылку на сессию и отправьте ее друзьям или коллегам через любой мессенджер',
  },
  {
    element: '.session_page_onboarding_step_6',
    intro:
      'В комментариях участники смогут обсудить разные темы связанные с данной сессией, например максимальный бюджет для подарка, ну или же просто пожелать друг другу хорошего дня :)',
  },
  {
    element: '.session_page_onboarding_step_7',
    intro:
      'Создатель сессии может редактировать название, описание, картинку сессии, а так же количество участников',
  },
  {
    element: '.session_page_onboarding_step_8',
    intro:
      'Как только все участники создадут карточки, у создателя сессии появится кнопка для проведения жеребьевки. Каждому участнику выпадет случайная карта (для кого он будет тайным Сантой), на почту прийдет уведомление, а сессия будет закрыта для редактирования',
  },
]
