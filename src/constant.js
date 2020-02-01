export const roleCode = {
    Member: 'M',
    Leader: 'L',
    Admin: 'A',
    Super: 'S',
    NoAuth: 'NOAUTH'
}

export const sessionJWTName = 'session_jwt'

export const commonTableOptions = {
    features: {
        canEdit: true,
        canDelete: true,
        canSearch: true,
        canOrderColumns: true,
        canSelectRow: true,
        canSaveUserConfiguration: false,
        userConfiguration: {
            copyToClipboard: false
        },
        rowsPerPage: {
            available: [10, 25, 50, 100],
            selected: 50
        },
    }
}