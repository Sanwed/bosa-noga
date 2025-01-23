import { useSelector } from 'react-redux';
import { RootState } from '../../app/providers/StoreProvider/store.ts';

export const useAppSelector = useSelector.withTypes<RootState>();
