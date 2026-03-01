import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import { ClientGuard } from './guards/ClientGuard'

const MessagesScreen = lazy(() => import('../pages/common/MessagesScreen'))
const ConversationScreen = lazy(
  () => import('../pages/common/ConversationScreen'),
)

export const RutasSuscriptor: RouteObject[] = [
  {
    element: <ClientGuard />,
    children: [
      {
        path: '/messages',
        element: <MessagesScreen />,
      },
      {
        path: '/conversation/:userId',
        element: <ConversationScreen />,
      },
    ],
  },
]
