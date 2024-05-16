import { QUERY_KEYS } from '../../common/constants/querykeys.constants';
import { getOrderByUserID } from '../../common/services/order.service';
import { useQuery } from 'react-query';

export const useGetOrder = (userID: string) => {
  return useQuery([QUERY_KEYS.ORDER, userID], () => getOrderByUserID(userID));
};
