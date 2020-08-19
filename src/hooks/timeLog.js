import { useQuery } from 'react-query'

import { getUnfinishedTimeLog, getSeasonIds } from '../client/timeLog'

export function useUnfinishedTimeLog() {
    return useQuery("unfinishedTimeLog", getUnfinishedTimeLog);
}

export function useSeasonIds() {
    return useQuery("seasonIds", getSeasonIds);
}