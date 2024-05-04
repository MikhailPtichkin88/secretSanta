export { SendMessageFromSanta } from './ui/SendMessageFromSanta'
export type {
  IMessagesFromSantaSchema,
  IMessageOption,
} from './model/types/messagesFromSantaSchema'
export {
  messagesFromSantaReducer,
  messagesFromSantaActions,
} from './model/slice/slice'
export { subscribe } from './model/services/subscribe'
