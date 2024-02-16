import { v4 } from 'uuid'

export const createUserAvatarUrl = (avatarUrl: string) =>
  `${__API__}/uploads/avatars/${avatarUrl}?${v4()}`
export const createSessionImgUrl = (sessionImg: string) =>
  `${__API__}/uploads/sessions/${sessionImg}?${v4()}`
export const createCardImgUrl = (sessionId: string, cardImg: string) =>
  `${__API__}/uploads/cards/${sessionId}/${cardImg}?${v4()}`
