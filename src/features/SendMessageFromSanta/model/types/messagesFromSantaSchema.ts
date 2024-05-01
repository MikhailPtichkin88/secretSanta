export interface IMessagesFromSantaSchema {
  messages: IMessage[]
  isLoading: boolean
  error: string
}

export interface IMessage {
  _id: string
  text: string
  session_id: string
  card_from: string
  card_to: string
  is_new_to: boolean
  createdAt: string
  updatedAt: string
}

export interface IGetMessagesData {
  sessionId: string
  cardId: string
  cardToId: string
}
export interface ICreateMessagesData extends IGetMessagesData {
  text: string
}

export interface IChangeMessagesData {
  sessionId: string
  messageId: string
  text: string
}
