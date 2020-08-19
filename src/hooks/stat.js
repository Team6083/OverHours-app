import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { getStatUsers } from '../client/stat'

export function useStatUsers(seasonId) {
    const q = useQuery("statusers", () => getStatUsers(seasonId), {
        enabled: false
    });

    useEffect(() => {
        q.refetch();
    }, [seasonId, q]);

    return q;
}