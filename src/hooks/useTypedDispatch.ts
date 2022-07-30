import { useDispatch } from 'react-redux'
import type { TypedDispatch } from '../store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useTypedDispatch: () => TypedDispatch = useDispatch;   // https://redux.js.org/usage/usage-with-typescript

// not used in app temporary