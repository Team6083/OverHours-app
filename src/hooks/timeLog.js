import { useQuery } from 'react-query'

import { getUnfinishedTimeLog } from '../client/timeLog'

export function useUnfinishedTimeLog() {
    return useQuery("unfinishedTimeLog", getUnfinishedTimeLog);
}